const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 3322;
const app = express();
const url = "mongodb://localhost:weLove";
const url_local = "mongodb://localhost:studentAPI";
const url_online =
  "mongodb+srv://AuthClass:AuthClass@codelab.u4drr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const path = require("./user/router");

mongoose
  .connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");
  });

app.use(cors());
app.use(express.json());

app.use("/", path);

app.listen(port, () => {
  console.log("server is Up on port: 3322 ");
});
