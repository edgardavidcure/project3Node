const routes = require("express").Router();
const comments = require("./comments");
const users = require("./users");
routes.use("/", require("./swagger"));
routes.use("/comments", comments);
routes.use("/users", users);

routes.get("/", (req, res) => {
  let docData = "Hello World";
  res.send(docData);
});

module.exports = routes;
