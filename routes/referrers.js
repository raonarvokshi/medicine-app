import express from "express";
import db from "../db.js";
import { authenticateToken } from "../middlewares.js";

const router = express.Router();

// GET - Shfaq referuesit
router.get('/view/refs', authenticateToken, async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM referrers ORDER BY created_at DESC');
        res.render('ref/viewRefs.ejs', {
            user: req.user,
            referrs: result.rows,
            activeMenu: "shenimet",
            refPage: true,
            doctorsPage: false,
            locationPage: false,
            patientsPage: false,
            appointmentsPage: false
        });
    } catch (err) {
        console.error('Gabim duke marrë referuesit:', err);
        res.status(500).send('Gabim i brendshëm');
    }
});

// POST - Shto referues të ri
router.post('/add/ref', authenticateToken, async (req, res) => {
    const { fullName, phoneNumber, email, department } = req.body;
    try {
        await db.query(
            'INSERT INTO referrers (full_name, tel, email, department, created_at) VALUES ($1, $2, $3, $4, NOW())',
            [fullName, phoneNumber, email, department]
        );
        res.redirect('/view/refs?refAdded=true');
    } catch (err) {
        console.error('Gabim gjatë shtimit të referuesit:', err);
        res.status(500).send('Gabim i brendshëm');
    }
});


router.post("/edit/ref", authenticateToken, async (req, res) => {
    const { id, fullName, department, tel, email } = req.body;

    try {
        await db.query(
            "UPDATE referrers SET full_name=$1, department=$2, tel=$3, email=$4, updated_at=NOW() WHERE id=$5",
            [fullName, department, tel, email, id]
        );
        res.redirect("/view/refs?refUpdated=true");
    } catch (err) {
        console.error(err);
        res.status(500).send("Gabim gjatë përditësimit");
    }
});

router.post("/delete/ref", authenticateToken, async (req, res) => {
    const { id } = req.body;

    try {
        await db.query("DELETE FROM referrers WHERE id = $1", [id]);
        res.redirect("/view/refs?refDeleted=true");
    } catch (err) {
        console.error(err);
        res.status(500).send("Gabim gjatë fshirjes");
    }
});



export default router;