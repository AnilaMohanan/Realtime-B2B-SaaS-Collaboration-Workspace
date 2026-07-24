import express from "express";

import {
  createWorkspaceMember,
  getAllWorkspaceMembers,
  getWorkspaceMemberById,
  updateWorkspaceMember,
  deleteWorkspaceMember,
} from "../controllers/workspaceMember.controller";

const router = express.Router();

router.post("/", createWorkspaceMember);

router.get("/", getAllWorkspaceMembers);

router.get("/:id", getWorkspaceMemberById);

router.put("/:id", updateWorkspaceMember);

router.delete("/:id", deleteWorkspaceMember);

export default router;