import { Credentials } from "@prisma/client";
import { prisma } from "../database/database.js";
import { CredentialsInsert } from "../services/credentialServices.js";

export async function findTitleById(id: number, title: string) {
  return await prisma.credentials.findFirst({ where: { id, title } });
}

export async function insert(credentialData: CredentialsInsert, id: number) {
  const data = { ...credentialData, ownerId: id };
  return await prisma.credentials.create({ data });
}

export async function remove(itemId: number, userId: number) {
  return await prisma.credentials.delete({
    where: { ownerId_id: { ownerId: userId, id: itemId } },
  });
}

export async function softFindById(itemId: number) {
  return await prisma.credentials.findFirst({ where: { id: itemId } });
}

export async function findById(
  itemId: number,
  userId: number
): Promise<Credentials | null> {
  return await prisma.credentials.findUnique({
    where: { ownerId_id: { ownerId: userId, id: itemId } },
  });
}

export async function findAllByUserId(userId: number): Promise<Credentials[]> {
  return await prisma.credentials.findMany({
    where: { ownerId: userId },
  });
}
