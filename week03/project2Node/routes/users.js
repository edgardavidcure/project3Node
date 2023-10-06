const express = require("express");
const router = express.Router();
const { userValidation, validate } = require("../validation");

const usersController = require("../controllers/users");

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getSingleUser);
router.put("/:id", userValidation, validate, usersController.updateSingleUser);
router.post("/", userValidation, validate, usersController.addUser);
router.delete("/:id", usersController.deleteSingleUser);
router.delete("/", usersController.deleteAllUsers);

module.exports = router;
