const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.put("/", async (req, res) => {
  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  try {
    const user = await User.findByIdAndUpdate(req.auth.userId, {
      $set: req.body,
    });
    res.status(200).json("Le compte a été modifié");
  } catch (err) {
    return res.status(500).json(err);
  }
});


router.delete("/:id", async (req, res) => {
  if (req.auth.userId === req.params.id || req.auth.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Le compte a été supprimé");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("Vous pouvez supprimer seulement votre compte");
  }
});


router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { username, email, password, isAdmin, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.put("//follow", async (req, res) => {
  if (req.auth.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.auth.userId);
      if (!user.followers.includes(req.auth.userId)) {
        await user.updateOne({ $push: { followers: req.auth.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("Vous avez suivi l'utilisateur");
      } else {
        res.status(403).json("vous suivez deja cet utilisateur");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json(".");
  }
});


router.put("/:id/unfollow", async (req, res) => {
    if (req.auth.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.auth.userId);
        if (user.followers.includes(req.auth.userId)) {
          await user.updateOne({ $pull: { followers: req.auth.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("Vous avez unfollow cet utlisateur");
        } else {
          res.status(403).json("Vous ne suivez pas cet utilisateur");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json(".");
    }
  });

module.exports = router;
  


