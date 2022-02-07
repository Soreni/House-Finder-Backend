const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const config = require("./src/config/key");

//DB Config
const db = config.MongoURI;
//Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log("MongoDb Connected ..."))
  .catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//api routes
app.use("/api/housefinder/users", require("./src/routes/users"));
app.use("/api/housefinder/houses", require("./src/routes/houses"));
app.use("/api/housefinder/users/login", require("./src/routes/login"));
app.use("/api/housefinder/feedbacks", require("./src/routes/feedbacks"));

app.listen(config.PORT, () =>
  console.log(`Listening on port ${config.PORT}...`)
);
