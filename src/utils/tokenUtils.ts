import "dotenv/config";
import jwt from "jsonwebtoken";

const J_SECRET: string = process.env.ENCRYPTION_SECRET!;

export function emitToken(id: number) {
  return jwt.sign({ id }, J_SECRET, { expiresIn: "4h" });
}

export function validateToken(token: string) {
  const data = jwt.verify(token, J_SECRET);
  return data;
}

function isPreviousTokenExpired() {
  return "";
}
