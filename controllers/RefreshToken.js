import Admin from "../models/AdminModel.js";
import jwt from "jsonwebtoken";
import db from "../config/Database.js";
import { QueryTypes } from "sequelize";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const userRole = req.cookies.userRole;
    const username = req.cookies.username;

    if (!refreshToken) return res.sendStatus(401);

    let user;

    if (userRole === "admin") {
      user = await db.query(
        "SELECT adm.nama_lengkap AS name, usr.username, usr.password, usr.refresh_token FROM user usr INNER JOIN admin adm ON adm.username = usr.username WHERE usr.refresh_token = :refreshToken AND usr.username = :username AND usr.role = :userRole",
        {
          type: QueryTypes.SELECT,
          replacements: {
            refreshToken: refreshToken,
            username: username,
            userRole: userRole,
          },
        }
      );
    } else if (userRole === "nasabah") {
      user = await db.query(
        "SELECT nsb.name, usr.username, usr.password, usr.refresh_token FROM user usr INNER JOIN (SELECT nb.nama_lengkap AS name, wu.username FROM nasabah nb INNER JOIN nsb_webuser wu ON nb.norek = wu.norek WHERE wu.username = :username) nsb ON usr.username =  nsb.username WHERE usr.refresh_token = :refreshToken AND usr.username = :username AND usr.role = :userRole",
        {
          type: QueryTypes.SELECT,
          replacements: {
            refreshToken: refreshToken,
            username: username,
            userRole: userRole,
          },
        }
      );
    } else if (userRole === "teller") {
      user = await db.query(
        "SELECT usr.username, tlr.nama_lengkap AS name, usr.password, usr.refresh_token FROM user usr INNER JOIN teller tlr ON usr.username = tlr.username WHERE usr.refresh_token = :refreshToken AND usr.username = :username",
        {
          type: QueryTypes.SELECT,
          replacements: {
            refreshToken: refreshToken,
            username: username,
          },
        }
      );
    }

    if (!user[0]) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);

        const username = user[0].username;
        const userFullName = user[0].name;
        const userRoles = user[0].role;

        const accessToken = jwt.sign(
          { username, userFullName, userRoles },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "60s" }
        );

        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
