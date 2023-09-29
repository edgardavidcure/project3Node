const express = require("express");
const router = express.Router();

const commentsController = require("../controllers/comments");

router.get("/comments", commentsController.getAllComments);
router.get("/comments/:id", commentsController.getSingleComment);
router.put("/comments/:id", commentsController.updateSingleComment);
router.post("/comments", commentsController.addComment);
router.delete("/comments/:id", commentsController.deleteSingleComment);
router.delete("/comments", commentsController.deleteAllComments);

module.exports = router;
