const db = require("../models");
const User = db.users;

const addUser = async (req, res) => {
  //#swagger.tags=['Users']

  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const { oauthId, displayName, email, username } = req.body;

  // Check if the username is already taken
  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    // Create a new user document
    const newUser = new User({
      oauthId,
      displayName,
      email,
      username,
      oauthProvider: "custom", // Assuming custom registration
    });

    // Save the user document to the database
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUsers = (req, res) => {
  //#swagger.tags=['Users']

  User.find(
    {},
    {
      oauthId: 1,
      displayName: 1,
      email: 1,
      username: 1,
      oauthProvider: 1,
    }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

const getSingleUser = (req, res) => {
  //#swagger.tags=['Users']

  const userId = req.params.id;
  User.find({ _id: userId })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + userId });
      else res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with _id=" + userId,
      });
    });
};

const updateSingleUser = (req, res) => {
  //#swagger.tags=['Users']
  const { oauthId, displayName, email, username, oauthProvider } = req.body;

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const user = {
    oauthId,
    displayName,
    email,
    username,
    oauthProvider,
  };
  const userId = req.params.id;

  User.replaceOne({ _id: userId }, user)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${userId}. Maybe User was not found!`,
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + userId,
      });
    });
};

const deleteSingleUser = (req, res) => {
  //#swagger.tags=['Users']

  const userId = req.params.id;

  User.findByIdAndRemove(userId)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

const deleteAllUsers = (req, res) => {
  //#swagger.tags=['Users']

  User.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Users.",
      });
    });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteAllUsers,
  deleteSingleUser,
  addUser,
};
