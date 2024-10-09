const express = require("express");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const mainRouter = require("./routes/index");

const app = express();

app.use("api/v1", mainRouter);
app.listen(3000);