import { Router } from "express";
import {
  deleteCredentials,
  listCredentials,
  newCredentials,
} from "../controllers/credentialControllers.js";
import clearData from "../middlewares/stringStripMiddleware.js";
import { validateToken } from "../middlewares/tokenValidation.js";
import validateData from "../middlewares/validateMiddleware.js";

const credentialsRouter = Router();

credentialsRouter.get(
  "/credentials",
  clearData,
  validateData,
  validateToken,
  listCredentials
);
credentialsRouter.get(
  "/credentials/:id",
  clearData,
  validateData,
  validateToken
);
credentialsRouter.post(
  "/credentials",
  clearData,
  validateData,
  validateToken,
  newCredentials
);
credentialsRouter.delete(
  "/credentials/:id",
  clearData,
  validateData,
  validateToken,
  deleteCredentials
);

export default credentialsRouter;
