import { Router } from "express";
import {
  deleteNotes,
  getSingleNote,
  listNotes,
  newNotes,
} from "../controllers/notesControllers.js";
import clearData from "../middlewares/stringStripMiddleware.js";
import validateData from "../middlewares/validateMiddleware.js";
import { validateToken } from "../middlewares/tokenValidation.js";

const notesRouter = Router();

notesRouter.get("/notes", clearData, validateData, validateToken, listNotes);
notesRouter.get(
  "/notes/:id",
  clearData,
  validateData,
  validateToken,
  getSingleNote
);
notesRouter.post("/notes", clearData, validateData, validateToken, newNotes);
notesRouter.delete(
  "/notes/:id",
  clearData,
  validateData,
  validateToken,
  deleteNotes
);

export default notesRouter;
