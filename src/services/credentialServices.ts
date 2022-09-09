import {
  findAllByUserId,
  findTitleById,
  insert,
  remove,
} from "../repositories/credentialRepositories.js";
import { Credentials } from "@prisma/client";
import {
  decryptSensitiveInfo,
  encryptSensitiveInfo,
} from "./encryptionServices.js";

export type CredentialsInsert = Omit<Credentials, "id" | "owner" | "createdAt">;
export type CredentialsId = { id: number };

export async function newCredentialsRoutine(
  credentialData: CredentialsInsert,
  userId: number
) {
  await checkForDuplicateTitles(userId, credentialData.title);
  encryptSensitiveInfo(credentialData);
  await insert(credentialData, userId);
  return;
}

async function checkForDuplicateTitles(id: number, credentialsTitle: string) {
  const data = await findTitleById(id, credentialsTitle);
  if (data !== null)
    throw { type: "title_conflict", message: "titles must be unique" };
  return;
}

export async function listCredentialsRoutine(userId: number) {
  const data = await findAllByUserId(userId);
  const decryptInfo = decryptSensitiveInfo(data);
  return decryptInfo;
}

export async function deleteCredentialsRoutine(itemId: number, userId: number) {
  const response = await remove(itemId, userId);
  return response;
}
