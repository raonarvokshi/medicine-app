import express from "express"
import db from "../db.js";
import { authenticateToken, authenticatedUsers } from "../middlewares.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import JWT_SECRET from "../index.js";

const router = express.Router();
let errorMsg;

router.get("/login", authenticatedUsers, (req, res) => {
    res.render("authentication/login.ejs");
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const storedPwd = user.password;

            bcrypt.compare(password, storedPwd, async (err, match) => {
                if (err) {
                    console.error(err);
                    return res.render("authentication/login.ejs", { error: "Error while logging in! something is wrong please try again later." })
                }

                if (match) {
                    const token = jwt.sign(
                        { id: user.id, email: user.email, username: user.username },
                        JWT_SECRET,
                        { expiresIn: "2h" }
                    );

                    res.cookie("token", token, {
                        httpOnly: true,
                        maxAge: 2 * 60 * 60 * 1000
                    });

                    res.redirect("/");
                } else {
                    res.render("authentication/login.ejs", { error: "Password Incorrect" });
                }
            });
        } else {
            res.render("authentication/login.ejs", { error: "Email Incorrect! Account not found." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/register", authenticatedUsers, (req, res) => {
    res.render("authentication/register.ejs");
});

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (result.rows.length > 0) {
            errorMsg = "Email already exists!"
            return res.render("authentication/register.ejs", { error: errorMsg })
        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    console.error(`Error while hashing pwd: ${err}`);
                    errorMsg = "Error while registering! something is wrong please try again later."
                    return res.render("auth/register.ejs", { error: errorMsg });
                }

                const insertResult = await db.query("INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *",
                    [username, email, hash]
                );

                const user = insertResult.rows[0];

                const token = jwt.sign(
                    { id: user.id, email: user.email, username: user.username },
                    JWT_SECRET,
                    { expiresIn: "2h" }
                );

                res.cookie("token", token, {
                    httpOnly: true,
                    maxAge: 2 * 60 * 60 * 1000
                });

                res.redirect("/");
            });
        }
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

router.get("/logout", (req, res) => {
    try {
        res.clearCookie("token");
        res.redirect("/login");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

export default router;