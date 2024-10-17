const post = require("../models/post");
const postService = require("../services/postService");

const createPost = async (req, res) => {
  // 게시글 작성
  try {
    // {"title":"a","content","b","userId":2} = req.body
    const post = await postService.createPost(req.body);
    res.status(201).json({ data: post });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const findPostById = async (req, res) => {
  // 게시글 가져오기
  try {
    const post = await postService.findPostById(req.params.id);
    if (post) {
      res.status(200).json({ data: post });
    } else {
      res.status(404).json({ eror: "Post not found" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const findAllPost = async (req, res) => {
  // 게시글 목록 전체 반환
  try {
    const posts = await postService.findAllPost();
    res.status(200).json({ data: posts });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const updatePost = async (req, res) => {
  // 게시글 수정
  try {
    // postman으로 보낼 때 {"title":"a","content":"b","userId":2} // http://localhost:3000/posts/1
    const post = await postService.updatePost(req.params.id, req.body);
    if (post) {
      res.status(200).json({ data: posts });
    } else {
      res.status(404).json({ data: "Post not found" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
const deletePost = async (req, res) => {
  try {
    const result = await postService.deletePost(req.params.id);
    if (result) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  createPost,
  findPostById,
  findAllPost,
  updatePost,
  deletePost,
};
