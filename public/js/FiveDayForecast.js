function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.warn("Geolocation not supported.");
  }
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;
}
new Vue({
  el: "#app",
  data() {
    return {
      high: null,
      low: null,
      precipChance: null,
      summary: null,
      date: null,
      high2: null,
      low2: null,
      precipChance2: null,
      summary2: null,
      date2: null,
      high3: null,
      low3: null,
      precipChance3: null,
      summary3: null,
      date3: null,
      high4: null,
      low4: null,
      precipChance4: null,
      summary4: null,
      date4: null,
      high5: null,
      low5: null,
      precipChance5: null,
      summary5: null,
      date5: null,
      lat: "",
      lon: ""
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      // let lat = position.coords.latitude;
      // let lng = position.coords.longitude;
      let url =
        "https://api.darksky.net/forecast/99f31f87aad858fab80ba47a8b0aaacc/39.7392,-104.9903";
      // "https://api.darksky.net/forecast/99f31f87aad858fab80ba47a8b0aaacc/" +
      // lat +
      // "," +
      // lng;
      console.log(url);
      axios
        .get(url)
        .then(response => {
          (this.high = response.data.daily.data[0].apparentTemperatureHigh),
            (this.low = response.data.daily.data[0].apparentTemperatureLow),
            (this.precipChance =
              response.data.daily.data[0].precipProbability * 100),
            (this.summary = response.data.daily.data[0].summary),
            (this.date = new Date(response.data.daily.data[0].time * 1000)),
            (this.high2 = response.data.daily.data[1].apparentTemperatureHigh),
            (this.low2 = response.data.daily.data[1].apparentTemperatureLow),
            (this.precipChance2 =
              response.data.daily.data[1].precipProbability * 100),
            (this.summary2 = response.data.daily.data[1].summary),
            (this.date2 = new Date(response.data.daily.data[1].time * 1000)),
            (this.high3 = response.data.daily.data[2].apparentTemperatureHigh),
            (this.low3 = response.data.daily.data[2].apparentTemperatureLow),
            (this.precipChance3 =
              response.data.daily.data[2].precipProbability * 100),
            (this.summary3 = response.data.daily.data[2].summary),
            (this.date3 = new Date(response.data.daily.data[2].time * 1000)),
            (this.high4 = response.data.daily.data[3].apparentTemperatureHigh),
            (this.low4 = response.data.daily.data[3].apparentTemperatureLow),
            (this.precipChance4 =
              response.data.daily.data[3].precipProbability * 100),
            (this.summary4 = response.data.daily.data[3].summary),
            (this.date4 = new Date(response.data.daily.data[3].time * 1000)),
            (this.high5 = response.data.daily.data[4].apparentTemperatureHigh),
            (this.low5 = response.data.daily.data[4].apparentTemperatureLow),
            (this.precipChance5 =
              response.data.daily.data[4].precipProbability * 100),
            (this.summary5 = response.data.daily.data[4].summary),
            (this.date5 = new Date(response.data.daily.data[4].time * 1000));
        })
        .catch(error => {
          console.log(error);
        });
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.warn("Geolocation not supported.");
      }
    },
    showPosition(position) {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
    }
  },
  filters: {
    formatDate: function(val) {
      if (val) {
        return moment(String(val)).format("M/DD/YY");
      }
    }
  }
});

// new Vue({
//   el: "#app",
//   data() {
//     return {
//       high: null,
//       low: null,
//       precipChance: null,
//       summary: null,
//       date: null,
//       high2: null,
//       low2: null,
//       precipChance2: null,
//       summary2: null,
//       date2: null,
//       high3: null,
//       low3: null,
//       precipChance3: null,
//       summary3: null,
//       date3: null,
//       high4: null,
//       low4: null,
//       precipChance4: null,
//       summary4: null,
//       date4: null,
//       high5: null,
//       low5: null,
//       precipChance5: null,
//       summary5: null,
//       date5: null,
//       lat: "",
//       lon: ""
//     };
//   },
//   mounted() {
//     axios
//       .get(
//         "https://api.darksky.net/forecast/99f31f87aad858fab80ba47a8b0aaacc/39.6303,106.0434"
//         // +
//         //   lat +
//         //   "," +
//         //   lng
//       )
//       .then(
//         response => (
//           (this.high = response.data.daily.data[0].apparentTemperatureHigh),
//           (this.low = response.data.daily.data[0].apparentTemperatureLow),
//           (this.precipChance =
//             response.data.daily.data[0].precipProbability * 100),
//           (this.summary = response.data.daily.data[0].summary),
//           (this.date = new Date(response.data.daily.data[0].time * 1000)),
//           (this.high2 = response.data.daily.data[1].apparentTemperatureHigh),
//           (this.low2 = response.data.daily.data[1].apparentTemperatureLow),
//           (this.precipChance2 =
//             response.data.daily.data[1].precipProbability * 100),
//           (this.summary2 = response.data.daily.data[1].summary),
//           (this.date2 = new Date(response.data.daily.data[1].time * 1000)),
//           (this.high3 = response.data.daily.data[2].apparentTemperatureHigh),
//           (this.low3 = response.data.daily.data[2].apparentTemperatureLow),
//           (this.precipChance3 =
//             response.data.daily.data[2].precipProbability * 100),
//           (this.summary3 = response.data.daily.data[2].summary),
//           (this.date3 = new Date(response.data.daily.data[2].time * 1000)),
//           (this.high4 = response.data.daily.data[3].apparentTemperatureHigh),
//           (this.low4 = response.data.daily.data[3].apparentTemperatureLow),
//           (this.precipChance4 =
//             response.data.daily.data[3].precipProbability * 100),
//           (this.summary4 = response.data.daily.data[3].summary),
//           (this.date4 = new Date(response.data.daily.data[3].time * 1000)),
//           (this.high5 = response.data.daily.data[4].apparentTemperatureHigh),
//           (this.low5 = response.data.daily.data[4].apparentTemperatureLow),
//           (this.precipChance5 =
//             response.data.daily.data[4].precipProbability * 100),
//           (this.summary5 = response.data.daily.data[4].summary),
//           (this.date5 = new Date(response.data.daily.data[4].time * 1000))
//         )
//       );
//     // .then(function (response) {
//     //     console.log(response);
//     //     total = response.data.daily.data.length;
//     //     console.log('TCL: --------------------------------------------------------------------------------');
//     //     console.log('TCL: mounted -> response.data.daily.data.length', response.data.daily.data.length);
//     //     console.log('TCL: --------------------------------------------------------------------------------');
//     //     var items = [];
//     //     for (let i = 0; i < total.length; i++) {
//     //         items.push(data[i].apparentTemperatureHigh)
//     //         console.log(ids);
//     //     };

//     // })
//   },
//   filters: {
//     formatDate: function(val) {
//       if (val) {
//         return moment(String(val)).format("M/DD/YY");
//       }
//     }
//   },
//   methods: {
//     getLocation() {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//       } else {
//         console.warn("Geolocation not supported.");
//       }
//     },
//     showPosition(position) {
//       let lat = position.coords.latitude;
//       let lng = position.coords.longitude;
//     }
//   }
// });

getLocation();
