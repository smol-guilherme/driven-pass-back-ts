import { Response, Request } from "express";
import {
  deleteCredentialsRoutine,
  listCredentialsRoutine,
  newCredentialsRoutine,
} from "../services/credentialServices.js";

export async function newCredentials(req: Request, res: Response) {
  const { id } = res.locals.id;
  const response = await newCredentialsRoutine(req.body, id);
  res.status(201).send(response);
  return;
}

export async function authenticateUser(req: Request, res: Response) {
  const { id } = res.locals.id;
  // res.status(200).send(response);
  return;
}

export async function listCredentials(req: Request, res: Response) {
  const { id } = res.locals.id;
  const response = await listCredentialsRoutine(id);
  res.status(200).send(response);
  return;
}

export async function deleteCredentials(req: Request, res: Response) {
  const { id } = res.locals.id;
  const response = await deleteCredentialsRoutine(Number(req.params.id), id);
  res.status(204).send(response);
  return;
}
