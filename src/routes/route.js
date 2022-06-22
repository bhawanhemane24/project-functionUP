const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")


<<<<<<< HEAD

 router.post('/authors', authorController.createAuthor)
 router.post('/blogs', blogController.createBlog)
 router.get('/blogs', blogController.getblog)
 router.put("/blogs/:blogId",blogController.updateBlog)
=======
router.post("/authors", authorController.createAuthor)
router.post("/blogs",blogController.createBlog)
router.get("/blogs",blogController.getBlog)
router.put("/blogs/:blogId",blogController.updateBlog)
router.delete("/blogs/:blogId",blogController.deleteBlog)
router.delete("/blogs?queryParams",blogController.deleteBlogsBySelection)
>>>>>>> e7b6856e59f746c9eb052ef0e826af5aea445c93

module.exports = router;