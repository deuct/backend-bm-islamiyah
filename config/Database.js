import { Sequelize } from "sequelize";

const db = new Sequelize("dbbm_smkislamiyah", "root", "Root123!", {
  host: "localhost",
>>>>>>> deee495 (production update 12 feb 2023)
  dialect: "mysql",
});

export default db;
