import express from "express";

import {
  createChannel,
  getAllChannels,
  getChannelById,
  updateChannel,
  deleteChannel,
  getChannelsByWorkspace
} from "../controllers/channelController";

const router = express.Router();

router.post("/", createChannel);

router.get("/", getAllChannels);

router.get("/workspace/:workspaceId", getChannelsByWorkspace);

router.get("/:id", getChannelById);

router.put("/:id", updateChannel);

router.delete("/:id", deleteChannel);

export default router;