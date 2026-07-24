import express from "express";
import {
  createNotification,
  getNotifications,
  markNotificationAsRead,
} from "../controllers/notificationController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createNotification);
router.get("/", authMiddleware, getNotifications);
router.put("/:notificationId/read", authMiddleware, markNotificationAsRead);

export default router;