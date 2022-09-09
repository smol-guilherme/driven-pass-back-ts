import Cryptr from "cryptr";
import { Credentials } from "@prisma/client";
import { CredentialsInsert } from "./credentialServices.js";

const cryptr = new Cryptr(process.env.ENCRYPTION_SECRET!);

export function encryptSensitiveInfo(data: CredentialsInsert) {
  data.password = cryptr.encrypt(data.password);
  return data;
}

export function decryptSensitiveInfo(data: Credentials[]) {
  data.forEach((item) => {
    item.password = cryptr.decrypt(item.password);
  });

  console.log(data);

  return data;
}
