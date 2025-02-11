const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access Denied! No Token Provided." });
    }

    try {
        const tokenParts = token.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            return res.status(401).json({ message: "Invalid Token Format!" });
        }

        const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
        console.log("✅ Decoded User:", decoded);

        req.user = decoded.user; // ✅ FIX: Setting correct user ID
        next();
    } catch (error) {
        console.error("❌ Token Verification Failed:", error.message);
        return res.status(401).json({ message: "Invalid Token!" });
    }
};

module.exports = authMiddleware;
