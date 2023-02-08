import db from "../config/Database.js";
import { QueryTypes } from "sequelize";

export const getJenisKelamin = async (req, res) => {
  try {
    const jenisKelamin = await db.query("SELECT * FROM jenis_kelamin", {
      type: QueryTypes.SELECT,
    });

    res.status(200).json(jenisKelamin);
  } catch (error) {
    console.log(error);
  }
};
