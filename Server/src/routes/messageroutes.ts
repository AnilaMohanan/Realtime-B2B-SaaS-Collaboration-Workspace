import express from "express";
import {
  sendMessage,
  getMessages,
  editMessage,
  deleteMessage,
} from "../controllers/messageController";
import authMiddleware from "../middleware/authMiddleware";


const router = express.Router();

router.post("/", authMiddleware, sendMessage);
router.get("/:receiverId", authMiddleware, getMessages);
router.put("/:messageId", authMiddleware, editMessage);
router.delete("/:messageId", authMiddleware, deleteMessage);

export default router;
