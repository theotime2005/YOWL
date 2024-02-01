const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // Check the autencity of token
    try {
        const req_token = req.headers.authorization.split(" ")[1];
        const decoded_token = jwt.verify(req_token, process.env.TOKEN_CHARACTERS);
        const user_id = decoded_token.user_id;
        req.body+={
            user_id: user_id
        }
        next();
    } catch (error) {
        res.status(403).json({error: error});
    }
}