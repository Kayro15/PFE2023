const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();


const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");
const job_offerRoutes = require("./routes/job_offer.route");
const candidatRoute = require("./routes/candidats.route");
const createprofile = require("./routes/createprofile.route");
const adminroutes = require("./routes/admin.route");
const superadminroute = require("./routes/superadmin.route");
const modelroute = require("./routes/Model.route");
const cookieParser = require('cookie-parser');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser())

app.use("/api/model", modelroute);
app.use("/api/superadmin", superadminroute);
app.use("/api/admin", adminroutes);
app.use("/api/candidats", candidatRoute);
app.use("/api/jobs", job_offerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Le serveur fonctionne" + port);
});
