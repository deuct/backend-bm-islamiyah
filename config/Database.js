import { Sequelize } from "sequelize";

const db = new Sequelize("dbbm_smkislamiyah", "root", "Root123!", {
  host: "127.0.0.1",
  dialect: "mysql",
});

export default db;
