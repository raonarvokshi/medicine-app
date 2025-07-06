import express from "express";
import db from "../db.js";
import { authenticateToken } from "../middlewares.js";

const router = express.Router();

router.get("/add/patient", authenticateToken, (req, res) => {
    res.render("patients/addPatient.ejs", { user: req.user });
});

export default router;