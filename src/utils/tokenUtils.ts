import "dotenv/config";
import jwt from "jsonwebtoken";

const J_SECRET: string = process.env.ENCRYPTION_SECRET;

export function emitToken(email: string) {
  return jwt.sign({ email }, J_SECRET, { expiresIn: "4h" });
}

export function validateToken(token: string) {
  return jwt.verify(token, J_SECRET);
}

function isPreviousTokenExpired() {
  return '';
}