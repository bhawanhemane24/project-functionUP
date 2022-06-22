const express = require('express');
const router = express.Router();
const blogController = require("../controllers/blogController")
const authorController = require("../controllers/authorController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/authors", authorController.createAuthor)
router.post("/blogs",blogController.createBlog)
router.get("/blogs",blogController.getBlog)
router.put("/blogs/:blogId",blogController.updateBlog)
router.delete("/blogs/:blogId",blogController.deleteBlog)
router.delete("/blogs?queryParams",blogController.deleteBlogsBySelection)

module.exports = router;