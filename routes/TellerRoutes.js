import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  addTeller,
  deleteTeller,
  getTeller,
  getTellerById,
  getTellerId,
  getTellerListing,
  updateTeller,
} from "../controllers/TellerController.js";

const routerTeller = express.Router();

routerTeller.post("/teller/add", verifyToken, addTeller);
routerTeller.post("/teller/update", verifyToken, updateTeller);
routerTeller.post("/teller/delete", verifyToken, deleteTeller);
routerTeller.get("/teller/all", verifyToken, getTeller);
routerTeller.get("/teller/listing", verifyToken, getTellerListing);
routerTeller.get("/teller/newid", verifyToken, getTellerId);
routerTeller.get("/teller/one/:idTeller", verifyToken, getTellerById);

export default routerTeller;
