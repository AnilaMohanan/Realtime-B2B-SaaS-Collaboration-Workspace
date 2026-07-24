import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import workspaceRoutes from "./routes/workspace.routes";
import channelRoutes from "./routes/channel.routes";
import workspaceMemberRoutes from "./routes/workspaceMember.routes";


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
app.use("/api/channels", channelRoutes);
app.use("/api/workspace-members", workspaceMemberRoutes);


app.listen(5000, () => {
  console.log("Server running on port 5000");
});