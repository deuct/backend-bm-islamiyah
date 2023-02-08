import db from "../config/Database.js";
import { QueryTypes } from "sequelize";

export const setHomeDate = async (req, res) => {
  try {
    const dateNasabahStart = req.body.dateNasabahStart;
    const dateNasabahEnd = req.body.dateNasabahEnd;

    const dateSaldoStart = req.body.dateSaldoStart;
    const dateSaldoEnd = req.body.dateSaldoEnd;

    const dateTransaksiStart = req.body.dateTransaksiStart;
    const dateTransaksiEnd = req.body.dateTransaksiEnd;

    const nasabahUpdate = await db.query(
      "UPDATE st_homedate SET period_start = :dateNasabahStart, period_end = :dateNasabahEnd WHERE name = 'nasabah'",
      {
        type: QueryTypes.UPDATE,
        replacements: {
          dateNasabahStart: dateNasabahStart,
          dateNasabahEnd: dateNasabahEnd,
        },
      }
    );

    const saldoUpdate = await db.query(
      "UPDATE st_homedate SET period_start = :dateSaldoStart, period_end = :dateSaldoEnd WHERE name = 'saldo'",
      {
        type: QueryTypes.UPDATE,
        replacements: {
          dateSaldoStart: dateSaldoStart,
          dateSaldoEnd: dateSaldoEnd,
        },
      }
    );

    const transaksiUpdate = await db.query(
      "UPDATE st_homedate SET period_start = :dateTransaksiStart, period_end = :dateTransaksiEnd WHERE name = 'transaksi'",
      {
        type: QueryTypes.UPDATE,
        replacements: {
          dateTransaksiStart: dateTransaksiStart,
          dateTransaksiEnd: dateTransaksiEnd,
        },
      }
    );

    res.json({ msg: "success update data" });
  } catch (error) {
    console.log(error);
  }
};

export const getHomeDate = async (req, res) => {
  try {
    const homeDate = await db.query(
      "SELECT name, period_start, period_end FROM st_homedate",
      {
        type: QueryTypes.SELECT,
      }
    );

    res.json(homeDate);
  } catch (error) {
    console.log(error);
  }
};
