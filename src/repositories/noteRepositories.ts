import { Notes } from "@prisma/client";
import { prisma } from "../database/database.js";
import { NotesInsert } from "../services/noteServices.js";

export async function findTitleById(id: number, title: string) {
  return await prisma.notes.findFirst({ where: { id, title } });
}

export async function insert(NoteData: NotesInsert, id: number) {
  const data = { ...NoteData, ownerId: id };
  return await prisma.notes.create({ data });
}

export async function remove(itemId: number, userId: number) {
  return await prisma.notes.delete({
    where: { ownerId_id: { ownerId: userId, id: itemId } },
  });
}

export async function softFindById(itemId: number) {
  return await prisma.notes.findFirst({ where: { id: itemId } });
}

export async function findById(
  itemId: number,
  userId: number
): Promise<Notes | null> {
  return await prisma.notes.findUnique({
    where: { id: itemId },
  });
}

export async function findAllByUserId(userId: number): Promise<Notes[]> {
  return await prisma.notes.findMany({
    where: { ownerId: userId },
  });
}
