const express = require("express");
const cors = require("cors");
const db = require("./models");
const app = express();

const port = process.env.PORT || 3000;

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use((req, res, next) => {
    res.setHeader("Access-control-Allow-origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, x-requested-With, Content-Type, Accept, Z-key"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
  })
  .use("/", require("./routes"));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to the database");
  })
  .catch((err) => {
    console.log("cannot connect to the database", err);
    process.exit();
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
