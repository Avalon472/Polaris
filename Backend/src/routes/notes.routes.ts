import express from "express";
import {
  archiveNote,
  createNote,
  deleteNote,
  editNote,
  getAllNotes,
  getArchivedNotes,
  getNoteById,
  getNoteBySlug,
  getNoteByTag,
  getNoteTags,
} from "../controllers/notes.controller";
import { requireAuth } from "../middleware/requireAuth";

const noteRoutes = express.Router();

noteRoutes.get("/getAll", requireAuth, getAllNotes);

noteRoutes.get("/id/:id", requireAuth, getNoteById);

noteRoutes.get("/tag/:tag", requireAuth, getNoteByTag);

noteRoutes.get("/slug/:slug", requireAuth, getNoteBySlug);

noteRoutes.post("/create", requireAuth, createNote);

noteRoutes.post("/edit/:id", requireAuth, editNote);

noteRoutes.delete("/:id", requireAuth, deleteNote);

noteRoutes.delete("/archive/:id", requireAuth, archiveNote);

noteRoutes.get("/getArchived", requireAuth, getArchivedNotes);

noteRoutes.get("/tags", requireAuth, getNoteTags);

export default noteRoutes;
