const express = require("express");
const connectDB = require("./config/database");
const UserModel = require("./models/user");
const app = express();

app.use(express.json());

// SignUp
app.post("/signup", async (req, res) => {
  // Creating new instance of the UserModel.

  try {
    const user = new UserModel(req.body);
    await user.save();
    res.send("User Added!");
  } catch (err) {
    res.status(400).send("Error occured when saving data: " + err.message);
  }
});

// Get user by email ID
app.get("/user", async (req, res) => {
  try {
    const users = await UserModel.find({ firstName: req.body.firstName });
    if (users.length === 0) {
      res.status(404).send("User not found!");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something Went Wrong...");
  }
});

// Get all users
app.get("/feed", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something Went Wrong...");
  }
});

// Delete a user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await UserModel.findByIdAndDelete(userId);
    console.log(user);
    if (!user) {
      res.status(404).send("User not found..!");
    } else {
      res.send("User Deleted!");
    }
  } catch (err) {
    res.status(400).send("Something Went Wrong...");
  }
});

// Update data of a User
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await UserModel.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("User Updated!");
  } catch (err) {
    res.status(400).send("Something Went Wrong..." + err.message);
  }
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
