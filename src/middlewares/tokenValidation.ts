import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const J_SECRET: string = process.env.ENCRYPTION_SECRET!;

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token: string | undefined = authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).send();
  const verifyCallback = jwt.verify(token!, J_SECRET, (error, decoded) => {
    if (error !== null) return res.status(401).send();
    res.locals.id = decoded;
  });
  next();
}

function isPreviousTokenExpired() {
  return "";
}
