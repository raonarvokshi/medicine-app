import express from "express";
import { authenticateToken } from "../middlewares.js";
import db from "../db.js";

const router = express.Router();

router.get("/add/doctor", authenticateToken, (req, res) => {
    res.render("doctors/addDoctor.ejs", { user: req.user });
});

router.post("/add/doctor", authenticateToken, async (req, res) => {
    const { fullName, department, phoneNumber, email } = req.body;

    if (fullName == "" || department == "" || phoneNumber == "" || email == "") {
        return res.render("doctors/addDoctor.ejs", { user: req.user, error: "Ploteso te gjitha fushat" });
    }

    try {
        await db.query("INSERT INTO doctors (full_name, department, tel, email) VALUES($1, $2, $3, $4)",
            [fullName, department, phoneNumber, email]
        );
        res.render("doctors/addDoctor.ejs", { user: req.user, success: "Doktori u shtua me sukses!" });
    } catch (err) {
        res.status(500).send("Internal Server Error");
        console.log(err);
    }
});

router.get("/view/doctors", authenticateToken, async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM doctors ORDER BY id DESC");
        res.render("doctors/viewDoctors.ejs", {
            user: req.user,
            doctors: result.rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

export default router;