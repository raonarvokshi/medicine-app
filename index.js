import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { verifyToken } from "./middlewares.js";
import auth from "./routes/auth.js"
import profile from "./routes/profile.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(auth);
app.use(profile);

app.get("/", verifyToken, (req, res) => {
    res.render("home.ejs", { user: req.user });
});

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});

export default SECRET_KEY;
