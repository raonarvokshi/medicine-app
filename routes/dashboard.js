import express from "express";
import { authenticateToken } from "../middlewares.js";
import db from "../db.js";

const router = express.Router();


router.get("/dashboard", authenticateToken, async (req, res) => {
    try {
        const patientResult = await db.query("SELECT COUNT(*) FROM patients");
        const doctorResult = await db.query("SELECT COUNT(*) FROM doctors");
        const refResult = await db.query("SELECT COUNT(*) FROM referrers");

        const patientCount = patientResult.rows[0].count;
        const doctorCount = doctorResult.rows[0].count;
        const refCount = refResult.rows[0].count;

        res.render("dashboard.ejs", {
            user: req.user,
            patientCount,
            doctorCount,
            refCount,
            doctorsPage: false,
            patientsPage: false,
            refPage: false,
            locationPage: false,
            appointmentsPage: false,
            doctorsSchedulePage: false,
            activeMenu: null
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Gabim gjatë marrjes së të dhënave për dashboard");
    }
});

export default router;