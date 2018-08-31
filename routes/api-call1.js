const DarkSky = require("dark-sky");
const Express = require("express");
// const darksky = new DarkSky(process.env.DARK_SKY) // Your API KEY can be hardcoded, but I recommend setting it as an env variable.
const darksky = new DarkSky("99f31f87aad858fab80ba47a8b0aaacc");

// Example 1 - Method chaining, as promise.
// darksky
//     .latitude('37.8267')            \\ required: latitude, string || float.
//     .longitude(-122.423)            \\ required: longitude, string || float.
//     .time('2016-01-28')             \\ optional: date, string 'YYYY-MM-DD'.
//     .units('ca')                    \\ optional: units, string, refer to API documentation.
//     .language('en')                 \\ optional: language, string, refer to API documentation.
//     .exclude('minutely,daily')      \\ optional: exclude, string || array, refer to API documentation.
//     .extendHourly(true)             \\ optional: extend, boolean, refer to API documentation.
//     .get()                          \\ execute your get request.
//     .then(console.log)
//     .catch(console.log)             \\ handle your error response.

// Example 2 - Setting coordinates shorthand, as promise.
// darksky
//     .coordinates({lat: 37.8267, lng: -122.423})
//     .units('ca')
//     .language('en')
//     .exclude('minutely,daily')
//     .get()
//     .then(console.log)
//     .catch(console.log)

// Example 3 - Setting options shorthand, as promise.
// darksky
//     .options({
//         latitude: 37.8267,
//         longitude: -122.423,
//         time: '2017-08-10',
//         language: 'en',
//         exclude: ['minutely', 'daily'],
//         extendHourly: true
//     })
//     .get()
//     .then(console.log)

// Example 4 - Modern endpoint example, as async/await.
module.exports = function(app) {
  app.get("/map", async (req, res, next) => {
    try {
      const { latitude, longitude } = req.body;
      const forecast = await darksky
        .options({
          latitude,
          longitude,
          time: "2017-08-10"
        })
        .get();
      res.status(200).json(forecast);
      console.log(
        "TCL: ---------------------------------------------------------------------"
      );
      console.log(
        "TCL: res.status(200).json(forecast);",
        res.status(200).json(forecast)
      );
      console.log(
        "TCL: ---------------------------------------------------------------------"
      );
    } catch (err) {
      next(err);
    }
  });
};
