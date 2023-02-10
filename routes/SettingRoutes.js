import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { getHomeDate, setHomeDate } from "../controllers/HomeDateController.js";
import {
  changeCompanyLogo,
  getCompanyLogo,
  imageUpload,
} from "../controllers/SystemSettingController.js";

const routerSetting = express.Router();

routerSetting.post(
  "/setting/master-data/homedate/update",
  verifyToken,
  setHomeDate
);
routerSetting.get(
  "/setting/master-data/homedate/all",
  verifyToken,
  getHomeDate
);
routerSetting.post(
  "/setting/system/logo/update",
  verifyToken,
  imageUpload.array("images"),
  changeCompanyLogo
);
routerSetting.get("/setting/system/logo", verifyToken, getCompanyLogo);

export default routerSetting;
