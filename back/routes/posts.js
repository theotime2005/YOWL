const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");




router.post("/", async (req, res) => {
  const bodyContent = req.auth.userId+req.body
  const newPost = new Post(bodyContent);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.auth.userId) {
      const bodyContent = req.auth.userId+req.body;
      await post.updateOne({ $set: bodyContent });
      res.status(200).json("le post a été modifié");
    } else {
      res.status(403).json("vous pouvez modifier seulement vôtre post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.auth.userId) {
      await post.deleteOne();
      res.status(200).json("le post a été supprimé");
    } else {
      res.status(403).json("vous pouvez supprimer seulement votre post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.auth.userId)) {
      await post.updateOne({ $push: { likes: req.auth.userId } });
      res.status(200).json("Le post a été liké");
    } else {
      await post.updateOne({ $pull: { likes: req.auth.userId } });
      res.status(200).json("Le post a été disliké");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/timeline/all", async (req, res) => {
  try {
    const currentUser = await User.findById(req.auth.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts))
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

