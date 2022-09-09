import {
  findAllByUserId,
  findById,
  findTitleById,
  insert,
  remove,
  softFindById,
} from "../repositories/documentRepositories.js";
import { Documents } from "@prisma/client";
import {
  decryptSensitiveInfo,
  encryptSensitiveInfo,
} from "./encryptionServices.js";

export type DocumentsInsert = Omit<Documents, "id" | "owner" | "createdAt">;
export type IDocumentsSearchResult = Omit<Documents, "createdAt" | "ownerId">;
export type DocumentsId = { id: number };

export async function newDocumentsRoutine(
  documentData: DocumentsInsert,
  userId: number
) {
  await checkForDuplicateTitles(userId, documentData.title);
  documentData.password = encryptSensitiveInfo(documentData.password);
  documentData.CVV = encryptSensitiveInfo(documentData.CVV);
  await insert(documentData, userId);
  return;
}

async function checkForDuplicateTitles(id: number, DocumentsTitle: string) {
  const data = await findTitleById(id, DocumentsTitle);
  if (data !== null)
    throw { type: "title_conflict", message: "titles must be unique" };
  return;
}

export async function listDocumentsRoutine(userId: number) {
  const data: Documents[] = await findAllByUserId(userId);
  data.map((item) => removeUnnecessaryKeys(item));
  data.forEach((item) => {
    item.password = decryptSensitiveInfo(item.password);
    item.CVV = decryptSensitiveInfo(item.CVV);
  });
  return data;
}

export async function getDocumentByIdRoutine(itemId: number, userId: number) {
  const data = await findById(itemId, userId);
  if (data === null) return [];
  if (data.ownerId !== userId) throw { type: "authentication_error" };
  removeUnnecessaryKeys(data);
  data.password = decryptSensitiveInfo(data.password);
  data.CVV = decryptSensitiveInfo(data.CVV);
  return data;
}

export async function deleteDocumentsRoutine(itemId: number, userId: number) {
  const data = await softFindById(itemId);
  if (data === null) throw { type: "not_found_error" };
  if (data.ownerId !== userId) throw { type: "authentication_error" };
  const response = await remove(itemId, userId);
  return response;
}

function excludeKeys<Documents, Key extends keyof Documents>(
  data: Documents,
  ...keys: Key[]
): Omit<Documents, Key> {
  for (let key of keys) {
    delete data[key];
  }
  return data;
}

function removeUnnecessaryKeys(data: Documents) {
  excludeKeys(data, "ownerId");
  excludeKeys(data, "createdAt");
}
