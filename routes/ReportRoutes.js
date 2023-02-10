import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  getPrintTabungan,
  getReport,
} from "../controllers/ReportController.js";

const routerReport = express.Router();

routerReport.post("/report/view", verifyToken, getReport);
routerReport.post(
  "/report/printout/bukutabungan",
  verifyToken,
  getPrintTabungan
);

export default routerReport;
