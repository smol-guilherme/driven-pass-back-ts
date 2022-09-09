import { Documents } from "@prisma/client";
import { prisma } from "../database/database.js";
import { DocumentsInsert } from "../services/documentServices.js";

export async function findTitleById(id: number, title: string) {
  return await prisma.documents.findFirst({ where: { id, title } });
}

export async function insert(documentData: DocumentsInsert, id: number) {
  const data = { ...documentData, ownerId: id };
  return await prisma.documents.create({ data });
}

export async function remove(itemId: number, userId: number) {
  return await prisma.documents.delete({
    where: { ownerId_id: { ownerId: userId, id: itemId } },
  });
}

export async function softFindById(itemId: number) {
  return await prisma.documents.findFirst({ where: { id: itemId } });
}

export async function findById(
  itemId: number,
  userId: number
): Promise<Documents | null> {
  return await prisma.documents.findUnique({
    where: { ownerId_id: { ownerId: userId, id: itemId } },
  });
}

export async function findAllByUserId(userId: number): Promise<Documents[]> {
  return await prisma.documents.findMany({
    where: { ownerId: userId },
  });
}
