import {
  findAllByUserId,
  findById,
  findTitleById,
  insert,
  remove,
  softFindById,
} from "../repositories/noteRepositories.js";
import { Notes } from "@prisma/client";

export type NotesInsert = Omit<Notes, "id" | "owner" | "createdAt">;
export type INotesSearchResult = Omit<Notes, "createdAt" | "ownerId">;
export type NotesId = { id: number };

export async function newNotesRoutine(noteData: NotesInsert, userId: number) {
  console.log("here");

  await checkForDuplicateTitles(userId, noteData.title);
  await insert(noteData, userId);
  return;
}

async function checkForDuplicateTitles(id: number, NotesTitle: string) {
  const data = await findTitleById(id, NotesTitle);
  if (data !== null)
    throw { type: "title_conflict", message: "titles must be unique" };
  return;
}

export async function listNotesRoutine(userId: number) {
  const data: Notes[] = await findAllByUserId(userId);
  data.map((item) => removeUnnecessaryKeys(item));
  return data;
}

export async function getNoteByIdRoutine(itemId: number, userId: number) {
  const data = await findById(itemId, userId);
  if (data === null) return [];
  if (data.ownerId !== userId) throw { type: "authentication_error" };
  removeUnnecessaryKeys(data);
  return data;
}

export async function deleteNotesRoutine(itemId: number, userId: number) {
  const data = await softFindById(itemId);
  if (data === null) throw { type: "not_found_error" };
  if (data.ownerId !== userId) throw { type: "authentication_error" };
  const response = await remove(itemId, userId);
  return response;
}

function excludeKeys<Notes, Key extends keyof Notes>(
  data: Notes,
  ...keys: Key[]
): Omit<Notes, Key> {
  for (let key of keys) {
    delete data[key];
  }
  return data;
}

function removeUnnecessaryKeys(data: Notes) {
  excludeKeys(data, "ownerId");
  excludeKeys(data, "createdAt");
}
