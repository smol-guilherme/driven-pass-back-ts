import { Router } from "express";
import {
  deleteNetworks,
  getSingleNetwork,
  listNetworks,
  newNetworks,
} from "../controllers/networkControllers.js";
import clearData from "../middlewares/stringStripMiddleware.js";
import validateData from "../middlewares/validateMiddleware.js";
import { validateToken } from "../middlewares/tokenValidation.js";

const networkRouter = Router();

networkRouter.get(
  "/network",
  clearData,
  validateData,
  validateToken,
  listNetworks
);
networkRouter.get(
  "/network/:id",
  clearData,
  validateData,
  validateToken,
  getSingleNetwork
);
networkRouter.post(
  "/network",
  clearData,
  validateData,
  validateToken,
  newNetworks
);
networkRouter.delete(
  "/network/:id",
  clearData,
  validateData,
  validateToken,
  deleteNetworks
);

export default networkRouter;
