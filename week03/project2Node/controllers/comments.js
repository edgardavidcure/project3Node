const db = require("../models");
const Comment = db.comments;

const addComment = (req, res) => {
  //#swagger.tags=['Comments']

  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const { product_id, content, createdAt, rate, user } = req.body;
  const comment = new Comment({
    product_id,
    content,
    createdAt,
    rate,
    user,
  });
  comment
    .save(comment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comment.",
      });
    });
};

const getAllComments = (req, res) => {
  //#swagger.tags=['Comments']

  Comment.find(
    {},
    {
      productId: 1,
      content: 1,
      createdAt: 1,
      rate: 1,
      user: 1,
    }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Comments.",
      });
    });
};

const getSingleComment = (req, res) => {
  //#swagger.tags=['Comments']

  const userId = req.params.id;
  Comment.find({ _id: userId })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Comment with id " + userId });
      else res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Comment with _id=" + userId,
      });
    });
};

const updateSingleComment = (req, res) => {
  //#swagger.tags=['Comments']

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const comment = {
    productId: req.body.productId,
    content: req.body.content,
    createdAt: req.body.createdAt,
    rate: req.body.rate,
    user: req.body.user,
  };
  const userId = req.params.id;

  Comment.replaceOne({ _id: userId }, comment)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Comment with id=${userId}. Maybe Comment was not found!`,
        });
      } else res.send({ message: "Comment was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Comment with id=" + userId,
      });
    });
};

const deleteSingleComment = (req, res) => {
  //#swagger.tags=['Comments']

  const userId = req.params.id;

  Comment.findByIdAndRemove(userId)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`,
        });
      } else {
        res.send({
          message: "Comment was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Comment with id=" + id,
      });
    });
};

const deleteAllComments = (req, res) => {
  //#swagger.tags=['Comments']

  Comment.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Comments were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Comments.",
      });
    });
};

module.exports = {
  getAllComments,
  getSingleComment,
  updateSingleComment,
  deleteAllComments,
  deleteSingleComment,
  addComment,
};
