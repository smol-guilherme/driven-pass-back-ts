import { Router, Request, Response } from "express";
import { authenticateUser, registerUser } from "../controllers/authControllers.js";
import clearData from "../middlewares/stringStripMiddleware.js";
import validateData from "../middlewares/validateMiddleware.js";

const authRouter = Router();

authRouter.get('/route', (req: Request, res: Response) => res.status(200).send(`ok`));
authRouter.post('/signup', clearData, validateData, registerUser);
authRouter.post('/signin', clearData, validateData, authenticateUser);

export default authRouter;