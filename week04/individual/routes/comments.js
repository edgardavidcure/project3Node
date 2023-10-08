const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Comment = require("../models/Comment");

//@desc Show add page
router.get("/add", ensureAuth, (req, res) => {
  res.render("comments/add");
});

// process add form
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Comment.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

//@desc Show all comments
router.get("/", ensureAuth, async (req, res) => {
  try {
    const comments = await Comment.find({ user: req.user.id })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();
    res.render("comments/index", {
      comments,
    });
  } catch (error) {
    console.log(error);
    res.render("error/500");
  }
});

//@desc Show edit page
router.get("/edit/:id", ensureAuth, async (req, res) => {
  const comment = await Comment.findOne({
    _id: req.params.id,
  }).lean();

  if (!comment) {
    return res.render("error/404");
  }
  if (comment.user != req.user.id) {
    res.redirect("/comments");
  } else {
    res.render("comments/edit", {
      comment,
    });
  }
});

//@desc Update comment
router.put("/:id", ensureAuth, async (req, res) => {
  // let comment = await Comment.findById(req.)
});

module.exports = router;
