const DarkSky = require("dark-sky");
const darksky = new DarkSky("99f31f87aad858fab80ba47a8b0aaacc");

module.exports = function(app) {
  console.log("api works");
  app.get("/maps", async (req, res, next) => {
    try {
      //   const { latitude, longitude } = req.body
      let latitude = 39.7392;
      let longitude = 104.9903;
      const forecast = await darksky
        .options({
          latitude,
          longitude,
          time: moment().subtract(1, "weeks")
        })
        .get();
      res.status(200).json(forecast);
      console.log("TCL: -----------------------------------------");
      console.log(
        "TCL: module.exports -> forecast",
        res.status(200).json(forecast)
      );
      console.log("TCL: -----------------------------------------");
    } catch (err) {
      next(err);
    }
  });
};
