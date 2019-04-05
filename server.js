const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const restricted = require("./middleware/restricted");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const adminRouter = require("./routes/admin");
const studentsRouter = require("./routes/students");

const cloudParser = require('./config/cloudinary');

const server = express();

//Middleware
const middleware = [express.json(), helmet(), cors()];
server.use(middleware);

//Routes Middleware
server.use("/api/auth/login", loginRouter);
server.use("/api/auth/register", registerRouter);
server.use("/api/admin", restricted, adminRouter);
server.use("/api/students", restricted, studentsRouter);

const db = require('./data/config');
server.post('/api/images', cloudParser.single("image"), (req, res) => {
  console.log(req.file) // to see what is returned to you
  const image = {};
  image.url = req.file.url;
  image.id = req.file.public_id;
  db('images').insert(image) // save image information in database
    .then(newImage => res.json(newImage))
    .catch(err => console.log(err));
});

module.exports = server;
