import express from "express";
import db from "./config/Database.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helperAll from "./helper/helperAll.js";
import router from "./routes/index.js";
import routerNasabah from "./routes/NasabahRoutes.js";
import routerJurusan from "./routes/JurusanRoutes.js";
import routerTeller from "./routes/TellerRoutes.js";
import routerTransaksi from "./routes/TransaksiRoutes.js";
import routerReport from "./routes/ReportRoutes.js";

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
app.use(routerNasabah);
app.use(routerJurusan);
app.use(routerTeller);
app.use(routerTransaksi);
app.use(routerReport);

app.use("/files/images", express.static("./files/images"));

const port = helperAllVal.baseURL;

try {
  await db.authenticate();
  console.log("Successfully connected to database");
} catch (error) {
  console.log(error);
}

app.listen(port, () => console.log(`Server up and running on port ${port}`));
