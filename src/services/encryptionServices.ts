import { Credentials } from "@prisma/client";
import Cryptr from "cryptr";
import { CredentialsInsert } from "./credentialServices.js";

const cryptr = new Cryptr(process.env.ENCRYPTION_SECRET);

export function encryptSensitiveInfo(data: CredentialsInsert) {
  data.password = cryptr.encrypt(data.password);
  return data;
}

export function decryptSensitiveInfo(data: Credentials[]) {
  const processedData = data.map(item => item.password = cryptr.decrypt(item.password));
  return processedData;
}