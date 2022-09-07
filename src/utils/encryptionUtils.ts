import bcrypt from "bcrypt";
import "dotenv/config";

const B_SECRET: string = process.env.ENCRYPTION_SECRET;

export function passwordEncrypt(rawData: string) {
  return bcrypt.hashSync(rawData, 10);
}

export function passwordCompare(rawData: string) {

}