import Cryptr from "cryptr";
import {
  CredentialsInsert,
  ICredentialsSearchResult,
} from "./credentialServices.js";

const cryptr = new Cryptr(process.env.ENCRYPTION_SECRET!);

export function encryptSensitiveInfo(data: CredentialsInsert) {
  data.password = cryptr.encrypt(data.password);
  return data;
}

export function decryptSensitiveInfo(data: ICredentialsSearchResult[]) {
  data.forEach((item) => {
    item.password = cryptr.decrypt(item.password);
  });
  return data;
}

export function decryptSingleInfo(data: ICredentialsSearchResult) {
  return { ...data, password: cryptr.decrypt(data.password) };
}
