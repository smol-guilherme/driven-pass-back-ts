import { Response, Request } from "express";
import { authenticationRoutine, registerRoutine } from "../services/authServices";

export async function registerUser(req: Request, res: Response) {
  const response = registerRoutine(req.body)
  res.status(201).send(response);
  return;
}

export async function authenticateUser(req: Request, res: Response) {
  const response = authenticationRoutine(req.body)
  res.status(200).send(response);
  return;
}