import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { getHomeDate, setHomeDate } from "../controllers/HomeDateController.js";
import {
  changeCompanyLogo,
  getCompanyLogo,
  imageUpload,
} from "../controllers/SystemSettingController.js";

const routerReport = express.Router();

routerReport.post(
  "/setting/master-data/homedate/update",
  verifyToken,
  setHomeDate
);
routerReport.get("/setting/master-data/homedate/all", verifyToken, getHomeDate);
routerReport.post(
  "/setting/system/logo/update",
  verifyToken,
  imageUpload.array("images"),
  changeCompanyLogo
);
routerReport.get("/setting/system/logo", verifyToken, getCompanyLogo);

export default routerReport;
