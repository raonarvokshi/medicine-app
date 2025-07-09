import express from "express";
import { authenticateToken } from "../middlewares.js";
import db from "../db.js";

const router = express.Router();

router.get("/view/location", authenticateToken, async (req, res) => {

    try {
        const result = await db.query("SELECT * FROM location ORDER BY id DESC");
        console.log(result.rows);
        res.render("location/location.ejs", {
            user: req.user,
            locations: result.rows,
            doctorsPage: false,
            patientsPage: false,
            refPage: false,
            locationPage: true,
            appointmentsPage: false,
            activeMenu: "shenimet"
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Problem duke tentuar per ti shfaqur njesit organizative (problem i programit)")
    }
});

router.post("/add/location", authenticateToken, async (req, res) => {
    const { name } = req.body;

    try {
        await db.query("INSERT INTO location (name) VALUES($1)", [name]);
        res.redirect("/view/location?added=true")
    } catch (err) {
        console.error(err);
        res.status(500).send("Problem duke shtuar njesin organizative (problem i programit)")
    }
});

router.post("/edit/location", authenticateToken, async (req, res) => {
    const { id, name } = req.body;
    try {
        await db.query("UPDATE location SET name = $1 WHERE id = $2", [name, id]);
        res.redirect("/view/location?updated=true");
    } catch (err) {
        console.error(err);
        res.status(500).send("Problem duke perditsuar njesin organizative (problem i programit)");
    }
});

router.post("/delete/location", authenticateToken, async (req, res) => {
    const id = req.body.id;

    try {
        await db.query("DELETE FROM location WHERE id = $1", [id]);
        res.redirect("/view/location?deleted=true");
    } catch (err) {
        console.error(err);
        res.status(500).send("Problem duke fshir njesin organizative (problem i programit)");
    }
});

export default router;