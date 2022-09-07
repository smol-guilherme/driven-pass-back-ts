import { IUserRegistry } from "../services/authServices.js";
import { passwordEncrypt } from "./encryptionUtils.js";

export function passwordFormat(userData: IUserRegistry) {
  const bcryptPassword = passwordEncrypt(userData.password);
  userData.password = bcryptPassword;
  delete userData.repeatPassword;
  return;
}