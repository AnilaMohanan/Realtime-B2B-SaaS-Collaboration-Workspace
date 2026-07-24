import express from "express";

import {
  createChannel,
  getAllChannels,
  getChannelById,
  updateChannel,
  deleteChannel,
} from "../controllers/channel.controller";

const router = express.Router();

router.post("/", createChannel);

router.get("/", getAllChannels);

router.get("/:id", getChannelById);

router.put("/:id", updateChannel);

router.delete("/:id", deleteChannel);

export default router;