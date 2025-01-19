const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    //Validation of data
    validateSignUpData(req);

    //Encrypt the password
    const passHash = await bcrypt.hash(password, 10);

    // Creating new instance of the UserModel.
    const user = new UserModel({
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: passHash,
    });

    await user.save();
    res.send("User Added!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Credentials!");
    }
    let user = await UserModel.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials!");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // Create a JWT Token
      const token = await user.getJWT();
      // Add Token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), // Cookies will be expired in 8 hours
      });
      res.send("Login Success!");
    } else {
      throw new Error("Invalid Credentials!");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = authRouter;
