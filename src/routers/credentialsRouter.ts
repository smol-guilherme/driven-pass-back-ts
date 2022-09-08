import { Router, Request, Response } from "express";
import { listCredentials, newCredentials } from "../controllers/credentialControllers.js";
import clearData from "../middlewares/stringStripMiddleware.js";
import validateData from "../middlewares/validateMiddleware.js";

const credentialsRouter = Router();

credentialsRouter.get('/credentials', clearData, validateData, listCredentials);
credentialsRouter.get('/credentials/:id', clearData, validateData);
credentialsRouter.post('/credentials', clearData, validateData, newCredentials);
credentialsRouter.delete('/credentials', clearData, validateData);

export default credentialsRouter;