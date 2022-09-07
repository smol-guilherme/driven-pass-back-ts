import { Users } from "@prisma/client";
import { emitToken } from "./tokenUtils.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import { UserInsertOrLogin } from "../services/authServices.js";

export function passwordEncrypt(rawData: string) {
  return bcrypt.hashSync(rawData, 10);
}

export function passwordAuth(requestData: UserInsertOrLogin, queriedData: Users) {
  if(passwordCompare(requestData.password, queriedData.password)) return emitToken(queriedData.id);
  throw { type: 'authentication_error', message: 'incorrect email or password' };
}

function passwordCompare(userPassword: string, queryPassword: string) {
  return bcrypt.compare(userPassword, queryPassword);
}