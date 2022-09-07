import * as auth from "../repositories/authRepositories";
import { passwordEncrypt } from "../utils/encryptionUtils";

export interface IUserRegistry {
  email: string;
  password: string;
  repeatPassword: string;
}

export type IUserInsert = Omit<IUserRegistry, "repeatPassword">;

export async function registerRoutine(userData: IUserRegistry) {
  await isUserRegistered(userData.email);
  const bcryptPassword = passwordEncrypt(userData.password);
  userData.password = bcryptPassword;
  delete userData.repeatPassword;
  await auth.insert(userData);
  return { data: 'hello' };
}

async function isUserRegistered(data: string) {
  const response = await auth.findByEmail(data);
  if(response !== undefined) throw { type: 'registry_conflict', message: 'e-mail address is already in use' };
  return;
}