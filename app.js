const express = require("express");
const commentsRouter = require("./routers/comments");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/comments", commentsRouter);

module.exports = app;
