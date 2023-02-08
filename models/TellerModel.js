import Sequelize from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Teller = db.define(
  "teller",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    nuptk: {
      type: DataTypes.STRING,
    },
    isNewUser: {
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

export default Teller;

(async () => {
  await db.sync();
})();
