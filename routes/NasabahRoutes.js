import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  addNasabah,
  getNasabahListing,
  getNasabahById,
  getNomorRekening,
  getSaldo,
  updateNasabah,
  deleteNasabah,
  getCountNasabah,
  getCountSaldo,
  getWebUserListing,
  getWebUserById,
  addWebUser,
  deleteWebUser,
  resetPasswordWebUser,
} from "../controllers/NasabahController.js";

const routerNasabah = express.Router();

routerNasabah.post("/nasabah/add", verifyToken, addNasabah);
routerNasabah.post("/nasabah/update", verifyToken, updateNasabah);
routerNasabah.post("/nasabah/delete", verifyToken, deleteNasabah);
routerNasabah.post("/nasabah/saldo", verifyToken, getSaldo);
routerNasabah.post("/nasabah/total-nasabah", verifyToken, getCountNasabah);
routerNasabah.post("/nasabah/total-saldo", verifyToken, getCountSaldo);
routerNasabah.get("/nasabah/newid", verifyToken, getNomorRekening);
routerNasabah.get("/nasabah/listing", verifyToken, getNasabahListing);
routerNasabah.get("/nasabah/one/:norek", verifyToken, getNasabahById);

routerNasabah.post("/nasabah/webuser/add", verifyToken, addWebUser);
routerNasabah.post(
  "/nasabah/webuser/resetpassword",
  verifyToken,
  resetPasswordWebUser
);
routerNasabah.post("/nasabah/webuser/delete", verifyToken, deleteWebUser);
routerNasabah.get("/nasabah/webuser/listing", verifyToken, getWebUserListing);
routerNasabah.get("/nasabah/webuser/one", verifyToken, getWebUserById);

export default routerNasabah;
