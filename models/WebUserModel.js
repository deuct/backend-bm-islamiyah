import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const WebUser = db.define(
  "nsb_webuser",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    norek: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    photo_dir: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isNewUser: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true }
);

export default WebUser;

(async () => {
  await db.sync();
})();
