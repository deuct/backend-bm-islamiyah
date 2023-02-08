import db from "../config/Database.js";
import { QueryTypes } from "sequelize";

export const getReport = async (req, res) => {
  const dateStart = req.body.dateStart;
  const dateEnd = req.body.dateEnd;
  const reportType = req.body.reportType;

  let report;

  if (reportType === "Journal") {
    report = await db.query(
      "SELECT tr.id_transaksi, tr.tgl_transaksi Tanggal, tr.TYPE Keterangan, (-1 * debet.jumlah)  AS debet, kredit.jumlah AS kredit, SUM(-1 * debet.jumlah) OVER (ORDER BY tr.id_transaksi) AS totalDebet,  SUM(kredit.jumlah) OVER (ORDER BY tr.id_transaksi) AS totalKredit FROM transaksi tr LEFT JOIN (SELECT id_transaksi, TYPE, jumlah FROM transaksi WHERE TYPE = 'setoran') kredit ON kredit.id_transaksi = tr.id_transaksi  LEFT JOIN (SELECT id_transaksi, TYPE, jumlah FROM transaksi WHERE TYPE = 'penarikan') debet ON debet.id_transaksi = tr.id_transaksi WHERE tr.tgl_transaksi >= :dateStart AND tr.tgl_transaksi <= :dateEnd",
      {
        type: QueryTypes.SELECT,
        replacements: { dateStart: dateStart, dateEnd: dateEnd },
      }
    );
  } else if (reportType === "RekapEndOfDay") {
    report = await db.query(
      "SELECT tr.id_transaksi, tr.tgl_transaksi Tanggal, tr.TYPE Keterangan, (-1 * debet.jumlah)  AS debet, kredit.jumlah AS kredit, SUM(-1 * debet.jumlah) OVER (ORDER BY tr.id_transaksi) AS totalDebet,  SUM(kredit.jumlah) OVER (ORDER BY tr.id_transaksi) AS totalKredit FROM transaksi tr LEFT JOIN (SELECT id_transaksi, TYPE, jumlah FROM transaksi WHERE TYPE = 'setoran') kredit ON kredit.id_transaksi = tr.id_transaksi  LEFT JOIN (SELECT id_transaksi, TYPE, jumlah FROM transaksi WHERE TYPE = 'penarikan') debet ON debet.id_transaksi = tr.id_transaksi WHERE tr.tgl_transaksi >= :dateStart AND tr.tgl_transaksi <= :dateEnd",
      {
        type: QueryTypes.SELECT,
        replacements: { dateStart: dateStart, dateEnd: dateEnd },
      }
    );
  }

  res.json(report);
};

export const getPrintTabungan = async (req, res) => {
  try {
    const norek = req.query.norek;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    console.log(startDate);
    console.log(endDate);
    console.log(norek);

    const tabungan = await db.query(
      "SELECT tr.norek, tr.tgl_transaksi, CASE WHEN tr.TYPE = 'setoran' THEN CAST(tr.jumlah AS INTEGER) ELSE 0 END AS kredit, CASE WHEN tr.TYPE = 'penarikan' THEN CAST(tr.jumlah AS INTEGER) ELSE 0 END AS debet, tr.current_saldo AS saldo FROM transaksi tr WHERE tr.norek = :norek AND tr.tgl_transaksi >= :startDate AND tr.tgl_transaksi <= :endDate ORDER BY tr.createdAt ASC",
      {
        type: QueryTypes.SELECT,
        replacements: {
          norek: norek,
          startDate: startDate,
          endDate: endDate,
        },
      }
    );

    console.log(tabungan);

    res.status(200).json(tabungan);
  } catch (error) {
    console.log(error);
  }
};
