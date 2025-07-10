import express from "express";
import { authenticateToken } from "../middlewares.js";
import db from "../db.js";

const router = express.Router();

router.post("/add/doctor", authenticateToken, async (req, res) => {
    const { fullName, department, phoneNumber, email } = req.body;

    try {
        await db.query("INSERT INTO doctors (full_name, department, tel, email) VALUES($1, $2, $3, $4)",
            [fullName, department, phoneNumber, email]
        );
        res.redirect("/view/doctors?doctorAdded=true");
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
            activeMenu: "shenimet",
            doctorsPage: true,
            patientsPage: false,
            locationPage: false,
            appointmentsPage: false,
            doctorsSchedulePage: false,
            refPage: false
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
        res.redirect("/view/doctors?doctorUpdated=true");
    } catch (err) {
        console.error(err);
        res.status(500).send("Gabim gjatë përditësimit");
    }
});

router.post("/delete/doctor", authenticateToken, async (req, res) => {
    const { id } = req.body;

    try {
        await db.query("DELETE FROM doctors WHERE id = $1", [id]);
        res.redirect("/view/doctors?doctorDeleted=true");
    } catch (err) {
        console.error(err);
        res.status(500).send("Gabim gjatë fshirjes");
    }
});

router.get('/doctor-report/:id', authenticateToken, async (req, res) => {
    const doctorId = req.params.id;

    try {
        const doctor = await db.query('SELECT * FROM doctors WHERE id = $1', [doctorId]);
        const appointments = await db.query(`
      SELECT a.*, p.first_name || ' ' || p.last_name AS patient_name
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      WHERE a.doctor_id = $1
      ORDER BY a.appointment_date DESC
    `, [doctorId]);

        res.render('reports/doctorReport.ejs', {
            doctor: doctor.rows[0],
            appointments: appointments.rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Gabim gjatë gjenerimit të raportit");
    }
});




export default router;