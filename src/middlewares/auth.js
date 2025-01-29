const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please login!");
    }

    const decodedObj = await jwt.verify(token, "DEV@tinder@123");

    const { _id } = decodedObj;

    const user = await UserModel.findById(_id);
    if (!user) {
      throw new Error("User not found!");
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

module.exports = { userAuth };
