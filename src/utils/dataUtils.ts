import { IRegistryBody } from "../services/authServices.js";
import { passwordEncrypt } from "./encryptionUtils.js";

export function passwordFormat(userData: IRegistryBody) {
  const bcryptPassword = passwordEncrypt(userData.password);
  userData.password = bcryptPassword;
  return;
}
