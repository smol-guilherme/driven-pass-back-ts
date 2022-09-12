import Cryptr from "cryptr";
var cryptr = new Cryptr(process.env.ENCRYPTION_SECRET);
export function encryptSensitiveInfo(data) {
    if (!data)
        throw { type: "no_schema_error" };
    return cryptr.encrypt(data);
}
export function decryptSensitiveInfo(data) {
    return cryptr.decrypt(data);
}
