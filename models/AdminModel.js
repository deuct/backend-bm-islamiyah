import Sequelize from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Admin = db.define(
  "admin",
  {
    username: {
      type: DataTypes.STRING,
    },
    nama_lengkap: {
      type: DataTypes.STRING,
    },
    photo_dir: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Admin;

(async () => {
  await db.sync();
})();
