import Sequelize from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Nasabah = db.define(
  "nasabah",
  {
    norek: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    pengesah: {
      type: DataTypes.STRING,
    },
    nama_lengkap: {
      type: DataTypes.STRING,
    },
    kelas: {
      type: DataTypes.STRING,
    },
    kode_jurusan: {
      type: DataTypes.STRING,
    },
    NIS: {
      type: DataTypes.INTEGER,
    },
    kode_jk: {
      type: DataTypes.STRING,
    },
    tgl_lahir: {
      type: DataTypes.DATE,
    },
    alamat: {
      type: DataTypes.TEXT,
    },
    notelp: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
    },
    tgl_daftar: {
      type: DataTypes.DATE,
    },
    ayah: {
      type: DataTypes.STRING,
    },
    ibu: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Nasabah;

(async () => {
  await db.sync();
})();
