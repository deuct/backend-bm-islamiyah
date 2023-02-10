export const testing = async (req, res) => {
  try {
    res.json("Welcome,");
  } catch (error) {
    console.log("error");
  }
};
