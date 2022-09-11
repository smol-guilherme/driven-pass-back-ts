import { Networks } from "@prisma/client";
import { prisma } from "../database/database.js";
import { NetworksInsert } from "../services/networkServices.js";

export async function insert(NoteData: NetworksInsert, id: number) {
  const data = { ...NoteData, ownerId: id };
  return await prisma.networks.create({ data });
}

export async function remove(itemId: number, userId: number) {
  return await prisma.networks.delete({
    where: { ownerId_id: { ownerId: userId, id: itemId } },
  });
}

export async function softFindById(itemId: number) {
  return await prisma.networks.findFirst({ where: { id: itemId } });
}

export async function findById(itemId: number): Promise<Networks | null> {
  return await prisma.networks.findUnique({
    where: { id: itemId },
  });
}

export async function findAllByUserId(userId: number): Promise<Networks[]> {
  return await prisma.networks.findMany({
    where: { ownerId: userId },
  });
}
