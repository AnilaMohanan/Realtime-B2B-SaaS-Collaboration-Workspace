import { Request, Response } from "express";
import Workspace from "../models/Workspace";

export const createWorkspace = async (
  req: Request,
  res: Response
) => {
  try {
   const { name, description } = req.body;

   const owner = (req as any).user.id;

    const workspace = await Workspace.create({
      name,
      description,
      owner,
      members: [owner],
    });

    res.status(201).json({
      success: true,
      message: "Workspace created successfully",
      workspace,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error,
    });
  }
};