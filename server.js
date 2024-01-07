const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const path = require("path");


const exphbs = require("express-handlebars");
const hbs = exphbs.create({
  // Other configuration...
  runtimeOptions: {
      allowProtoPropertiesByDefault: true
  }
});

app.engine("handlebars", hbs.engine);
// app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");


require(path.join(__dirname, "/database/dbconnect.js"));

app.use("/", require(path.join(__dirname, "/routes/routes.js")));

// app.use("/api/", require(path.join(__dirname, "/routes/api/routes.js")));

const server = app.listen(process.env.port, () => {
  console.log(
    `Node Express Server Started, Example app listening on port ${process.env.port}`
  );
});
