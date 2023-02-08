import { Sequelize } from "sequelize";

const db = new Sequelize("dbbm_smkislamiyah", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
