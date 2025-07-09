import express from "express";
import db from "../db.js";
import { authenticateToken } from "../middlewares.js";

const router = express.Router();

router.post("/add/patient", authenticateToken, async (req, res) => {
    const {
        fName,
        parentsName,
        lName,
        email,
        gender,
        personalNum,
        birthday,
        ageType,
        city,
        address,
        comment,
        insurance
    } = req.body;

    try {
        await db.query(
            `INSERT INTO patients 
      (first_name, parent_name, last_name, email, gender, personal_number, birthday, age_type, city, address, comment, insurance_status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
            [
                fName,
                parentsName,
                lName,
                email,
                gender,
                personalNum,
                birthday,
                ageType,
                city,
                address,
                comment,
                insurance
            ]
        );

        res.redirect("/view/patients?patientAdded=true");
    } catch (err) {
        console.error("Error inserting patient:", err.message);
        res.redirect("/view/patients");
    }
});

router.get("/view/patients", authenticateToken, async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM patients ORDER BY id DESC");
        res.render("patients/viewPatients.ejs", {
            user: req.user,
            patients: result.rows,
            activeMenu: "shenimet",
            patientsPage: true,
            doctorsPage: false,
            locationPage: false,
            appointmentsPage: false,
            refPage: false
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// EDIT PATIENT - përditëson të gjitha fushat
router.post("/edit/patient", authenticateToken, async (req, res) => {
    const {
        id,
        fName,
        parentsName,
        lName,
        email,
        gender,
        personalNum,
        birthday,
        ageType,
        city,
        address,
        comment,
        insurance,
    } = req.body;

    try {
        await db.query(
            `UPDATE patients SET 
        first_name = $1,
        parent_name = $2,
        last_name = $3,
        email = $4,
        gender = $5,
        personal_number = $6,
        birthday = $7,
        age_type = $8,
        city = $9,
        address = $10,
        comment = $11,
        insurance_status = $12,
        updated_at = NOW()
      WHERE id = $13`,
            [
                fName,
                parentsName,
                lName,
                email,
                gender,
                personalNum,
                birthday,
                ageType,
                city,
                address,
                comment,
                insurance,
                id
            ]
        );

        res.redirect("/view/patients?patientUpdated=true");
    } catch (err) {
        console.error("Gabim gjatë përditësimit të pacientit:", err);
        res.status(500).send("Gabim gjatë përditësimit të pacientit");
    }
});


// DELETE PATIENT
router.post("/delete/patient", authenticateToken, async (req, res) => {
    const { id } = req.body;
    try {
        await db.query("DELETE FROM patients WHERE id = $1", [id]);
        res.redirect("/view/patients?patientDeleted=true");
    } catch (err) {
        console.error(err);
        res.status(500).send("Gabim gjatë fshirjes së pacientit");
    }
});


export default router;