import express from "express";
import {
  createChannel,
  getAllChannels,
  getChannelById,
  updateChannel,
  deleteChannel,
} from "../controllers/channelController";

const router = express.Router();

// Create Channel
router.post("/", createChannel);

// Get All Channels
router.get("/", getAllChannels);

// Get Channel By Id
router.get("/:id", getChannelById);

// Update Channel
router.put("/:id", updateChannel);

// Delete Channel
router.delete("/:id", deleteChannel);

export default router;