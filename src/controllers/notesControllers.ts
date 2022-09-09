import { Response, Request } from "express";
import {
  deleteNotesRoutine,
  getNoteByIdRoutine,
  listNotesRoutine,
  newNotesRoutine,
} from "../services/noteServices.js";

export async function newNotes(req: Request, res: Response) {
  const { id } = res.locals.id;
  const response = await newNotesRoutine(req.body, id);
  res.status(201).send(response);
  return;
}

export async function listNotes(req: Request, res: Response) {
  const { id } = res.locals.id;
  const response = await listNotesRoutine(id);
  res.status(200).send(response);
  return;
}

export async function getSingleNote(req: Request, res: Response) {
  const { id } = res.locals.id;
  const response = await getNoteByIdRoutine(Number(req.params.id), id);
  res.status(200).send(response);
  return;
}

export async function deleteNotes(req: Request, res: Response) {
  const { id } = res.locals.id;
  const response = await deleteNotesRoutine(Number(req.params.id), id);
  res.status(204).send(response);
  return;
}
