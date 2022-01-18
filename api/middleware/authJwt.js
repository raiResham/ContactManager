const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Ivalid Token!"
            });
        }
        req.userId = decoded.id
        req.email = decoded.email
        next();
    });
};

module.exports = {
    verifyToken
}