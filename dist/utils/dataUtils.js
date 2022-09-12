import { passwordEncrypt } from "./encryptionUtils.js";
export function passwordFormat(userData) {
    var bcryptPassword = passwordEncrypt(userData.password);
    userData.password = bcryptPassword;
    delete userData.repeatPassword;
    return;
}
