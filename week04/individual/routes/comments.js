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

//@desc Show single comment
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id).populate("user").lean();
    if (!comment) {
      return res.render("error/404");
    }
    if (comment.user._id != req.user.id) {
      res.redirect("/comments");
    } else {
      res.render("comments/show", { comment });
    }
  } catch (error) {
    console.error(error);
    res.render("error/404");
  }
});

//@desc Show edit page
router.get("/edit/:id", ensureAuth, async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    res.redirect("error/500");
  }
});

//@desc Update comment
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id).lean();

    if (!comment) {
      return res.render("error/404");
    }
    if (comment.user != req.user.id) {
      res.redirect("/comments");
    } else {
      comment = await Comment.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.redirect("/dashboard");
    }
  } catch (error) {
    console.error(error);
    res.redirect("error/500");
  }
});

//@desc Delete comments
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    await Comment.deleteOne({ _id: req.params.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    return res.render("error/500");
  }
});

module.exports = router;
