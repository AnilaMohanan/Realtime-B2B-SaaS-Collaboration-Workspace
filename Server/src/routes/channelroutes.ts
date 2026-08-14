import express from "express";
import {
  createChannel,
  getAllChannels,
  getChannelsByWorkspace,
  getChannelById,
  updateChannel,
  deleteChannel,
} from "../controllers/channelController";

import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createChannel);

router.get("/", authMiddleware, getAllChannels);

router.get(
  "/workspace/:workspaceId",
  authMiddleware,
  getChannelsByWorkspace
);

router.get("/:id", authMiddleware, getChannelById);

router.put("/:id", authMiddleware, updateChannel);

router.delete("/:id", authMiddleware, deleteChannel);

export default router;