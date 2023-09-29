const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

router.get("/users", usersController.getAllUsers);
router.get("/users/:id", usersController.getSingleUser);
router.put("/users/:id", usersController.updateSingleUser);
router.post("/users", usersController.addUser);
router.delete("/users/:id", usersController.deleteSingleUser);
router.delete("/users", usersController.deleteAllUsers);

module.exports = router;
