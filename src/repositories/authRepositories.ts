import { IUserInsertOrLogin } from "../services/authServices";

export async function findByEmail(email: string) {
  return IUserInsertOrLogin;
}

export async function insert(data: IUserInsertOrLogin) {
  return;
}