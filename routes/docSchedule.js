import express from "express";
import { authenticateToken } from "../middlewares.js";
import db from "../db.js";

const router = express.Router();


router.get('/view/doctor-schedules', authenticateToken, async (req, res) => {
    try {
        const schedules = await db.query(`
      SELECT ds.*, d.full_name AS doctor_name, l.name AS location_name
      FROM doctor_schedules ds
      JOIN doctors d ON ds.doctor_id = d.id
      JOIN location l ON ds.location_id = l.id
    `);

        const doctors = await db.query('SELECT id, full_name FROM doctors');
        const locations = await db.query('SELECT id, name FROM location');

        res.render('doc-schedule/docSche.ejs', {
            user: req.user,
            schedules: schedules.rows,
            doctors: doctors.rows,
            locations: locations.rows,
            doctorsPage: false,
            patientsPage: false,
            refPage: false,
            locationPage: false,
            appointmentsPage: false,
            doctorsSchedulePage: true,
            activeMenu: 'shenimet'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Gabim gjatë marrjes së orareve');
    }
});


// POST - Shto orar të ri
router.post('/add/doctor-schedule', authenticateToken, async (req, res) => {
    const { doctor_id, location_id, weekday_hours, visit_duration } = req.body;

    try {
        await db.query(`
      INSERT INTO doctor_schedules (doctor_id, location_id, weekday_hours, visit_duration)
      VALUES ($1, $2, $3, $4)
    `, [doctor_id, location_id, weekday_hours, visit_duration]);

        res.redirect('/view/doctor-schedules');
    } catch (err) {
        console.error(err);
        res.status(500).send('Gabim gjatë shtimit të orarit');
    }
});

// POST - Edito orarin
router.post('/edit/doctor-schedule', authenticateToken, async (req, res) => {
    const { id, doctor_id, location_id, weekday_hours, visit_duration } = req.body;

    try {
        await db.query(`
      UPDATE doctor_schedules
      SET doctor_id = $1,
          location_id = $2,
          weekday_hours = $3,
          visit_duration = $4
      WHERE id = $5
    `, [doctor_id, location_id, weekday_hours, visit_duration, id]);

        res.redirect('/view/doctor-schedules');
    } catch (err) {
        console.error(err);
        res.status(500).send('Gabim gjatë përditësimit të orarit');
    }
});

// POST - Fshij orarin
router.post('/delete/doctor-schedule', authenticateToken, async (req, res) => {
    const { id } = req.body;

    try {
        await db.query(`DELETE FROM doctor_schedules WHERE id = $1`, [id]);
        res.redirect('/view/doctor-schedules');
    } catch (err) {
        console.error(err);
        res.status(500).send('Gabim gjatë fshirjes së orarit');
    }
});


export default router;