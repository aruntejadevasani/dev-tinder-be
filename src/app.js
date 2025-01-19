const express = require("express");
const connectDB = require("./config/database");

const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const requestRouter = require("./routes/request");
const profileRouter = require("./routes/profile");

app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);

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
