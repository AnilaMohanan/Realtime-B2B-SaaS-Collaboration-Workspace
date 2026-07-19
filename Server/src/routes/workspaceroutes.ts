import express from "express";
import { createWorkspace } from "../controllers/workspaceController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authMiddleware, createWorkspace);

export default router;