import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/Database.js";
import { QueryTypes } from "sequelize";
import multer from "multer";
import fs from "fs";

import helperAll from "../helper/helperAll.js";

const { helperAllVal } = helperAll();

export const login = async (req, res) => {
  try {
    const userRole = req.body.userRole;
    const uname = req.body.username;

    let user;

    user = await db.query(
      "SELECT * FROM user WHERE role = :userRole AND username = :uname",
      {
        type: QueryTypes.SELECT,
        replacements: {
          userRole: userRole,
          uname: uname,
        },
      }
    );

    if (user.length == 0) {
      res.json({ msg: "failed login" });
    } else {
      const match = await bcrypt.compare(req.body.password, user[0].password);

      if (!match) return res.status(400).json({ msg: "failed login" });

      const userName = user[0].username;

      const accessToken = jwt.sign(
        {
          userName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60s" }
      );

      const refreshToken = jwt.sign(
        { userName },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      await db.query(
        "UPDATE user SET refresh_token = :refreshToken WHERE username = :username AND role = :userRole",
        {
          type: QueryTypes.UPDATE,
          replacements: {
            refreshToken: refreshToken,
            username: userName,
            userRole: userRole,
          },
        }
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 1 * 60 * 60 * 1000, // Hour * Minute * Second * 1000
        secure: true, // (for https use)
        // signed: true,
        // secure: false,
        credentials: "include",
        // sameSite: "None",
      });

      res.cookie("userRole", userRole, {
        httpOnly: true,
        maxAge: 1 * 60 * 60 * 1000,
        secure: true,
        // signed: true,
        credentials: "include",
        // sameSite: "None",
      });

      res.cookie("username", userName, {
        httpOnly: true,
        maxAge: 1 * 60 * 60 * 1000,
        secure: true,
        // signed: true,
        credentials: "include",
        // sameSite: "None",
      });

      const isNewUser = user[0].isNewUser;

      res.json({ accessToken, isNewUser });
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const userRole = req.cookies.userRole;

  // console.log(refreshToken);
  if (!refreshToken) return res.sendStatus(204);

  console.log("jalan");

  let user;

  user = await db.query(
    "SELECT * FROM user WHERE refresh_token = :refreshToken",
    {
      type: QueryTypes.SELECT,
      replacements: {
        refreshToken: refreshToken,
      },
    }
  );

  console.log(user);

  if (!user[0]) return res.sendStatus(204);

  const username = user[0].username;

  await db.query(
    "UPDATE user SET refresh_token = '' WHERE username = :username AND role = :userRole ",
    {
      type: QueryTypes.UPDATE,
      replacements: {
        username: username,
        userRole: userRole,
      },
    }
  );

  // var today = new Date().toUTCString(); Check date purpose
  res.clearCookie("refreshToken");
  res.clearCookie("userRole");
  res.clearCookie("username");

  return res.sendStatus(200);
};

export const changePassword = async (req, res) => {
  try {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.password;
    const secondPassword = req.body.secondPassword;
    const username = req.cookies.username;
    const userRole = req.cookies.userRole;

    if (newPassword !== secondPassword) {
      return res.status(400).json({ msg: "New password not match" });
    } else if (newPassword === secondPassword) {
      let currentPassword;

      currentPassword = await db.query(
        "SELECT password FROM user WHERE username = :username and role = :userRole",
        {
          type: QueryTypes.SELECT,
          replacements: { username: username, userRole: userRole },
        }
      );

      if (currentPassword) {
        const match = await bcrypt.compare(
          oldPassword,
          currentPassword[0].password
        );

        if (match) {
          const salt = await bcrypt.genSalt();
          const hashPassword = await bcrypt.hash(newPassword, salt);

          let updatePassword;

          updatePassword = db.query(
            "UPDATE user SET password = :hashPassword WHERE username = :username AND role = :userRole",
            {
              type: QueryTypes.UPDATE,
              replacements: {
                username: username,
                hashPassword: hashPassword,
                userRole: userRole,
              },
            }
          );

          if (updatePassword) {
            return res
              .status(200)
              .json({ msg: "Successfully change password" });
          }
        } else {
          return res.status(400).json({ msg: "old password is wrong" });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserRole = async (req, res) => {
  try {
    const userRole = req.cookies.userRole;

    res.json(userRole);
  } catch (error) {
    console.log(error);
  }
};

export const updateIsNewUser = async (req, res) => {
  try {
    const isNewUser = req.body.isNewUser;
    const userRole = req.cookies.userRole;
    const username = req.cookies.username;

    let updateFlag;

    updateFlag = await db.query(
      "UPDATE user SET isNewUser = :isNewUser WHERE username = :username AND role = :userRole",
      {
        type: QueryTypes.UPDATE,
        replacements: {
          isNewUser: isNewUser,
          username: username,
          userRole: userRole,
        },
      }
    );

    if (updateFlag) {
      res.status(200).json({ msg: "Flagging updated" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const username = req.cookies.username;
    const userRole = req.cookies.userRole;

    let user;

    if (userRole === "nasabah") {
      user = await db.query(
        "SELECT wu.username, nb.nama_lengkap AS full_name, wu.norek, wu.photo_dir, us.isNewUser FROM nsb_webuser wu INNER JOIN user us ON us.username = wu.username LEFT JOIN nasabah nb ON nb.norek = wu.norek WHERE wu.username = :username",
        {
          type: QueryTypes.SELECT,
          replacements: {
            username: username,
          },
        }
      );
    } else if (userRole === "teller") {
      user = await db.query(
        "SELECT tlr.username, tlr.nama_lengkap AS full_name, tlr.nuptk, tlr.photo_dir, us.isNewUser FROM teller tlr INNER JOIN user us ON us.username = tlr.username WHERE tlr.username = :username",
        {
          type: QueryTypes.SELECT,
          replacements: {
            username: username,
          },
        }
      );
    } else if (userRole === "admin") {
      user = await db.query(
        "SELECT adm.nama_lengkap AS full_name, adm.username, adm.photo_dir, us.isNewUser FROM admin adm INNER JOIN user us ON adm.username = us.username WHERE us.username = :username",
        {
          type: QueryTypes.SELECT,
          replacements: {
            username: username,
          },
        }
      );
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const profilePictStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files/images/profile-picture");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/\s+/g, ""));
  },
});

export const profilePictUpload = multer({ storage: profilePictStorage });

export const updateUser = async (req, res) => {
  try {
    const userRole = req.cookies.userRole;
    const username = req.cookies.username;

    let imagePath = req.files[0].path;
    imagePath = imagePath.replace(/\\/g, "/");

    let updateUser;
    let photoBefore;

    if (userRole === "nasabah") {
      photoBefore = await db.query(
        "SELECT photo_dir from nsb_webuser WHERE username = :username",
        {
          type: QueryTypes.SELECT,
          replacements: {
            username: username,
          },
        }
      );

      if (photoBefore[0] !== "") {
        fs.unlink(helperAllVal.directory + photoBefore[0].photo_dir, (err) => {
          if (err) {
            throw err;
          }
        });
      }

      updateUser = await db.query(
        "UPDATE nsb_webuser wu SET wu.photo_dir = :imagePath WHERE wu.username = :username",
        {
          type: QueryTypes.UPDATE,
          replacements: {
            imagePath: imagePath,
            username: username,
          },
        }
      );
    } else if (userRole === "teller") {
      photoBefore = await db.query(
        "SELECT photo_dir from teller WHERE username = :username",
        {
          type: QueryTypes.SELECT,
          replacements: {
            username: username,
          },
        }
      );

      if (photoBefore[0] !== "") {
        fs.unlink(helperAllVal.directory + photoBefore[0].photo_dir, (err) => {
          if (err) {
            throw err;
          }
        });
      }

      updateUser = await db.query(
        "UPDATE teller SET photo_dir = :imagePath WHERE username = :username",
        {
          type: QueryTypes.UPDATE,
          replacements: {
            imagePath: imagePath,
            username: username,
          },
        }
      );
    } else if (userRole === "admin") {
      photoBefore = await db.query(
        "SELECT photo_dir from admin WHERE username = :username",
        {
          type: QueryTypes.SELECT,
          replacements: {
            username: username,
          },
        }
      );

      if (photoBefore[0] !== "") {
        fs.unlink(helperAllVal.directory + photoBefore[0].photo_dir, (err) => {
          if (err) {
            throw err;
          }
        });
      }

      updateUser = await db.query(
        "UPDATE admin SET photo_dir = :imagePath WHERE username = :username",
        {
          type: QueryTypes.UPDATE,
          replacements: {
            imagePath: imagePath,
            username: username,
          },
        }
      );
    }

    res.status(200).json({ msg: "success udpate user" });
  } catch (error) {
    console.log(error);
  }
};
