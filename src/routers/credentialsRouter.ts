import { Router, Request, Response } from "express";
import { newCredentials } from "../controllers/credentialControllers.js";
import clearData from "../middlewares/stringStripMiddleware.js";
import validateData from "../middlewares/validateMiddleware.js";

const credentialsRouter = Router();

credentialsRouter.get('/credentials', (req: Request, res: Response) => res.status(200).send(`ok`));
credentialsRouter.get('/credentials', clearData, validateData);
credentialsRouter.post('/credentials', clearData, validateData, newCredentials);
credentialsRouter.delete('/credentials', clearData, validateData);

export default credentialsRouter;