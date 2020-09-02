const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const middleware = require("./middleware");
const logs = require("./api/logs");

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

app.use("/api/logs", logs);
app.use(middleware.notFound);
app.use(middleware.errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listning at http://localhost:${port}`));
