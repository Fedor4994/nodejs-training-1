const express = require("express");
const contactsRouter = require("./contacts");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 8080;

app.use("/api", contactsRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error at server launch`, err);
  } else {
    console.log(`Server work at port ${PORT}`);
  }
});
