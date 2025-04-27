const express = require("express");
const app = express();
const qrRoute = require("./routes/qrgenerator");
//const adminRoutes = require("./routes/admin");
const path = require("path");
const compression = require("compression");
const qrPlacementsRoutes = require("./routes/placementgenerator");
const apiRoutes = require("./routes/api/index");

const cors = require("cors");

app.use(cors());

app.use(compression());
app.use("/qrcodes", express.static(path.join(__dirname, "data/qrcodes")));
app.use(express.static(path.join(__dirname, "../build")));



  

app.set("trust proxy", true);

// Importer la route de redirection
const redirectRoute = require("./routes/redirect");

// Utiliser la route
app.use("/", redirectRoute);
app.use("/", qrRoute);
//app.use("/", adminRoutes);
app.use("/", qrPlacementsRoutes);
app.use("/api", apiRoutes);

  
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


module.exports = app;
