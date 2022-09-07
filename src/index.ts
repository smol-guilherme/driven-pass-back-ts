import express, { json } from "express";
import "express-async-errors";
import "dotenv/config"
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import credentialsRouter from "./routers/credentialsRouter.js";
import { handleError } from "./middlewares/errorHandler.js";

const app = express();

app.use(json());
app.use(cors());
app.use(authRouter);
app.use(credentialsRouter)
app.use(handleError);

const PORT: number = Number(process.env.PORT) || 4000;

app.listen(PORT, () => console.log(`Server up and running on PORT ${PORT}@${Date()}`) );