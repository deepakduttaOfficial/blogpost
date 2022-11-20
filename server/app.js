require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require("cors");

//Rourter
const authRouters = require("./routes/auth");
const userRouters = require("./routes/user");
const postRouters = require("./routes/post");

//DATABSE CONNECT
const DB = process.env.DB_URL;
mongoose.connect(DB, (err) => {
  if (!err) {
    console.log("DB CONNECT");
  } else {
    console.log(err);
  }
});

//MIDDLE WARE
app.use(express.json());
app.use(cors());

//MY ROUTER
app.use("/api", authRouters);
app.use("/api", userRouters);
app.use("/api", postRouters);

//PORT
const port = process.env.PORT || 8000;
//SERVER
app.listen(port, () => {
  console.log(`SERVER START ON PORT ${port}`);
});
