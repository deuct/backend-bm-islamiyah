import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  addTransaksi,
  getCountTransaksi,
  getIdTransaksi,
  getTransaksiById,
  getTransaksiListing,
} from "../controllers/TransaksiController.js";

const routerTransaksi = express.Router();

routerTransaksi.post("/transaksi/add", verifyToken, addTransaksi);
routerTransaksi.post(
  "/transaksi/total-transaksi",
  verifyToken,
  getCountTransaksi
);
routerTransaksi.get("/transaksi/newid", verifyToken, getIdTransaksi);
routerTransaksi.get("/transaksi/listing", verifyToken, getTransaksiListing);
routerTransaksi.get(
  "/transaksi/one/:idTransaksi",
  verifyToken,
  getTransaksiById
);

export default routerTransaksi;
