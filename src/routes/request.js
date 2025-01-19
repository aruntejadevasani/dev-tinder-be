const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
  console.log("Sending connection request!");

  res.send("Connection request sent!");
});

module.exports = requestRouter;
