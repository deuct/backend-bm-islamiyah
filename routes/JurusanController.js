import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  addJurusan,
  getJurusan,
  getJurusanById,
  getJurusanListing,
} from "../controllers/JurusanController.js";

const routerJurusan = express.Router();

routerJurusan.post("/jurusan/add", verifyToken, addJurusan);
routerJurusan.get("/jurusan/listing", verifyToken, getJurusanListing);
routerJurusan.get("/jurusan/one/:id", verifyToken, getJurusanById);
routerJurusan.get("/jurusan/all", verifyToken, getJurusan);

export default routerJurusan;
