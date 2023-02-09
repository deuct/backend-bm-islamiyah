import express from "express";
import db from "./config/Database.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";

import helperAll from "./helper/helperAll.js";

const { helperAllVal } = helperAll();

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "https://smkislamiyahciputattangsel.sch.id",
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.use("/files/images", express.static("./files/images"));

const port = helperAllVal.baseURL;

try {
  await db.authenticate();
  console.log("Successfully connected to database");
} catch (error) {
  console.log(error);
}

app.listen(port, () => console.log(`Server up and running on port ${port}`));
