import express from "express";

import {
  addMember,
  getWorkspaceMembers,
  updateMember,
  deleteMember,
} from "../controllers/workspaceMemberController";

const router = express.Router();

router.post("/", addMember);

router.get(
  "/workspace/:workspaceId",
  getWorkspaceMembers
);

router.put("/:id", updateMember);

router.delete("/:id", deleteMember);

export default router;