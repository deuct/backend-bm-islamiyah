import multer from "multer";
import db from "../config/Database.js";
import { QueryTypes } from "sequelize";

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/\s+/g, ""));
  },
});

export const imageUpload = multer({ storage: imageStorage });

export const changeCompanyLogo = async (req, res) => {
  try {
    const idImage = 1;
    const images = req.files;

    let imagePath = req.files[0].path;
    imagePath = imagePath.replace(/\\/g, "/");

    const imageName = req.files[0].filename;

    let insertImage = await db.query(
      "UPDATE st_logo SET name = :imageName, path = :imagePath WHERE id = :idImage",
      {
        type: QueryTypes.UPDATE,
        replacements: {
          imageName: imageName,
          imagePath: imagePath,
          idImage: idImage,
        },
      }
    );

    console.log(images);

    res.json({ msg: "success" });
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyLogo = async (req, res) => {
  try {
    const idImage = 1;

    const companyLogo = await db.query(
      "SELECT id, name, path FROM st_logo WHERE id = :idImage",
      {
        type: QueryTypes.SELECT,
        replacements: {
          idImage: idImage,
        },
      }
    );

    res.json(companyLogo);
  } catch (error) {
    console.log(error);
  }
};

export const systemOverview = async (req, res) => {
  try {
    const totalTeller = await db.query("SELECT COUNT(*) FROM teller", {
      type: QueryTypes.SELECT,
    });
    const totalWebuser = await db.query("SELECT COUNT(*) FROM nasabah", {
      type: QueryTypes.SELECT,
    });
    const totalNasabah = await db.query("SELECT COUNT(*) FROM nsb_webuser", {
      type: QueryTypes.SELECT,
    });

    res.status(200).json({
      totalTeller: totalTeller,
      totalWebuser: totalWebuser,
      totalNasabah: totalNasabah,
    });
  } catch (error) {
    console.log(error);
  }
};
