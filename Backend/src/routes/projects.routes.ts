import express from "express";
import {
  createProjectItem,
  deleteItemOnly,
  getProjectById,
  getProjectHeaders,
} from "../controllers/projects.controller";
import ensureDataConnection from "../middleware/ensureDataConnection";
import { requireAuth } from "../middleware/requireAuth";

const projectRoutes = express.Router();
const middleware = [requireAuth, ensureDataConnection];

projectRoutes.get("/projectHeaders", middleware, getProjectHeaders);
projectRoutes.get("/id/:id", middleware, getProjectById);
projectRoutes.post("/create", middleware, createProjectItem);
// projectRoutes.post("/edit/:id", middleware, editProjectItem)
projectRoutes.delete("/:id", middleware, deleteItemOnly);
// projectRoutes.delete("/downstream/:id", middleware, deleteItemAndChildren)

// Ideas for later: add another post route for spitting child off as separate epic,
// and a delete route for delete and promote that takes victim id and promote target id

export default projectRoutes;
