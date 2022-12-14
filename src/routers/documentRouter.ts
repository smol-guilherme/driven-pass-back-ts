import { Router } from "express";
import {
  deleteDocuments,
  getSingleDocument,
  listDocuments,
  newDocuments,
} from "../controllers/documentControllers.js";
import clearData from "../middlewares/stringStripMiddleware.js";
import validateData from "../middlewares/validateMiddleware.js";
import { validateToken } from "../middlewares/tokenValidation.js";

const documentsRouter = Router();

documentsRouter.get(
  "/documents",
  clearData,
  validateData,
  validateToken,
  listDocuments
);
documentsRouter.get(
  "/documents/:id",
  clearData,
  validateData,
  validateToken,
  getSingleDocument
);
documentsRouter.post(
  "/documents",
  clearData,
  validateData,
  validateToken,
  newDocuments
);
documentsRouter.delete(
  "/documents/:id",
  clearData,
  validateData,
  validateToken,
  deleteDocuments
);

export default documentsRouter;
