var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var ProductRouter = require("./routes/api/products");
var app = express();
const MONGO_PASSWORD = require("./secrets/mongopassword");
require("dotenv").config();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/products", ProductRouter);

var config = require("config");

mongoose
  .connect(
    // config.get("db"),
    //"mongodb://localhost/products",
    process.env.Connection_String,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then(() => console.log("CONNECTED TO DATABASE"))
  .catch((error) => console.log(error.message));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
