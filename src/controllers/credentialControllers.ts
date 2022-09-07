import { Response, Request } from "express";
import { newCredentialsRoutine } from "../services/credentialServices.js";

export async function newCredentials(req: Request, res: Response) {
  const { authorization } = req.headers;
  const response = await newCredentialsRoutine(req.body, authorization)
  res.status(201).send(response);
  return;
}

export async function authenticateUser(req: Request, res: Response) {
  // res.status(200).send(response);
  return;
}