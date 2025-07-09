import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import auth from "./routes/auth.js"
import profile from "./routes/profile.js";
import doctors from "./routes/doctors.js";
import patient from "./routes/patients.js";
import ref from "./routes/referrers.js";
import dashboard from "./routes/dashboard.js";
import location from "./routes/location.js";
import appointments from "./routes/appointments.js";
import docSche from "./routes/docSchedule.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(auth);
app.use(profile);
app.use(doctors);
app.use(patient);
app.use(ref);
app.use(dashboard);
app.use(location);
app.use(appointments);
app.use(docSche);

app.get("/", (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/login");
    } else {
        return res.redirect("/dashboard");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});

export default SECRET_KEY;
