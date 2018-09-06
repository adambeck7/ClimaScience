$("#table").hide();
new Vue({
  el: "#chartarea",
  data: {
    message: "Hello, world!",
    lat: "",
    lng: "",
    select: [],
    data: []
  },
  methods: {
    //On each checkbox being checked...
    getData() {
      $.get(
        "https://api.darksky.net/forecast/f69b34e59a6ce824a619446dcdeb0996/" +
          this.lat +
          "," +
          this.lng,
        result => {
          console.log(result);
          this.data = [];
          for (let i = 0; i < result.hourly.data.length; i++) {
            let datum = {
              time: "",
              res: []
            };

            let time = new Date(result.hourly.data[i].time * 1000);
            let hours = time.getHours();
            let minutes = "0" + time.getMinutes();
            let formatted = hours + ":" + minutes;
            datum.time = formatted;

            for (let q = 0; q < this.select.length; q++) {
              datum.res.push(result.hourly.data[i][this.select[q]]);
            }
            this.data.push(datum);
          }
          console.log(this.data);
          $("#table").show();
        }
      );
    },
    getLoc() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
    showPosition(position) {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      $('#lat-label').addClass('active');
      $('#lng-label').addClass('active')
    }
  }
});
