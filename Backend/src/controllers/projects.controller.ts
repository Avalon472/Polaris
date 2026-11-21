import { Request, Response } from "express";
import ProjectItem from "../models/projectItem.model";

export const getProjectHeaders = async (req: Request, res: Response) => {
  try {
    const projectHeaders = await ProjectItem.find({
      author: req.userId,
      parentID: null,
      classification: "epic",
    }).sort({ updatedAt: -1 });

    if (projectHeaders.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(projectHeaders);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in getProjectHeaders controller", error.message);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const projID = req.params.id;

    const projectEntity = await ProjectItem.find({
      author: req.userId,
      _id: projID,
    }).populate({
      path: "children",
      select: "title",
    });

    if (!projectEntity) {
      return res
        .status(404)
        .json({ message: "No project item with this ID was found." });
    }

    return res.status(200).json(projectEntity);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in getProjectById controller", error.message);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createProjectItem = async (req: Request, res: Response) => {
  try {
    const {
      parentID,
      title,
      itemDescription,
      status,
      classification,
      priority,
      dueDate,
    } = req.body;
    // Children and completedAt are the only fields that may be omitted during creation,
    // itemDescription will get created in note controller and have ID passed in to this method
    const existingTitle = await ProjectItem.findOne({ title: title });
    if (existingTitle) {
      return res.status(400).json({
        error: "This title is already in use by another task or item.",
      });
    }

    const projectItem = await ProjectItem.create({
      parentID,
      title,
      itemDescription,
      status,
      classification,
      author: req.userId,
    });

    if (priority) {
      projectItem.priority = priority;
    }
    if (dueDate) {
      projectItem.dueDate = dueDate;
    }
    await projectItem.save();

    return res.status(201).json(projectItem);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in createProjectItem controller", error.message);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const editProjectItem = async (req: Request, res: Response) => {
  //STUB
};

export const deleteItemOnly = async (req: Request, res: Response) => {
  try {
    const existingId = req.params.id;
    const existingItem = await ProjectItem.findById(existingId);
    if (!existingItem) {
      return res
        .status(404)
        .json({ message: "No item was found with this id." });
    }

    if (existingItem.author.toString() !== req.userId.toString()) {
      return res
        .status(401)
        .json({ message: "You do not have permission to delete this item" });
    }

    if (existingItem.children.length !== 0) {
      // Update all children to now reference the item's parent and remove its dependencies
      await ProjectItem.updateMany(
        { _id: { $in: existingItem.children } },
        { parentID: existingItem.parentID },
        { timestamps: false },
      );

      // Update parent to now longer have item as a child
      await ProjectItem.findByIdAndUpdate(existingItem.parentID, {
        $pull: { children: existingId },
      });
    }

    await ProjectItem.findByIdAndDelete(existingId);

    return res
      .status(200)
      .json({ message: "Project item has been deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in deleteItemAndPromote controller", error.message);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteItemAndChildren = async (req: Request, res: Response) => {
  //STUB
};
