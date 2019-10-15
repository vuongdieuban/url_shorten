const express = require("express");
const app = express();

// setup all the nesscessary startup here such as db connection, routes,..
require("./startup/config")();
require("./startup/db")();
require("./startup/routes")(app);

// Listen on Port
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Listen on port ${port}`));
