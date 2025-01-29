const express = require("express");
const connectDB = require("./config/database");

const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const requestRouter = require("./routes/request");
const profileRouter = require("./routes/profile");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);
app.use("/", userRouter);

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
