const express = require("express");
const connectDB = require("./config/database");
const UserModel = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
const app = express();

app.use(express.json());
app.use(cookieParser());

// SignUp
app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, (req, res) => {
  console.log("Sending connection request!");

  res.send("Connection request sent!");
});

connectDB()
  .then(() => {
    console.log("DB Connection Succesfull...");
    app.listen(3000, () => {
      console.log("Server listening to port 3000...");
    });
  })
  .catch(() => {
    console.log("DB Connection Error!");
  });
