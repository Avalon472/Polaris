import { Request, Response } from "express";
import mongoose, { ObjectId } from "mongoose";
import Note from "../models/note.model";
import { createSlug } from "../utils/createSlug";

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({
      archivedAt: null,
      author: req.userId,
    })
      .sort({ updatedAt: -1 })
      .populate({ path: "references referencedBy", select: "title slug" });

    if (notes.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(notes);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in getAllNotes controller", error.message);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  try {
    const noteID = req.params.id;

    const note = await Note.find({ _id: noteID, author: req.userId }).populate({
      path: "references referencedBy",
      select: "title slug",
    });

    if (!note) {
      return res
        .status(404)
        .json({ message: "No note with this ID was found." });
    }

    return res.status(200).json(note);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in getNotesById controller", error.message);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getNoteByTag = async (req: Request, res: Response) => {
  try {
    const tags = req.params.tags;
    const notes = await Note.find({ tags: tags, author: req.userId }).populate({
      path: "references referencedBy",
      select: "title slug",
    });

    if (!notes.length) {
      return res.status(404).json({ message: "No notes found with this tag." });
    }

    return res.status(200).json(notes);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in getNotesByTag controller", error.message);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getNoteBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;
    const notes = await Note.find({ slug: slug, author: req.userId }).populate({
      path: "references referencedBy",
      select: "title slug",
    });

    if (!notes.length) {
      return res
        .status(404)
        .json({ message: "No notes found with this slug." });
    }

    return res.status(200).json(notes);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in getNotesBySlug controller", error.message);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, body, tags, type } = req.body;

    const existingTitle = await Note.findOne({ title: title });
    if (existingTitle) {
      return res
        .status(400)
        .json({ error: "This title is already in use by another note" });
    }

    const slug = await createSlug(title);

    const note = await Note.create({
      title,
      body,
      bodyText: body, //TODO: Make markdown stripper method after confirming format (i.e. stripHtml(body))
      slug,
      tags,
      type,
      author: req.userId, //Added by auth middleware
    });

    return res.status(201).json(note);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in createNote controller", error.message);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const editNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { title, body, tags, type, pinned, references } = req.body;

    const note = await Note.findOne({ _id: id, author: req.userId });

    if (!note) {
      return res.status(404).json({ message: "No note was found." });
    }

    const oldRefs = note.references.map((refId: mongoose.Types.ObjectId) =>
      refId.toString(),
    );
    const newRefs = (references ?? []).map(
      (refId: string) => new mongoose.Types.ObjectId(refId),
    );
    const newRefStrings = newRefs.map((refId: ObjectId) => refId.toString());

    // Compute differences from old note
    const added = newRefStrings.filter(
      (refId: string) => !oldRefs.includes(refId),
    );
    const removed = oldRefs.filter(
      (refId: string) => !newRefStrings.includes(refId),
    );

    // Update referencedBy on affected notes
    // Omit timestamp update
    if (added.length) {
      await Note.updateMany(
        { _id: { $in: added } },
        { $addToSet: { referencedBy: id } },
        { timestamps: false },
      );
    }

    if (removed.length) {
      await Note.updateMany(
        { _id: { $in: removed } },
        { $pull: { referencedBy: id } },
        { timestamps: false },
      );
    }

    // Update fields if present in request body
    if (title !== undefined) {
      const existingNote = await Note.findOne({ _id: { $ne: id }, title });
      if (existingNote) {
        return res
          .status(400)
          .json({ error: "This title is already in use by another note" });
      }
      note.title = title;
      note.slug = await createSlug(title);
    }

    if (body !== undefined) {
      note.body = body;
      note.bodyText = body;
    }

    if (tags !== undefined) note.tags = tags;
    if (type !== undefined) note.type = type;
    if (pinned !== undefined) note.pinned = pinned;
    if (references !== undefined) note.references = newRefs;

    await note.save();

    // Populate after saving to provide expected response shape
    await note.populate({
      path: "references referencedBy",
      select: "title slug",
    });

    return res.status(200).json(note);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in editNote controller", error.message);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const existingId = req.params.id;
    const existingNote = await Note.findById(existingId);
    if (!existingNote) {
      return res.status(404).json({ message: "No note was found." });
    }

    if (existingNote.author.toString() !== req.userId.toString()) {
      return res
        .status(401)
        .json({ message: "You do not have permission to delete this note" });
    }

    await Note.findByIdAndDelete(req.params.id);

    // Update all notes that this note had referenced
    await Note.updateMany(
      { _id: { $in: existingNote.references } },
      { $pull: { referencedBy: existingId } },
      { timestamps: false },
    );

    // Update all notes that have referenced this note
    await Note.updateMany(
      { _id: { $in: existingNote.referencedBy } },
      { $pull: { references: existingId } },
      { timestamps: false },
    );

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in deleteNote controller", error.message);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const archiveNote = async (req: Request, res: Response) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "No note was found." });
    }
    if (note.author !== req.userId) {
      return res
        .status(401)
        .json({ message: "You do not have permission to archive this note" });
    }

    await Note.findByIdAndUpdate(req.params.id, { archivedAt: new Date() });

    return res.status(200).json({ message: "Note archived successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in archiveNote controller", error.message);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getArchivedNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({
      archivedAt: { $ne: null },
      author: req.userId,
    }).sort({
      updatedAt: -1,
    });

    if (notes.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(notes);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in getArchivedNotes controller", error.message);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getNoteTags = async (req: Request, res: Response) => {
  const tagList = await Note.distinct("tags", { author: req.userId });
  if (tagList.length === 0) {
    return res.status(200).json([]);
  }
  return res.status(200).json(tagList);
};
