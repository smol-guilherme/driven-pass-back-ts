import bcrypt from "bcrypt";
import "dotenv/config";
import { IUserInsertOrLoginOrLogin } from "../services/authServices";
import { emitToken } from "./tokenUtils";

export function passwordEncrypt(rawData: string) {
  return bcrypt.hashSync(rawData, 10);
}

export function passwordAuth(userData: IUserInsertOrLoginOrLogin, queriedPassword: string) {
  if(passwordCompare(userData.password, queriedPassword)) return emitToken(userData.password);
  throw { type: 'authentication_error', message: 'incorrect email or password' };
}

function passwordCompare(userPassword: string, queryPassword: string) {
  return bcrypt.compare(userPassword, queryPassword);
}