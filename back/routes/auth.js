const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const email = require('../mails/mailer');
const mail_text = require('../mails/mail_text');


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
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(404).json("utilisateur non trouvé");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("mauvais mot de passe")

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;