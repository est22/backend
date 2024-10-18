const express = require("express");
const postController = require("../controllers/postController");
const { authenticateToken } = require("../middleware/auth_middleware");

const router = express.Router();

// default: /posts -> app.js 에서 따로 설정해줄 것이다
router.post("/", authenticateToken, postController.createPost); //
// router.post("/", postController.createPost); // = POST /posts
router.get("/", postController.findAllPost); // = GET /posts
router.get("/:id", postController.findPostById); // = GET /posts/1
router.put("/:id", postController.updatePost); // = PUT /posts/1
router.delete("/:id", postController.deletePost); // = DELETE /posts/1

module.exports = router;
