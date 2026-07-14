import express from "express";

import {
  createWorkspace,
  getAllWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
} from "../controllers/workspace.controller";

const router = express.Router();

router.post("/", createWorkspace);

router.get("/", getAllWorkspaces);

router.get("/:id", getWorkspaceById);

router.put("/:id", updateWorkspace);

router.delete("/:id", deleteWorkspace);

export default router;