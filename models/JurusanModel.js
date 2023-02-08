import Sequelize from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Jurusan = db.define(
  "jurusan",
  {
    nama_jurusan: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Jurusan;

(async () => {
  await db.sync();
})();
