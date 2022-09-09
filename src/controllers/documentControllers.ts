import { Response, Request } from "express";
import {
  deleteDocumentsRoutine,
  getDocumentByIdRoutine,
  listDocumentsRoutine,
  newDocumentsRoutine,
} from "../services/documentServices.js";

export async function newDocuments(req: Request, res: Response) {
  const { id } = res.locals.id;
  const response = await newDocumentsRoutine(req.body, id);
  res.status(201).send(response);
  return;
}

export async function listDocuments(req: Request, res: Response) {
  const { id } = res.locals.id;
  const response = await listDocumentsRoutine(id);
  res.status(200).send(response);
  return;
}

export async function getSingleDocument(req: Request, res: Response) {
  const { id } = res.locals.id;
  const response = await getDocumentByIdRoutine(Number(req.params.id), id);
  res.status(200).send(response);
  return;
}

export async function deleteDocuments(req: Request, res: Response) {
  const { id } = res.locals.id;
  const response = await deleteDocumentsRoutine(Number(req.params.id), id);
  res.status(204).send(response);
  return;
}
