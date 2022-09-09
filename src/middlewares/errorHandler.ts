import { Request, Response, NextFunction } from "express";

interface IError extends Error {
  details: IJoiError[];
  type: string;
  message: string;
}

interface IJoiError {
  type: string;
  custom_message?: string;
}

export function handleError(
  error: IError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);

  if (isJoiError(error)) {
    if (error?.details[0]?.type === "string.pattern.base")
      return res.status(422).send();
    if (error?.details[0]?.type === "any.only") return res.status(422).send();
    if (error?.details[0]?.type === "string.empty")
      return res.status(422).send();
  }
  if (error.type === "not_found_error") return res.status(404).send();
  if (error.type === "no_schema_error") return res.status(400).send();
  if (error.type === "registry_conflict")
    return res.status(409).send(error.message);
  if (error.type === "authentication_error")
    return res.status(401).send(error.message);

  res.status(500).send({ message: "server error, please try again later" });
}

function isJoiError(error: IError) {
  if (Object.keys(error).includes("details")) return true;
  return false;
}
