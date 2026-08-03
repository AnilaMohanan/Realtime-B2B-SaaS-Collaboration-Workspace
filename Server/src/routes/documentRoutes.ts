import express from "express";

import {
  createDocument,
  getAllDocuments,
  getDocumentById,
  getDocumentsByWorkspace,
  updateDocument,
  deleteDocument,
  searchDocuments,
  getRecentDocuments,
} from "../controllers/documentController";

const router = express.Router();

/**
 * Create Document
 */
router.post("/", createDocument);

/**
 * Get All Documents
 */
router.get("/", getAllDocuments);

/**
 * Search Documents
 * GET /api/documents/search?keyword=meeting
 */
router.get("/search", searchDocuments);

/**
 * Recent Documents
 */
router.get("/recent", getRecentDocuments);

/**
 * Get Documents by Workspace
 */
router.get(
  "/workspace/:workspaceId",
  getDocumentsByWorkspace
);

/**
 * Get Single Document
 */
router.get(
  "/:documentId",
  getDocumentById
);

/**
 * Update Document
 */
router.put(
  "/:documentId",
  updateDocument
);

/**
 * Delete Document
 */
router.delete(
  "/:documentId",
  deleteDocument
);

export default router;