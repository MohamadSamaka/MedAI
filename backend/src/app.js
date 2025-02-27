const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const appRouter = require("./routes");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware")

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(appRouter);
app.use(errorHandlerMiddleware)

module.exports = app;
