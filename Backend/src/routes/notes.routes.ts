import express from "express";
import {
  createNote,
  deleteNote,
  editNote,
  getAllNotes,
  getNoteById,
  getNoteByTag,
} from "../controllers/notes.controller";
import { requireAuth } from "../middleware/requireAuth";

const noteRoutes = express.Router();

noteRoutes.get("/getAll", requireAuth, getAllNotes);

noteRoutes.get("/id/:id", requireAuth, getNoteById);

noteRoutes.get("/tag/:tag", requireAuth, getNoteByTag);

noteRoutes.post("/create", requireAuth, createNote);

noteRoutes.post("/edit", requireAuth, editNote);

noteRoutes.delete("/:id", requireAuth, deleteNote);

export default noteRoutes;
