import {
  findAllByUserId,
  findById,
  insert,
  remove,
  softFindById,
} from "../repositories/networkRepositories.js";
import { Networks } from "@prisma/client";
import {
  decryptSensitiveInfo,
  encryptSensitiveInfo,
} from "./encryptionServices.js";

export type NetworksInsert = Omit<Networks, "id" | "owner" | "createdAt">;

export async function newNetworkRoutine(
  networkData: NetworksInsert,
  userId: number
) {
  networkData.password = encryptSensitiveInfo(networkData.password);
  await insert(networkData, userId);
  return;
}

export async function listNetworksRoutine(userId: number) {
  const data: Networks[] = await findAllByUserId(userId);
  data.map((item) => removeUnnecessaryKeys(item));
  data.forEach((item) => (item.password = decryptSensitiveInfo(item.password)));
  return data;
}

export async function getNetworkByIdRoutine(itemId: number, userId: number) {
  const data = await findById(itemId);
  if (data === null) return [];
  if (data.ownerId !== userId) throw { type: "authentication_error" };
  removeUnnecessaryKeys(data);
  data.password = decryptSensitiveInfo(data.password);
  return data;
}

export async function deleteNetworkRoutine(itemId: number, userId: number) {
  const data = await softFindById(itemId);
  if (data === null) throw { type: "not_found_error" };
  if (data.ownerId !== userId) throw { type: "authentication_error" };
  const response = await remove(itemId, userId);
  return response;
}

function excludeKeys<Networks, Key extends keyof Networks>(
  data: Networks,
  ...keys: Key[]
): Omit<Networks, Key> {
  for (let key of keys) {
    delete data[key];
  }
  return data;
}

function removeUnnecessaryKeys(data: Networks) {
  excludeKeys(data, "ownerId");
  excludeKeys(data, "createdAt");
}
