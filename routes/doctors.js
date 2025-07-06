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

router.post("/edit/doctor", authenticateToken, async (req, res) => {
    const { id, fullName, department, tel, email } = req.body;

    try {
        await db.query(
            "UPDATE doctors SET full_name=$1, department=$2, tel=$3, email=$4, updated_at=NOW() WHERE id=$5",
            [fullName, department, tel, email, id]
        );
        res.redirect("/view/doctors");
    } catch (err) {
        console.error(err);
        res.status(500).send("Gabim gjatë përditësimit");
    }
});

router.post("/delete/doctor", authenticateToken, async (req, res) => {
    const { id } = req.body;

    try {
        await db.query("DELETE FROM doctors WHERE id = $1", [id]);
        res.redirect("/view/doctors");
    } catch (err) {
        console.error(err);
        res.status(500).send("Gabim gjatë fshirjes");
    }
});



export default router;