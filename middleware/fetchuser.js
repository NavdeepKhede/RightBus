const jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const authHeader = req.header('authorization');
     // Check if the authorization header starts with 'Bearer '
     if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Invalid token format" });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        console.log(token)
        const data = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}

module.exports = fetchuser;