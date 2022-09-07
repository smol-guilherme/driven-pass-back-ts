import * as auth from "../repositories/authRepositories";
import { passwordAuth, passwordEncrypt } from "../utils/encryptionUtils";

export interface IUserRegistry {
  email: string;
  password: string;
  repeatPassword: string;
}

export type IUserInsertOrLogin = Omit<IUserRegistry, "repeatPassword">;

export async function registerRoutine(userData: IUserRegistry) {
  await isUserRegistered(userData.email, false);
  const bcryptPassword = passwordEncrypt(userData.password);
  userData.password = bcryptPassword;
  delete userData.repeatPassword;
  await auth.insert(userData);
  return { data: 'hello' };
}

async function isUserRegistered(data: string, isLogin: boolean) {
  const response = await auth.findByEmail(data);
  if(!isLogin && response !== undefined) throw { type: 'registry_conflict', message: 'e-mail address is already in use' };
  if(isLogin && response === undefined) throw { type: 'not_found', message: 'email invalid or not found' };
  return response;
}

export async function authenticationRoutine(userData: IUserInsertOrLogin) {
  const credentials = await isUserRegistered(userData.email, true);
  const token = passwordAuth(userData, credentials.password);
  return { token };
}