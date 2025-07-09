// routes/appointments.js

import express from "express";
import { authenticateToken } from "../middlewares.js";
import db from "../db.js";

const router = express.Router();

router.get("/view/appointments", authenticateToken, async (req, res) => {
    try {
        const appointmentsResult = await db.query(`
            SELECT 
                a.id,
                a.doctor_id,
                a.patient_id,
                a.appointment_date AS date,
                a.appointment_time AS time,
                a.status,
                p.first_name || ' ' || p.last_name AS patient_name,
                d.full_name AS doctor_name
            FROM appointments a
            JOIN patients p ON a.patient_id = p.id
            JOIN doctors d ON a.doctor_id = d.id
            ORDER BY a.appointment_date DESC, a.appointment_time DESC
    `);

        const doctorsResult = await db.query("SELECT id, full_name FROM doctors ORDER BY full_name");
        const patientsResult = await db.query("SELECT id, first_name, last_name FROM patients ORDER BY first_name");

        res.render("appointments/appointments.ejs", {
            user: req.user,
            appointmentsPage: true,
            doctorsPage: false,
            patientsPage: false,
            refPage: false,
            locationPage: false,
            doctorsSchedulePage: false,
            activeMenu: "shenimet",
            appointments: appointmentsResult.rows,
            doctors: doctorsResult.rows,
            patients: patientsResult.rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Problem gjat kerkimit te terminet (problem i programit)");
    }
});

router.post("/add/appointment", authenticateToken, async (req, res) => {
    const { doctor_id, patient_id, date, time, status } = req.body;

    if (!doctor_id || !patient_id || !date || !time || !status) {
        return res.redirect("/view/appointments?error=true");
    }

    try {
        await db.query(
            `INSERT INTO appointments (doctor_id, patient_id, appointment_date, appointment_time, status)
       VALUES ($1, $2, $3, $4, $5)`,
            [doctor_id, patient_id, date, time, status]
        );

        res.redirect("/view/appointments?appointmentAdded=true");
    } catch (err) {
        console.error(err);
        res.status(500).send("Problem gjat shtimit te terminit (problem i programit)");
    }
});

// EDIT appointment
router.post("/edit/appointment", authenticateToken, async (req, res) => {
    const { id, doctor_id, patient_id, date, time, status } = req.body;

    if (!id || !doctor_id || !patient_id || !date || !time || !status) {
        return res.redirect("/view/appointments?error=true");
    }

    try {
        await db.query(
            `UPDATE appointments
       SET doctor_id = $1,
           patient_id = $2,
           appointment_date = $3,
           appointment_time = $4,
           status = $5
       WHERE id = $6`,
            [doctor_id, patient_id, date, time, status, id]
        );

        res.redirect("/view/appointments?appointmentUpdated=true");
    } catch (err) {
        console.error(err);
        res.status(500).send("Problem gjat editimit te terminit (problem i programit)");
    }
});

// DELETE appointment
router.post("/delete/appointment", authenticateToken, async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.redirect("/view/appointments?error=true");
    }

    try {
        await db.query("DELETE FROM appointments WHERE id = $1", [id]);
        res.redirect("/view/appointments?appointmentDeleted=true");
    } catch (err) {
        console.error(err);
        res.status(500).send("Problem gjat fshirjes se terminit (problem i programit)");
    }
});

router.get("/doctor-available-dates/:doctorId", authenticateToken, async (req, res) => {
    const { doctorId } = req.params;
    try {
        const schedule = await db.query(`
            SELECT weekday_hours
            FROM doctor_schedules
            WHERE doctor_id = $1
        `, [doctorId]);

        if (schedule.rows.length === 0) {
            return res.json({ success: false, message: "Nuk u gjet orari për këtë doktor." });
        }

        const weekdayHours = schedule.rows[0].weekday_hours;
        const validDays = Object.entries(weekdayHours)
            .filter(([day, hours]) => hours.start && hours.end)
            .map(([day]) => day);

        res.json({ success: true, validDays });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Gabim gjatë marrjes së datave të lira." });
    }
});

router.get("/doctor-available-times/:doctorId/:date", authenticateToken, async (req, res) => {
    const { doctorId, date } = req.params;

    // Map i fiksuar për ditët në shqip
    const dayMap = {
        "Monday": "E Hënë",
        "Tuesday": "E Martë",
        "Wednesday": "E Mërkurë",
        "Thursday": "E Enjte",
        "Friday": "E Premte",
        "Saturday": "E Shtunë",
        "Sunday": "E Diel"
    };

    try {
        const scheduleRes = await db.query(`
            SELECT weekday_hours, visit_duration
            FROM doctor_schedules
            WHERE doctor_id = $1
        `, [doctorId]);

        if (scheduleRes.rows.length === 0) {
            return res.json({ success: false });
        }

        const { weekday_hours, visit_duration } = scheduleRes.rows[0];

        const jsDate = new Date(date);
        const weekdayEn = jsDate.toLocaleDateString("en-US", { weekday: "long" });
        const weekday = dayMap[weekdayEn]; // Tani është saktë, p.sh. "E Hënë"

        const hours = weekday_hours[weekday];
        if (!hours || !hours.start || !hours.end) {
            return res.json({ success: false, times: [] });
        }

        const start = hours.start;
        const end = hours.end;
        const times = [];

        let [startH, startM] = start.split(":").map(Number);
        let [endH, endM] = end.split(":").map(Number);
        const duration = parseInt(visit_duration);

        let current = new Date(jsDate);
        current.setHours(startH, startM, 0, 0);

        const endDate = new Date(jsDate);
        endDate.setHours(endH, endM, 0, 0);

        while (current <= endDate) {
            const hh = current.getHours().toString().padStart(2, "0");
            const mm = current.getMinutes().toString().padStart(2, "0");
            times.push(`${hh}:${mm}`);
            current.setMinutes(current.getMinutes() + duration);
        }

        res.json({ success: true, times });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

export default router;