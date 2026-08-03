import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authroutes from "./routes/authroutes";
import workspaceRoutes from "./routes/workspaceroutes";
import userRoutes from "./routes/userRoutes";
import messageRoutes from "./routes/messageroutes";
import notificationRoutes from "./routes/notificationroutes";
import dashboardRoutes from "./routes/dashboardroutes";
import channelRoutes from "./routes/channelroutes";
import workspaceMemberRoutes from "./routes/workspaceMemberRoutes";
import documentRoutes from "./routes/documentRoutes";
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authroutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/workspace-members",workspaceMemberRoutes);
app.use("/api/documents", documentRoutes);



app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Real-Time B2B SaaS Collaboration Workspace API is running"
  });
});

export default app;