import { Request, Response } from "express";
import Note from "../models/note.model";
import { createSlug } from "../utils/createSlug";

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 });

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

    const note = await Note.find({ _id: noteID });

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
    const tag = req.params.tag;
    const notes = await Note.find({ tags: tag });

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

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, body, tags, type } = req.body;

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
    const { id, title, body, tags, type } = req.body;

    const note = await Note.findOne({ _id: id });

    if (!note) {
      return res.status(404).json({ message: "No note was found." });
    }

    switch (true) {
      case title !== undefined:
        note.title = title;
        note.slug = await createSlug(title);
      case body !== undefined:
        note.body = body;
        note.bodyText = body; //TODO: add in markdown stripper once available
      case tags !== undefined:
        note.tags = tags;
      case type !== undefined:
        note.type = type;
      default:
        await note.save();
    }

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
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "No note was found." });
    }

    await Note.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in deleteNote controller", error.message);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};
