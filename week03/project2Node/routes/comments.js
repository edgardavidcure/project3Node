const express = require("express");
const router = express.Router();
const { commentValidation, validate } = require("../validation");
const commentsController = require("../controllers/comments");

router.get("/", commentsController.getAllComments);
router.get("/:id", commentsController.getSingleComment);
router.put(
  "/:id",
  commentValidation,
  validate,
  commentsController.updateSingleComment
);
router.post("/", commentValidation, validate, commentsController.addComment);
router.delete("/:id", commentsController.deleteSingleComment);
router.delete("/", commentsController.deleteAllComments);

module.exports = router;
