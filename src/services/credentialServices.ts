import { findTitleById, insert } from "../repositories/credentialRepositories.js";
import { validateToken } from "../utils/tokenUtils.js";
import { Credentials } from "@prisma/client";

export type CredentialsInsert = Omit<Credentials, "id" | "owner" | "createdAt">

export async function newCredentialsRoutine(credentialData: CredentialsInsert, token: string) {
  const id = validateToken(token);
  await checkForDuplicateTitles(id, credentialData.title)
  await insert(credentialData, id);
  return;
}

async function checkForDuplicateTitles(id: number, credentialsTitle: string) {
  const data = await findTitleById(id, credentialsTitle);
  if(data !== null) throw { type: 'title_conflict', message: 'titles must be unique' };
  return;
}