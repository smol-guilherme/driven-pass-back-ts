import Cryptr from "cryptr";

const cryptr = new Cryptr(process.env.ENCRYPTION_SECRET!);

export function encryptSensitiveInfo(data: string) {
  if (!data) throw { type: "no_schema_error" };
  return cryptr.encrypt(data);
}

export function decryptSensitiveInfo(data: string) {
  return cryptr.decrypt(data);
}
