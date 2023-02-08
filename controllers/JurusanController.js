import db from "../config/Database.js";
import { QueryTypes } from "sequelize";
import Jurusan from "../models/JurusanModel.js";

export const addJurusan = async (req, res) => {
  try {
    const jurusan = await Jurusan.create({
      nama_jurusan: req.body.namaJurusan,
    });

    res.status(200).json({ msg: "data success send to server" });
  } catch (error) {
    console.log(error);
  }
};

export const updateJurusan = async (req, res) => {
  try {
    const namaJurusan = req.body.namaJurusan;
    const id = req.body.id;

    const update = await db.query(
      "UPDATE jurusan SET nama_jurusan = :namaJurusan WHERE id = :id",
      {
        type: QueryTypes.UPDATE,
        replacements: {
          namaJurusan: namaJurusan,
          id: id,
        },
      }
    );

    res.status(200).json({ msg: "update success" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteJurusan = async (req, res) => {
  try {
    const id = req.body.id;

    await db.query("DELETE FROM jurusan WHERE id = :id", {
      type: QueryTypes.DELETE,
      replacements: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJurusan = async (req, res) => {
  try {
    const jurusan = await db.query("SELECT * FROM jurusan", {
      type: QueryTypes.SELECT,
    });

    res.json(jurusan);
  } catch (error) {
    console.log(error);
  }
};

export const getJurusanListing = async (req, res) => {
  try {
    const lastId = parseInt(req.query.lastId) || 0;
    const limit = parseInt(req.query.limit) || 10;
    let search = req.query.search_query || "";
    search = search.replace(/[^\w\s]/gi, "");

    let arrResult = [];
    let resLastId;

    const totalRow = await db.query("SELECT COUNT(*) AS total FROM jurusan");

    if (lastId === totalRow[0][0].total) {
      return res.json({ msg: "All data has been loaded", hasMore: false });
    }

    if (lastId < 1) {
      const result = await db.query(
        "SELECT * FROM jurusan WHERE nama_jurusan LIKE :search OR nuptk LIKE :search OR username LIKE :search ORDER BY no ASC LIMIT :limit ",
        {
          type: QueryTypes.SELECT,
          replacements: {
            search: "%" + search + "%",
            limit: limit,
          },
        }
      );

      arrResult = result;
      resLastId = arrResult[arrResult.length - 1].id;
    } else {
      const result = await db.query(
        "SELECT * FROM jurusan j1 RIGHT JOIN (SELECT id AS idj2, username FROM jurusan) j2 ON j1.id = j2.id WHERE j2.idj2 > :lastId AND ( j1.nama_jurusan LIKE :search) GROUP BY j2.idj2 ORDER BY j1.id ASC LIMIT :limit ",
        {
          type: QueryTypes.SELECT,
          replacements: {
            search: "%" + search + "%",
            limit: limit,
            lastId: lastId,
          },
        }
      );

      arrResult = result;
      resLastId = arrResult[arrResult.length - 1].idt2;
    }

    res.json({
      result: arrResult,
      lastId: arrResult.length ? resLastId : 0,
      hasMore: arrResult.length >= limit ? true : false,
      isMore: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJurusanById = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await db.query("SELECT * FROM jurusan WHERE id = :id", {
      type: QueryTypes.SELECT,
      replacements: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
