import db from "../config/Database.js";
import { QueryTypes } from "sequelize";
import Nasabah from "../models/NasabahModel.js";
import User from "../models/UserModel.js";
import WebUser from "../models/WebUserModel.js";
import Transaksi from "../models/TransaksiModel.js";

export const addNasabah = async (req, res) => {
  try {
    const nasabah = await Nasabah.create({
      norek: req.body.noRekening,
      pengesah: req.body.pengesah,
      nama_lengkap: req.body.namaLengkap,
      kelas: req.body.kelas,
      kode_jurusan: req.body.kodeJurusan,
      NIS: req.body.nis,
      kode_jk: req.body.kodeJK,
      tgl_lahir: req.body.tglLahir,
      alamat: req.body.alamat,
      notelp: req.body.noTelp,
      email: req.body.email,
      tgl_daftar: req.body.tglDaftar,
      ayah: req.body.ayah,
      ibu: req.body.ibu,
    });

    const isWebUser = req.body.isWebUser;

    if (isWebUser) {
      const webuser = await WebUser.create({
        username: req.body.wbUserName,
        norek: req.body.noRekening,
      });

      const webuser_usr = await User.create({
        username: req.body.wbUserName,
        password:
          "$2a$12$f.xgCpBG2II/ZjxOG9vC3u3qriPxcPMQPUIvdRJ7kysIqyqBxD3N.",
        isNewUser: "Y",
        role: "nasabah",
      });
    }

    res.status(200).json({ message: "data success send to server" });
  } catch (error) {
    console.log(error);
  }
};

export const updateNasabah = async (req, res) => {
  try {
    const norek = req.body.noRekening;
    const pengesah = req.body.pengesah;
    const namaLengkap = req.body.namaLengkap;
    const kelas = req.body.kelas;
    const kodeJurusan = req.body.kodeJurusan;
    const NIS = req.body.nis;
    const kodeJK = req.body.kodeJK;
    const tglLahir = req.body.tglLahir;
    const alamat = req.body.alamat;
    const notelp = req.body.noTelp;
    const email = req.body.email;
    const tglDaftar = req.body.tglDaftar;
    const ayah = req.body.ayah;
    const ibu = req.body.ibu;

    const update = await db.query(
      "UPDATE nasabah SET pengesah = :pengesah, nama_lengkap = :namaLengkap, kelas = :kelas, kode_jurusan = :kodeJurusan, NIS = :NIS, kode_jk = :kodeJK, tgl_lahir = :tglLahir, alamat = :alamat, notelp = :notelp, email = :email, tgl_daftar = :tglDaftar, ayah = :ayah, ibu = :ibu WHERE norek = :norek",
      {
        type: QueryTypes.UPDATE,
        replacements: {
          norek: norek,
          pengesah: pengesah,
          namaLengkap: namaLengkap,
          kelas: kelas,
          kodeJurusan: kodeJurusan,
          NIS: NIS,
          kodeJK: kodeJK,
          tglLahir: tglLahir,
          alamat: alamat,
          notelp: notelp,
          email: email,
          tglDaftar: tglDaftar,
          ayah: ayah,
          ibu: ibu,
        },
      }
    );

    res.json({ msg: "Update Success" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteNasabah = async (req, res) => {
  try {
    const norek = req.body.norek;

    await db.query("DELETE FROM nasabah WHERE norek = :norek", {
      type: QueryTypes.DELETE,
      replacements: {
        norek: norek,
      },
    });

    res.json({ msg: "Success delete data" });
  } catch (error) {
    console.log(error);
  }
};

export const getNomorRekening = async (req, res) => {
  try {
    const dateNow = new Date(); // Format date : YYYY/MM/DD
    let dateNowDay = dateNow.getDate();
    let dateNowMonth = dateNow.getMonth() + 1;
    const dateNowYear = dateNow.getFullYear();

    if (dateNowMonth < 10) {
      dateNowMonth = "0" + dateNowMonth.toString();
    } else {
      dateNowMonth = dateNowMonth.toString();
    }

    if (dateNowDay < 10) {
      dateNowDay = "0" + dateNowDay.toString();
    } else {
      dateNowDay = dateNowDay.toString();
    }

    let currentDate = dateNowYear + "-" + dateNowMonth + "-" + dateNowDay;

    currentDate = currentDate.toString();

    let lastNasabahNumber = await db.query(
      `SELECT norek FROM nasabah WHERE createdAt LIKE '%${currentDate}%' ORDER BY createdAt DESC LIMIT 1`,
      {
        type: QueryTypes.SELECT,
      }
    );

    if (lastNasabahNumber.length > 0) {
      lastNasabahNumber = lastNasabahNumber[0];
      lastNasabahNumber = lastNasabahNumber.norek.toString().slice(8, 12);
    } else {
      lastNasabahNumber = 0;
    }

    lastNasabahNumber = parseInt(lastNasabahNumber) + 1;
    lastNasabahNumber = lastNasabahNumber.toString();

    if (lastNasabahNumber.length === 1) {
      lastNasabahNumber = "00" + lastNasabahNumber;
    } else if (lastNasabahNumber.length === 2) {
      lastNasabahNumber = "0" + lastNasabahNumber;
    }

    const nomorRekening =
      dateNowYear + dateNowMonth + dateNowDay + lastNasabahNumber;

    res.json(nomorRekening);
  } catch (error) {
    console.log(error);
  }
};

export const getNasabahListing = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const offset = limit * page;
    let search = req.query.search_query || "";
    search = search.replace(/[^\w\s]/gi, "");

    let totalRows = await db.query(
      "SELECT COUNT(*) AS totalRows FROM nasabah nb LEFT JOIN jurusan jr ON jr.id = nb.kode_jurusan WHERE nb.nama_lengkap LIKE :search OR nb.norek LIKE :search",
      {
        type: QueryTypes.SELECT,
        replacements: { search: "%" + search + "%" },
      }
    );

    totalRows = totalRows[0].totalRows;

    const totalPage = Math.ceil(totalRows / limit);

    const result = await db.query(
      "SELECT nb.norek, nb.nama_lengkap, nb.kelas, jr.nama_jurusan FROM nasabah nb LEFT JOIN jurusan jr ON jr.id = nb.kode_jurusan WHERE nb.nama_lengkap LIKE :search OR norek LIKE :search ORDER BY nb.createdAt DESC LIMIT :limit OFFSET :offset ",
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

export const getNasabahById = async (req, res) => {
  try {
    const norek = req.params.norek;

    const result = await db.query(
      "SELECT nb.*, jr.nama_jurusan, jk.jenis_kelamin, tr.username AS pengesah FROM nasabah nb LEFT JOIN jurusan jr ON jr.id = nb.kode_jurusan LEFT JOIN jenis_kelamin jk ON jk.id = nb.kode_jk LEFT JOIN teller tr ON tr.username = nb.pengesah WHERE nb.norek = :norek",
      {
        replacements: { norek: norek },
        type: QueryTypes.SELECT,
      }
    );

    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const getCountNasabah = async (req, res) => {
  try {
    const dateStart = req.body.dateStart;
    const dateEnd = req.body.dateEnd;

    const totalNasabah = await db.query(
      "SELECT COUNT(*) AS total_nasabah FROM nasabah WHERE createdAt >= :dateStart AND createdAt <= :dateEnd",
      {
        type: QueryTypes.SELECT,
        replacements: {
          dateStart: dateStart,
          dateEnd: dateEnd,
        },
      }
    );

    res.json(totalNasabah);
  } catch (error) {
    console.log(error);
  }
};

export const getSaldo = async (req, res) => {
  try {
    let norek = req.body.norek;
    let norekSplit = [];

    norek.map((norek) => {
      let norekNew = "'" + norek + "'";
      norekSplit.push(norekNew);
    });

    norekSplit = norekSplit.toString();

    const nasabah = await db.query(
      `SELECT nb.norek, nb.nama_lengkap, nb.kelas, jr.nama_jurusan, tr.current_saldo AS saldo FROM nasabah nb INNER JOIN transaksi tr ON tr.norek = nb.norek INNER JOIN jurusan jr ON jr.id = nb.kode_jurusan WHERE nb.norek IN (${norekSplit}) GROUP BY nb.norek ORDER BY tr.createdAt DESC`,
      { type: QueryTypes.SELECT }
    );

    res.json(nasabah);
  } catch (error) {
    console.log(error);
  }
};

export const getCountSaldo = async (req, res) => {
  try {
    const dateStart = req.body.dateStart;
    const dateEnd = req.body.dateEnd;

    const totalSaldo = await db.query(
      "SELECT DISTINCT tr.norek, SUM(tr.current_saldo) AS total_saldo FROM transaksi WHERE createdAt >= :dateStart AND createdAt <= :dateEnd ORDER BY createdAt DESC",
      {
        type: QueryTypes.SELECT,
        replacements: {
          dateStart: dateStart,
          dateEnd: dateEnd,
        },
      }
    );

    res.json(totalSaldo);
  } catch (error) {
    console.log(error);
  }
};

export const addWebUser = async (req, res) => {
  try {
    const webuser = await WebUser.create({
      username: req.body.webUserName,
      norek: req.body.noRekening,
    });

    const webuser_usr = await User.create({
      username: req.body.webUserName,
      password: "$2a$12$f.xgCpBG2II/ZjxOG9vC3u3qriPxcPMQPUIvdRJ7kysIqyqBxD3N.",
      isNewUser: "Y",
    });

    res.json({ msg: "success added webuser" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteWebUser = async (req, res) => {
  try {
    const username = req.body.username;

    await db.query("DELETE FROM nsb_webuser WHERE username = :username", {
      type: QueryTypes.DELETE,
      replacements: {
        username: username,
      },
    });

    await db.query(
      "DELETE FROM user WHERE username = :username AND role = 'nasabah'",
      {
        type: QueryTypes.DELETE,
        replacements: {
          username: username,
        },
      }
    );

    res.status(200).json({ msg: "Success delete data" });
  } catch (error) {
    console.log(error);
  }
};

export const resetPasswordWebUser = async (req, res) => {
  try {
    const username = req.body.username;
    const defaultPass =
      "$2a$12$f.xgCpBG2II/ZjxOG9vC3u3qriPxcPMQPUIvdRJ7kysIqyqBxD3N.";

    const resetPass = await db.query(
      "UPDATE user SET password = :defaultPass, isNewUser = 'Y' WHERE username = :username AND role = 'nasabah'",
      {
        type: QueryTypes.UPDATE,
        replacements: {
          username: username,
          defaultPass: defaultPass,
        },
      }
    );

    res.status(200).json({ msg: "Success reset data" });
  } catch (error) {
    console.log(error);
  }
};

export const getWebUserListing = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const offset = limit * page;
    let search = req.query.search_query || "";
    search = search.replace(/[^\w\s]/gi, "");

    let totalRows = await db.query(
      "SELECT COUNT(*) AS totalRows FROM nsb_webuser wu INNER JOIN nasabah nb ON wu.norek = nb.norek WHERE nb.norek LIKE :search OR nb.nama_lengkap LIKE :search OR wu.username LIKE :search",
      {
        type: QueryTypes.SELECT,
        replacements: { search: "%" + search + "%" },
      }
    );

    totalRows = totalRows[0].totalRows;

    const totalPage = Math.ceil(totalRows / limit);

    const result = await db.query(
      "SELECT wu.username, nb.norek, nb.nama_lengkap, nb.kelas, nb.kode_jurusan FROM nasabah nb INNER JOIN nsb_webuser wu ON wu.norek = nb.norek WHERE nb.nama_lengkap LIKE :search OR nb.norek LIKE :search OR wu.username LIKE :search ORDER BY wu.createdAt DESC LIMIT :limit OFFSET :offset ",
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

export const getWebUserById = async (req, res) => {
  try {
    const username = req.query.username;
    const norek = req.query.norek;

    const webuser = await db.query(
      "SELECT wu.username, wu.norek, wu.photo_dir FROM nsb_webuser wu INNER JOIN nasabah nb ON wu.norek = nb.norek WHERE wu.username = :username OR nb.norek = :norek",
      {
        type: QueryTypes.SELECT,
        replacements: {
          username: username,
          norek: norek,
        },
      }
    );

    if (webuser.length === 0)
      return res.status(400).json({ msg: "data not found" });

    res.json(webuser);
  } catch (error) {
    console.log(error);
  }
};

// STAY OUT !! FOR MOBILE USER FITURE
// export const addMobileUser = async (req, res) => {
//   try {
//     const mobileUser = await MobileUser.create({
//       user_id: req.body.userId,
//       norek: req.body.norek,
//       password: req.body.password,
//     });

//     res.status(200).json({ msg: "data sended to server" });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updateMobileUser = async (req, res) => {
//   try {
//     const user_id = req.body.userId;
//     const norek = req.body.norek;
//     const password = req.body.password;

//     const update = await db.query(
//       "UPDATE nsb_mobileuser SET norek = :norek, password = :password WHERE user_id = :userId",
//       {
//         type: QueryTypes.UPDATE,
//         replacements: {
//           norek: norek,
//           password: password,
//           user_id: user_id,
//         },
//       }
//     );

//     res.json({ msg: "Update Success" });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deleteMobileUser = async (req, res) => {
//   try {
//     const userId = req.body.userId;

//     const deleteData = await db.query(
//       "DELETE FROM nsb_mobileuser WHERE user_id = :userId",
//       {
//         type: QueryTypes.DELETE,
//         replacements: {
//           userId: userId,
//         },
//       }
//     );

//     res.json({ msg: "Successfully delete the data" });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getMobileUserId = async (req, res) => {
//   try {
//     let lastNumber = await db.query(
//       "SELECT user_id FROM nsb_mobileuser ORDER BY createdAt DESC",
//       {
//         type: QueryTypes.SELECT,
//       }
//     );

//     lastNumber = lastNumber[0].user_id.toString().slice(3, 7);
//     lastNumber = parseInt(lastNumber) + 1;
//     lastNumber = lastNumber.toString();

//     if (lastNumber.length === 1) {
//       lastNumber = "000" + lastNumber;
//     } else if (lastNumber.length === 2) {
//       lastNumber = "00" + lastNumber;
//     } else if (lastNumber.length === 3) {
//       lastNumber = "0" + lastNumber;
//     } else if (lastNumber.length === 4) {
//       lastNumber = lastNumber;
//     }

//     const mobileUserId = "USR" + lastNumber;

//     res.json(mobileUserId);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getMobileUserById = async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     const result = await db.query(
//       "SELECT user_id, norek, photo_dir FROM nsb_mobileuser WHERE user_id = :userId",
//       {
//         type: QueryTypes.SELECT,
//         replacements: { userId: userId },
//       }
//     );

//     res.json(result);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getMobileUserListing = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 0;
//     const limit = parseInt(req.query.limit) || 10;
//     const offset = limit * page;
//     let search = req.query.search_query || "";
//     search = search.replace(/[^\w\s]/gi, "");

//     let totalRows = await db.query(
//       "SELECT COUNT(*) AS totalRows FROM nsb_mobileuser mu JOIN nasabah nb ON mu.norek = nb.norek WHERE nb.norek LIKE :search OR nb.full_name LIKE :search OR mu.user_id LIKE :search",
//       {
//         type: QueryTypes.SELECT,
//         replacements: { search: "%" + search + "%" },
//       }
//     );

//     totalRows = totalRows[0].totalRows;

//     const totalPage = Math.ceil(totalRows / limit);

//     const result = await db.query(
//       "SELECT mu.user_id, nb.norek, nb.full_name, nb.kelas, nb.jurusan FROM nasabah nb JOIN nsb_mobileuser mu ON mu.norek = nb.norek WHERE nb.full_name LIKE :search OR nb.norek LIKE :search OR mu.user_id LIKE :search ORDER BY mu.user_id ASC LIMIT :limit OFFSET :offset ",
//       {
//         type: QueryTypes.SELECT,
//         replacements: {
//           search: "%" + search + "%",
//           limit: limit,
//           offset: offset,
//         },
//       }
//     );

//     res.json({
//       result: result,
//       page: page,
//       limit: limit,
//       totalRows: totalRows,
//       totalPage: totalPage,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
