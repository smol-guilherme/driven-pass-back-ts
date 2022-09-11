import { Response, Request } from "express";
import {
  deleteNetworkRoutine,
  getNetworkByIdRoutine,
  listNetworksRoutine,
  newNetworkRoutine,
} from "../services/networkServices.js";

export async function newNetworks(req: Request, res: Response) {
  const { id } = res.locals.id;
  const response = await newNetworkRoutine(req.body, id);
  res.status(201).send(response);
  return;
}

export async function listNetworks(req: Request, res: Response) {
  const { id } = res.locals.id;
  const response = await listNetworksRoutine(id);
  res.status(200).send(response);
  return;
}

export async function getSingleNetwork(req: Request, res: Response) {
  const { id } = res.locals.id;
  const response = await getNetworkByIdRoutine(Number(req.params.id), id);
  res.status(200).send(response);
  return;
}

export async function deleteNetworks(req: Request, res: Response) {
  const { id } = res.locals.id;
  const response = await deleteNetworkRoutine(Number(req.params.id), id);
  res.status(204).send(response);
  return;
}
