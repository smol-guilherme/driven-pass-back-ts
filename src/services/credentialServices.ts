import { findAllByUserId, findTitleById, insert, remove } from "../repositories/credentialRepositories.js";
import { validateToken } from "../utils/tokenUtils.js";
import { Credentials } from "@prisma/client";
import { decryptSensitiveInfo, encryptSensitiveInfo } from "./encryptionServices.js";

export type CredentialsInsert = Omit<Credentials, "id" | "owner" | "createdAt">
export type CredentialsId = { id: number };

export async function newCredentialsRoutine(credentialData: CredentialsInsert, token: string) {
  const id = validateToken(token);
  await checkForDuplicateTitles(id, credentialData.title);
  encryptSensitiveInfo(credentialData);
  await insert(credentialData, id);
  return;
}

async function checkForDuplicateTitles(id: number, credentialsTitle: string) {
  const data = await findTitleById(id, credentialsTitle);
  if(data !== null) throw { type: 'title_conflict', message: 'titles must be unique' };
  return;
}

export async function listCredentialsRoutine(token: string) {
  const id = validateToken(token);
  const data = await findAllByUserId(id);
  const decryptInfo = decryptSensitiveInfo(data);
  return decryptInfo;
}

export async function deleteCredentialsRoutine(itemId: CredentialsId, token: string) {
  const id = validateToken(token);
  const response = await remove(itemId.id, id);
  return response;
}