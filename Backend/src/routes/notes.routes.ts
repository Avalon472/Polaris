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
import ensureDataConnection from "../middleware/ensureDataConnection";
import { requireAuth } from "../middleware/requireAuth";

const noteRoutes = express.Router();
const middleware = [requireAuth, ensureDataConnection];

noteRoutes.get("/getAll", middleware, getAllNotes);

noteRoutes.get("/id/:id", middleware, getNoteById);

noteRoutes.get("/tag/:tag", middleware, getNoteByTag);

noteRoutes.get("/slug/:slug", middleware, getNoteBySlug);

noteRoutes.post("/create", middleware, createNote);

noteRoutes.post("/edit/:id", middleware, editNote);

noteRoutes.delete("/:id", middleware, deleteNote);

noteRoutes.delete("/archive/:id", middleware, archiveNote);

noteRoutes.get("/getArchived", middleware, getArchivedNotes);

noteRoutes.get("/getTags", middleware, getNoteTags);

export default noteRoutes;
