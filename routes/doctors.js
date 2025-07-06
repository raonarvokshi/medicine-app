import express from "express";
import { authenticateToken } from "../middlewares.js";

const router = express.Router();

router.get("/add/doctor", authenticateToken, (req, res) => {
    res.render("doctors/addDoctor.ejs", { user: req.user });
});

export default router;