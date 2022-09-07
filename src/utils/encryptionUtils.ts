import bcrypt from "bcrypt";
import "dotenv/config";
import { UserInsertOrLogin } from "../services/authServices.js";
import { emitToken } from "./tokenUtils.js";

export function passwordEncrypt(rawData: string) {
  return bcrypt.hashSync(rawData, 10);
}

export function passwordAuth(userData: UserInsertOrLogin, queriedPassword: string) {
  if(passwordCompare(userData.password, queriedPassword)) return emitToken(userData.password);
  throw { type: 'authentication_error', message: 'incorrect email or password' };
}

function passwordCompare(userPassword: string, queryPassword: string) {
  return bcrypt.compare(userPassword, queryPassword);
}