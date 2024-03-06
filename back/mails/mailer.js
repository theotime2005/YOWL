const mailer = require('nodemailer');

const email = mailer.createTransport({
    host: process.env.MAIL_SERVER,
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_ADRESS,
        pass: process.env.MAIL_PASSWORD
    }
})

module.exports = email