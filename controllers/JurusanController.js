import db from "../config/Database.js";
import { QueryTypes } from "sequelize";
import Jurusan from "../models/JurusanModel.js";

export const addJurusan = async (req, res) => {
  try {
    const jurusan = await Jurusan.create({
      nama_jurusan: req.body.namaJurusan,
      deskripsi: req.body.deskripsiJurusan,
    });

    res.status(200).json({ msg: "data success send to server" });
  } catch (error) {
    console.log(error);
  }
};

export const updateJurusan = async (req, res) => {
  try {
    const namaJurusan = req.body.namaJurusan;
    const deskripsiJurusan = req.body.deskripsiJurusan;
    const id = req.body.idJurusan;

    const update = await db.query(
      "UPDATE jurusan SET nama_jurusan = :namaJurusan, deskripsi = :deskripsiJurusan WHERE id = :id",
      {
        type: QueryTypes.UPDATE,
        replacements: {
          namaJurusan: namaJurusan,
          deskripsiJurusan: deskripsiJurusan,
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
    const id = req.body.idJurusan;

    await db.query("DELETE FROM jurusan WHERE id = :id", {
      type: QueryTypes.DELETE,
      replacements: {
        id: id,
      },
    });

    res.status(200).json({ msg: "success delete" });
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
        "SELECT * FROM jurusan WHERE nama_jurusan LIKE :search OR deskripsi LIKE :search ORDER BY id ASC LIMIT :limit ",
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
        "SELECT * FROM jurusan j1 RIGHT JOIN (SELECT id AS idj2 FROM jurusan) j2 ON j1.id = j2.idj2 WHERE j2.idj2 > :lastId AND ( j1.nama_jurusan LIKE :search OR j1.deskripsi LIKE :search) GROUP BY j2.idj2 ORDER BY j1.id ASC LIMIT :limit ",
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

      if (arrResult.length === 0) {
        return res.json({
          msg: "All data has been loaded",
          hasMore: false,
        });
      }

      resLastId = arrResult[arrResult.length - 1].idj2;
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

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
