import Sequelize from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Transaksi = db.define(
  "transaksi",
  {
    id_transaksi: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    teller: {
      type: DataTypes.STRING,
    },
    norek: {
      type: DataTypes.STRING,
    },
    tgl_transaksi: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.TEXT,
    },
    jumlah: {
      type: DataTypes.INTEGER,
    },
    current_saldo: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Transaksi;

(async () => {
  await db.sync();
})();
