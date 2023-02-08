import Admin from "../models/AdminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/Database.js";
import { QueryTypes } from "sequelize";

export const getAdminById = async (req, res) => {
  try {
    const username = req.params.username;

    const result = await db.query(
      "SELECT name, username, password FROM admin WHERE username = :username",
      {
        type: QueryTypes.SELECT,
        replacements: {
          username: username,
        },
      }
    );

    res.json({ result });
  } catch (error) {
    console.log(error);
  }
};
