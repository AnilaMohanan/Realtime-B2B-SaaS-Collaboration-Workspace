import express from "express";
import { register, login, logout, refreshAccessToken, forgotPassword,resetPassword} from "../controllers/authController";
import authMiddleware from "../middleware/authMiddleware";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.post("/refresh-token", refreshAccessToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
