const express = require("express");
const commentsRouter = require("./routers/comments");
const app = express();

app.use("/api/comments", commentsRouter);

module.exports = app;
