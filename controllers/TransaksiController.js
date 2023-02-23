import Transaksi from "../models/TransaksiModel.js";
import db from "../config/Database.js";
import { QueryTypes } from "sequelize";

export const addTransaksi = async (req, res) => {
  try {
    const norek = req.body.norek;
    const jumlah = parseInt(req.body.jumlah);
    const type = req.body.type;
    let newSaldo = 0;

    let saldo = await db.query(
      "SELECT current_saldo FROM transaksi WHERE norek = :norek ORDER BY createdAt DESC LIMIT 1",
      {
        type: QueryTypes.SELECT,
        replacements: { norek: norek },
      }
    );

    if (saldo.length > 0) {
      const currentSaldo = parseInt(saldo[0].current_saldo);

      if (type === "setoran") {
        newSaldo = currentSaldo + jumlah;
      } else if (type === "penarikan") {
        if (currentSaldo < jumlah) {
          res.status(400).json({ msg: "Saldo tidak cukup!" });
          return;
        } else {
          newSaldo = currentSaldo - jumlah;
        }
      }
    } else {
      const currentSaldo = 0;

      if (type === "penarikan") {
        res.status(400).json({ msg: "Saldo tidak cukup!" });
        return;
      } else if (type === "setoran") {
        newSaldo = currentSaldo + jumlah;
      }
    }

    const transaksi = await Transaksi.create({
      id_transaksi: req.body.idTransaksi,
      teller: req.body.teller,
      norek: req.body.norek,
      tgl_transaksi: req.body.tglTransaksi,
      type: req.body.type,
      jumlah: req.body.jumlah,
      current_saldo: newSaldo,
    });

    res.status(200).json({ message: "data success send to server" });
  } catch (error) {
    console.log(error);
  }
};

export const getIdTransaksi = async (req, res) => {
  try {
    const dateNow = new Date(); // Format date : YYYY/MM/DD
    let dateNowDay = dateNow.getDate();
    let dateNowMonth = dateNow.getMonth() + 1;
    const dateNowYear = dateNow.getFullYear();

    if (dateNowDay < 10) {
      dateNowDay = "0" + dateNowDay.toString();
    } else {
      dateNowDay = dateNowDay.toString();
    }

    if (dateNowMonth < 10) {
      dateNowMonth = "0" + dateNowMonth.toString();
    } else {
      dateNowMonth = dateNowMonth.toString();
    }

    let currentDate = dateNowYear + "-" + dateNowMonth + "-" + dateNowDay;

    currentDate = currentDate.toString();

    let lastIdTransaksi = await db.query(
      `SELECT id_transaksi FROM transaksi WHERE tgl_transaksi = '${currentDate}' ORDER BY id_transaksi DESC LIMIT 1`,
      {
        type: QueryTypes.SELECT,
      }
    );

    if (lastIdTransaksi.length > 0) {
      lastIdTransaksi = lastIdTransaksi[0];
      lastIdTransaksi = lastIdTransaksi.id_transaksi.toString().slice(12, 15);
    } else {
      lastIdTransaksi = 0;
    }

    lastIdTransaksi = parseInt(lastIdTransaksi) + 1;
    lastIdTransaksi = lastIdTransaksi.toString();

    if (lastIdTransaksi.length === 1) {
      lastIdTransaksi = "00" + lastIdTransaksi;
    } else if (lastIdTransaksi.length === 2) {
      lastIdTransaksi = "0" + lastIdTransaksi;
    }
    console.log(lastIdTransaksi);

    const kodeTransaksi = "TRS-";

    const idTransaksi =
      kodeTransaksi + dateNowYear + dateNowMonth + dateNowDay + lastIdTransaksi;

    res.json(idTransaksi);
  } catch (error) {
    console.log(error);
  }
};

export const getTransaksiListing = async (req, res) => {
  try {
    const userRole = req.cookies.userRole;
    const username = req.cookies.username;

    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const offset = limit * page;

    let search = req.query.search_query || "";

    const filter = req.query.filter || "";

    let result;
    let totalRows;
    let totalPage;
    let checkFilter;
    let webUserJoin;
    let webUserWhere;

    if (userRole === "nasabah") {
      webUserJoin = "LEFT JOIN nsb_webuser wu ON nb.norek = wu.norek";
      webUserWhere = "AND wu.username = '" + username + "'";
    } else {
      webUserJoin = "";
      webUserWhere = "";
    }

    if (filter !== "") {
      checkFilter = "AND tr.type = '" + filter + "'";
    } else {
      checkFilter = "";
    }

    totalRows = await db.query(
      `SELECT COUNT(*) as totalRows FROM transaksi tr INNER JOIN nasabah nb ON tr.norek = nb.norek ${webUserJoin} WHERE (tr.id_transaksi LIKE :search OR tr.norek LIKE :search OR nb.nama_lengkap LIKE :search OR tr.teller LIKE :search) ${checkFilter} ${webUserWhere} ORDER BY tr.createdAt DESC LIMIT :limit`,
      {
        type: QueryTypes.SELECT,
        replacements: {
          search: "%" + search + "%",
          limit: limit,
          offset: offset,
        },
      }
    );

    totalRows = totalRows[0].totalRows;
    totalPage = Math.ceil(totalRows / limit);

    result = await db.query(
      `SELECT tr.id_transaksi, tr.type, tr.tgl_transaksi, tr.norek, nb.nama_lengkap, nb.kelas, jr.nama_jurusan, concat('Rp. ', format(tr.jumlah, 0)) AS jumlah FROM transaksi tr INNER JOIN nasabah nb ON tr.norek = nb.norek ${webUserJoin} LEFT JOIN jurusan jr ON jr.id = nb.kode_jurusan WHERE (tr.id_transaksi LIKE :search OR tr.norek LIKE :search OR nb.nama_lengkap LIKE :search OR tr.teller LIKE :search) ${checkFilter} ${webUserWhere} ORDER BY tr.createdAt DESC LIMIT :limit OFFSET :offset `,
      {
        type: QueryTypes.SELECT,
        replacements: {
          search: "%" + search + "%",
          limit: limit,
          offset: offset,
        },
      }
    );

    res.json({
      result: result,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTransaksiById = async (req, res) => {
  try {
    const idTransaksi = req.params.idTransaksi;

    const result = await db.query(
      "SELECT id_transaksi, tgl_transaksi, norek, teller, type, concat('Rp .', format(jumlah, 0)) AS jumlah_formatted, jumlah FROM transaksi WHERE id_transaksi = :idTransaksi",
      {
        type: QueryTypes.SELECT,
        replacements: {
          idTransaksi: idTransaksi,
        },
      }
    );

    res.json(result[0]);
  } catch (error) {
    console.log(error);
  }
};

export const getCountTransaksi = async (req, res) => {
  try {
    const dateStart = req.body.dateStart;
    const dateEnd = req.body.dateEnd;

    const totalTransaksi = await db.query(
      "SELECT COUNT(*) AS total_transaksi FROM transaksi WHERE createdAt >= :dateStart AND createdAt <= :dateEnd",
      {
        type: QueryTypes.SELECT,
        replacements: {
          dateStart: dateStart,
          dateEnd: dateEnd,
        },
      }
    );

    res.json(totalTransaksi);
  } catch (error) {
    console.log(error);
  }
};
