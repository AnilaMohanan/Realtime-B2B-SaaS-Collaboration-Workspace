import express from "express";
import { getDashboardStats } from "../controllers/getdashboardstatus";

const router = express.Router();

router.get("/", getDashboardStats);

export default router;