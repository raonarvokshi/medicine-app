import jwt from "jsonwebtoken";
import SECRET_KEY from "./index.js";

function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/login");
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.redirect("/login");
        }

        req.user = user;
        next();
    });
};

function verifyToken(req, res, next) {
    const token = req.cookies.token;
    jwt.verify(token, SECRET_KEY, (err, user) => {
        req.user = user;
        next();
    });
};

function authenticatedUsers(req, res, next) {
    const token = req.cookies.token;
    if (token) {
        try {
            return res.redirect("/");
        } catch (err) {
            res.status(500).send("Internal Server Error");
            console.error(err);
        }
    }
    next();
}

export { authenticateToken, verifyToken, authenticatedUsers };