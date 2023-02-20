const jwt = require("jsonwebtoken");

const auth_MW = (req, res, next) => {
    try {
        const token = req.header('x-auth-token');

        if (!token) return res.status(401).send({error: "Access denied. No token provided"});
        
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;

        next();
    } catch (error) {
        res.status(400).send({error: "Authentication failed"});
    }
}

module.exports = auth_MW;