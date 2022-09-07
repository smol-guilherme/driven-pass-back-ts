import { prisma } from "../database/database.js";
import { CredentialsInsert } from "../services/credentialServices.js";

export async function findTitleById(id: number, title: string) {
  return await prisma.credentials.findFirst({ where: { id, title }});
}

export async function insert(credentialData: CredentialsInsert, id: number) {
  const data = { ...credentialData, ownerId: id }
  return await prisma.credentials.create({ data });
}