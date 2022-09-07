import { prisma } from "../database/database.js";
import { UserInsertOrLogin } from "../services/authServices.js";

export async function findByEmail(email: string) {
  return await prisma.users.findFirst( { where: { email } } );
}

export async function insert(data: UserInsertOrLogin) {
  return await prisma.users.create( { data } );
}