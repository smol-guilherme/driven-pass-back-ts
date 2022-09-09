import { prisma } from "../database/database.js";
import { UserInsertOrLogin } from "../services/authServices.js";
import { Users } from "@prisma/client";

export async function findByEmail(email: string): Promise<Users> {
  return await prisma.users.findFirstOrThrow({ where: { email } });
}

export async function insert(data: UserInsertOrLogin) {
  return await prisma.users.create({ data });
}
