const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const email = require('../mails/mailer');
const mail_text = require('../mails/mail_text');
const {token} = require("morgan");

router.post("/register", async (req, res) => {
  try {
    const saltRounds = 10;

    const passwordSalt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(req.body.password, passwordSalt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // Sending email only if variables exists
    if (process.env.MAIL_ADRESS && process.env.MAIL_SERVER) {
      const mail_option = {
        from: process.env.MAIL_ADRESS,
        to: req.body.email,
        subject: "Confirmation d'inscription",
        html: mail_text.confirmation_subscription(req.body.username)
      }
      email.sendMail(mail_option, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log(info);
        }
      })
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/login", async (req, res) => {
  try {
    let user = {};
    if (req.body.username) {
      user = await User.findOne({ username: req.body.username });
    } else if (req.body.email) {
      user = await User.findOne({ email: req.body.email });
    } else {
      return res.status(404).json("utilisateur non trouvé");
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      return res.status(403).json("mauvais mot de passe")
    }

    console.log(user);
    res.status(200).json({
      username: user.username,
      token: jwt.sign({userId: user._id, isAdmin: user.isAdmin}, process.env.TOKEN_CHARACTER, {expiresIn: '1h'})
    })
  }
  catch (err) {
    res.status(500).json(err)
    console.error(err)
  }
});

router.post('/resetpassword', async (req, res, next) => {
  // Send a email with the link to reset password
  try {
    const user = await User.findOne({email: req.body.email});
    !email && res.status(404).json("utilisateur non trouvé");
    const mail_token = jwt.sign({userId: user._id}, process.env.TOKEN_CHARACTER, {expiresIn: '1h'});
    const mail_option = {
      to: req.body.email,
      from: process.env.MAIL_ADRESS,
      subject: "Réinitialisation de votre mot de passe",
      html: mail_text.forgot_password(user.username, mail_token)
    }
    email.sendMail(mail_option, (error, info) => {
      if (error) {
        console.error(error)
        res.status(501).json("Unable to send mail");
      } else {
        console.log(info);
      }
      res.status(200).json("Mail sending");
    })
  } catch (eror) {
    console.error(eror);
    res.status(501).json(eror);
  }
})

module.exports = router;