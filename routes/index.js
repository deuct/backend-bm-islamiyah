import express from "express";

import { verifyToken } from "../middleware/VerifyToken.js";
import {
  changePassword,
  getUserById,
  getUserRole,
  login,
  logout,
  profilePictUpload,
  updateIsNewUser,
  updateUser,
} from "../controllers/UserController.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {
  addTeller,
  deleteTeller,
  getTeller,
  getTellerById,
  getTellerId,
  getTellerListing,
  updateTeller,
} from "../controllers/TellerController.js";
import {
  addTransaksi,
  getCountTransaksi,
  getIdTransaksi,
  getTransaksiById,
  getTransaksiListing,
} from "../controllers/TransaksiController.js";
import { getHomeDate, setHomeDate } from "../controllers/HomeDateController.js";
import {
  getPrintTabungan,
  getReport,
} from "../controllers/ReportController.js";
import {
  changeCompanyLogo,
  getCompanyLogo,
  imageUpload,
} from "../controllers/SystemSettingController.js";
import {
  addJurusan,
  getJurusan,
  getJurusanById,
  getJurusanListing,
} from "../controllers/JurusanController.js";
import { getJenisKelamin } from "../controllers/JKController.js";
import { testing } from "../controllers/TestingController.js";

const router = express.Router();

router.get("/", testing);

router.post("/login", login);
router.delete("/logout/", logout);
router.get("/token/", refreshToken);
router.get("/user-role", verifyToken, getUserRole);

router.post("/changepasswd", verifyToken, changePassword);
router.post("/update-isnewuser", verifyToken, updateIsNewUser);

// router.get("/admin/one/:username", verifyToken, getAdminById);

router.get("/user/one", verifyToken, getUserById);
router.post(
  "/user/update",
  verifyToken,
  profilePictUpload.array("profilePict"),
  updateUser
);

router.post("/jurusan/add", verifyToken, addJurusan);
router.get("/jurusan/listing", verifyToken, getJurusanListing);
router.get("/jurusan/one/:id", verifyToken, getJurusanById);
router.get("/jurusan/all", verifyToken, getJurusan);

router.get("/jenkel/all", verifyToken, getJenisKelamin);

// router.post("/nasabah/mobileuser/add", verifyToken, addMobileUser);
// router.post("/nasabah/mobileuser/update", verifyToken, updateMobileUser);
// router.post("/nasabah/mobileuser/delete", verifyToken, deleteMobileUser);
// router.get("/nasabah/mobileuser/newid", verifyToken, getMobileUserId);
// router.get("/nasabah/mobileuser/listing", verifyToken, getMobileUserListing);
// router.get("/nasabah/mobileuser/one/:userId", verifyToken, getMobileUserById);

router.post("/teller/add", verifyToken, addTeller);
router.post("/teller/update", verifyToken, updateTeller);
router.post("/teller/delete", verifyToken, deleteTeller);
router.get("/teller/all", verifyToken, getTeller);
router.get("/teller/listing", verifyToken, getTellerListing);
router.get("/teller/newid", verifyToken, getTellerId);
router.get("/teller/one/:idTeller", verifyToken, getTellerById);

router.post("/transaksi/add", verifyToken, addTransaksi);
router.post("/transaksi/total-transaksi", verifyToken, getCountTransaksi);
router.get("/transaksi/newid", verifyToken, getIdTransaksi);
router.get("/transaksi/listing", verifyToken, getTransaksiListing);
router.get("/transaksi/one/:idTransaksi", verifyToken, getTransaksiById);

router.post("/report/view", verifyToken, getReport);
router.post("/report/printout/bukutabungan", verifyToken, getPrintTabungan);

router.post("/setting/master-data/homedate/update", verifyToken, setHomeDate);
router.get("/setting/master-data/homedate/all", verifyToken, getHomeDate);

router.post(
  "/setting/system/logo/update",
  verifyToken,
  imageUpload.array("images"),
  changeCompanyLogo
);
router.get("/setting/system/logo", verifyToken, getCompanyLogo);

export default router;
