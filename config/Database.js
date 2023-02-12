import { Sequelize } from "sequelize";

const db = new Sequelize("dbbm_smkislamiyah", "root", "Root123!", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
