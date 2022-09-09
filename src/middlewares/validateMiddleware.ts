import { Request, Response, NextFunction } from "express";
import * as schemas from "./schemas/dataSchemas.js";

export default async function validateData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validationData = [req.params, req.body];
  for (const index in validationData) {
    if (Object.keys(validationData[index]).length === 0) continue;
    const schema = schemas[setSchema(validationData[index])];
    await schema.validateAsync(validationData[index], {
      abortEarly: false,
    });
  }
  next();
}

function setSchema(objectData: Object) {
  const keys = Object.keys(objectData);
  for (let i = 0; i < keys.length; i++) {
    switch (keys[i]) {
      case "number":
        return "cardSchema";
      case "id":
        if (keys.length !== 1) break;
        return "idSchema";
      case "description":
        return "notesSchema";
      case "url":
        return "credentialsSchema";
      case "password":
        if (keys.includes("repeatPassword")) return "registrySchema";
        return "loginSchema";
      case "name":
        return "wifiSchema";
      default:
        break;
    }
  }
  throw { type: "no_schema_error" };
}
