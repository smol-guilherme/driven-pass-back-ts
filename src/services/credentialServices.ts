import {
  findAllByUserId,
  findById,
  findTitleById,
  insert,
  remove,
  softFindById,
} from "../repositories/credentialRepositories.js";
import { Credentials } from "@prisma/client";
import {
  decryptSensitiveInfo,
  decryptSingleInfo,
  encryptSensitiveInfo,
} from "./encryptionServices.js";

export type CredentialsInsert = Omit<Credentials, "id" | "owner" | "createdAt">;
export type ICredentialsSearchResult = Omit<
  Credentials,
  "createdAt" | "ownerId"
>;
export type CredentialsId = { id: number };

export async function newCredentialsRoutine(
  credentialData: CredentialsInsert,
  userId: number
) {
  await checkForDuplicateTitles(userId, credentialData.title);
  encryptSensitiveInfo(credentialData.password);
  console.log(credentialData);

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
  const data: Credentials[] = await findAllByUserId(userId);
  data.map((item) => removeUnnecessaryKeys(item));
  const decryptInfo = decryptSensitiveInfo(data);
  return decryptInfo;
}

export async function getCredentialByIdRoutine(itemId: number, userId: number) {
  const data = await findById(itemId, userId);
  if (data === null) return [];
  if (data.ownerId !== userId) throw { type: "authentication_error" };
  removeUnnecessaryKeys(data);
  const decryptInfo = decryptSingleInfo(data);
  return decryptInfo;
}

export async function deleteCredentialsRoutine(itemId: number, userId: number) {
  const data = await softFindById(itemId);
  if (data === null) throw { type: "not_found_error" };
  if (data.ownerId !== userId) throw { type: "authentication_error" };
  const response = await remove(itemId, userId);
  return response;
}

function excludeKeys<Credentials, Key extends keyof Credentials>(
  data: Credentials,
  ...keys: Key[]
): Omit<Credentials, Key> {
  for (let key of keys) {
    delete data[key];
  }
  return data;
}

function removeUnnecessaryKeys(data: Credentials) {
  excludeKeys(data, "ownerId");
  excludeKeys(data, "createdAt");
}
