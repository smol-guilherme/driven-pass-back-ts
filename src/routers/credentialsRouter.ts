import { Router, Request, Response } from "express";
import clearData from "../middlewares/stringStripMiddleware.js";
import validateData from "../middlewares/validateMiddleware.js";

const credentialsRouter = Router();

credentialsRouter.get('/credentials', (req: Request, res: Response) => res.status(200).send(`ok`));
credentialsRouter.get('/credentials', clearData, validateData);
credentialsRouter.post('/credentials', clearData, validateData);
credentialsRouter.delete('/credentials', clearData, validateData);

export default credentialsRouter;