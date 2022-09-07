import { findTitleByEmail } from "../repositories/credentialRepositories.js";
import { validateToken } from "../utils/tokenUtils.js";


export interface ICredInsert {
  url: string;
  title: string; // unico por usuario
  username: string;
  password: string;
}

export async function newCredentialsRoutine(credentialData: ICredInsert, token: string) {
  const email = validateToken(token);
  console.log(email);
  
  // await checkForDuplicateTitles(email, credentialData.title)
  return {};
}

async function checkForDuplicateTitles(email: string, credentialData: string) {
  const data = await findTitleByEmail(email, credentialData)
  if(data !== undefined) throw { type: 'title_conflict', message: 'titles must be unique' };
  return;
}