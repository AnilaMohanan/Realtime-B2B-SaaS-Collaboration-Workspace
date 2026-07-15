import express from "express";
import mongoose from "mongoose";
import workspaceRoutes from "./routes/workspace.routes";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/realtime_workspace")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/workspaces", workspaceRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});