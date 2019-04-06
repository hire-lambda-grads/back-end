const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const restricted = require("./middleware/restricted");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const adminRouter = require("./routes/admin");
const studentsRouter = require("./routes/students");

const server = express();

//Middleware
const middleware = [express.json(), helmet(), cors()];
server.use(middleware);

//Routes Middleware
server.use("/api/auth/login", loginRouter);
server.use("/api/auth/register", registerRouter);
server.use("/api/admin", restricted, adminRouter);
server.use("/api/students", restricted, studentsRouter);

server.get("/", (req, res) => {
  req.send("Welcome, please refer to the GitHub Docs to get started.");
});

module.exports = server;
