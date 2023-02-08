import Teller from "../models/TellerModel.js";
import db from "../config/Database.js";
import { QueryTypes } from "sequelize";

export const addTeller = async (req, res) => {
  try {
    const teller = await Teller.create({
      username: req.body.idTeller,
      nama_lengkap: req.body.namaLengkap,
      nuptk: req.body.nuptk,
      photo_dir: "files/images/profile-picture/avatar.png",
    });

    const teller_usr = await User.create({
      username: req.body.idTeller,
      password: "$2a$12$bqR0I0w4p28fp9gbH8j/guwgxy2pjw.JFEGqvn5jyVFskpZep1RUS",
      isNewUser: "Y",
    });

    res.status(200).json({ message: "data success send to server" });
  } catch (error) {
    console.log(error);
  }
};

export const updateTeller = async (req, res) => {
  try {
    const idTeller = req.body.idTeller;
    const namaLengkap = req.body.namaLengkap;
    const nuptk = req.body.nuptk;

    const updateData = await db.query(
      "UPDATE teller SET nama_lengkap = :namaLengkap, nuptk = :nuptk WHERE username = :idTeller",
      {
        type: QueryTypes.UPDATE,
        replacements: {
          idTeller: idTeller,
          namaLengkap: namaLengkap,
          nuptk: nuptk,
        },
      }
    );

    res.json({ msg: "Successfully edit data" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTeller = async (req, res) => {
  try {
    const idTeller = req.body.idTeller;

    const deleteData = await db.query(
      "DELETE FROM teller WHERE username = :idTeller",
      {
        type: QueryTypes.DELETE,
        replacements: {
          idTeller: idTeller,
        },
      }
    );

    res.json({ msg: "Successfully delete the data" });
  } catch (error) {
    console.log(error);
  }
};

export const getTellerId = async (req, res) => {
  try {
    let lastNumber = await db.query(
      "SELECT username FROM teller ORDER BY createdAt DESC",
      { type: QueryTypes.SELECT }
    );

    lastNumber = lastNumber[0].username.toString().slice(3, 6);
    lastNumber = parseInt(lastNumber) + 1;
    lastNumber = lastNumber.toString();

    if (lastNumber.length === 1) {
      lastNumber = "00" + lastNumber;
    } else if (lastNumber.length === 2) {
      lastNumber = "0" + lastNumber;
    } else if (lastNumber.length === 3) {
      lastNumber = lastNumber;
    }

    const tellerId = "TLR" + lastNumber;

    res.json(tellerId);
  } catch (error) {
    console.log(error);
  }
};

export const getTellerById = async (req, res) => {
  try {
    const idTeller = req.params.idTeller;

    const result = await db.query(
      "SELECT username, no, nama_lengkap, nuptk FROM teller WHERE username = :idTeller",
      {
        type: QueryTypes.SELECT,
        replacements: {
          idTeller: idTeller,
        },
      }
    );

    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const getTeller = async (req, res) => {
  try {
    const teller = await db.query("SELECT * FROM teller", {
      type: QueryTypes.SELECT,
    });

    res.json(teller);
  } catch (error) {
    console.log(error);
  }
};

export const getTellerListing = async (req, res) => {
  try {
    const lastId = parseInt(req.query.lastId) || 0;
    const limit = parseInt(req.query.limit) || 10;
    let search = req.query.search_query || "";
    search = search.replace(/[^\w\s]/gi, "");

    let arrResult = [];
    let resLastId;

    const totalRow = await db.query("SELECT COUNT(*) AS total FROM teller");

    if (lastId === totalRow[0][0].total) {
      return res.json({ msg: "All data has been loaded", hasMore: false });
    }

    if (lastId < 1) {
      const result = await db.query(
        "SELECT * FROM teller WHERE nama_lengkap LIKE :search OR nuptk LIKE :search OR username LIKE :search ORDER BY no ASC LIMIT :limit ",
        {
          type: QueryTypes.SELECT,
          replacements: {
            search: "%" + search + "%",
            limit: limit,
          },
        }
      );

      arrResult = result;
      resLastId = arrResult[arrResult.length - 1].no;
      // resLastId = parseInt(resLastId.slice(3, 6));
    } else {
      console.log(lastId);
      console.log("123");
      const result = await db.query(
        "SELECT * FROM teller t1 RIGHT JOIN (SELECT no AS idt2, username FROM teller) t2 ON t1.username = t2.username WHERE t2.idt2 > :lastId AND ( t1.nama_lengkap LIKE :search OR t1.nuptk LIKE :search OR t1.username LIKE :search) GROUP BY t2.idt2 ORDER BY t1.no ASC LIMIT :limit ",
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
