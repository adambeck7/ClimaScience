var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8081;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
<<<<<<< Updated upstream
//require("./routes/html-routes.js")(app);

const DarkSky = require("dark-sky");
const darksky = new DarkSky("99f31f87aad858fab80ba47a8b0aaacc");


app.get("/map", (req, res) => {
  darksky
    .options({
      latitude: 37.8267,
      longitude: -122.423,
      time: "2017-08-10",
      language: "en",
      exclude: ["minutely", "daily"],
      extendHourly: true
    })
    .get()
    .then(results => {
      console.log(results);
      res.json(results.currently);
    });
});
// app.get("/map", async (req, res, next) => {
//   console.log("hitting api");
//   try {
//     const { latitude, longitude } = req.body;
//     const forecast = await darksky
//       .options({
//         latitude,
//         longitude,
//         time: "2017-08-10"
//       })
//       .get();
//     res.status(200).json(forecast);
//     console.log(
//       "TCL: ---------------------------------------------------------------------"
//     );
//     console.log(
//       "TCL: res.status(200).json(forecast);",
//       res.status(200).json(forecast)
//     );
//     console.log(
//       "TCL: ---------------------------------------------------------------------"
//     );
//   } catch (err) {
//     next(err);
//   }
// });
=======
require("./routes/html-routes.js")(app);
require("./routes/api-call1.js")(app);
>>>>>>> Stashed changes

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
