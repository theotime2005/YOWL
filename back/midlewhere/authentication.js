const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const req_token = req.headers.authorization.split(" ")[1];
        const decoded_token = jwt.verify(req_token, process.env.TOKEN_CHARACTER);
        req.auth={
            userId: decoded_token.userId,
            isAdmin: decoded_token.isAdmin
        }
        next();
    } catch (error) {
        res.status(403).json({error: error});
    }
}