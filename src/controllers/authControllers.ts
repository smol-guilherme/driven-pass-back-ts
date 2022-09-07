import { Response, Request } from "express";
import { registerRoutine } from "../services/authServices";

export async function registerUser(req: Request, res: Response) {
  const response = registerRoutine(req.body)
  res.status(201).send(response);
  return;
}