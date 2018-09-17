const DarkSky = require("dark-sky");
const darksky = new DarkSky("99f31f87aad858fab80ba47a8b0aaacc");
var app = express();
var express = require("express");

app.get("/test", (req, res) => {
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
