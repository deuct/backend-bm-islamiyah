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

router.get("/user/one", verifyToken, getUserById);
router.post(
  "/user/update",
  verifyToken,
  profilePictUpload.array("profilePict"),
  updateUser
);

router.get("/jenkel/all", verifyToken, getJenisKelamin);

// router.post("/nasabah/mobileuser/add", verifyToken, addMobileUser);
// router.post("/nasabah/mobileuser/update", verifyToken, updateMobileUser);
// router.post("/nasabah/mobileuser/delete", verifyToken, deleteMobileUser);
// router.get("/nasabah/mobileuser/newid", verifyToken, getMobileUserId);
// router.get("/nasabah/mobileuser/listing", verifyToken, getMobileUserListing);
// router.get("/nasabah/mobileuser/one/:userId", verifyToken, getMobileUserById);

export default router;
