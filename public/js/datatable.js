//Hiding the table on page load
$("#table").hide();

//Creating the Vue instance
new Vue({
  //Will use the chart area w/several data that will become more clear as I go along.
  el: "#chartarea",
  data: {
    lat: "",
    lng: "",
    select: [],
    data: []
  },
  methods: {
    //getData is triggered as a click function on the checkboxes in the HTML.
    getData() {
      //Running an AJAX call against the Dark Sky API
      $.get(
        "https://api.darksky.net/forecast/f69b34e59a6ce824a619446dcdeb0996/" + this.lat + "," + this.lng, result => {
          //Resetting Data to an empty array.
          this.data = [];
          //Running an iterator through the hourly data...
          for (let i = 0; i < result.hourly.data.length; i++) {
            //Creating a new object called Datum on each pass, which contains time as an empty string and a key called res which is passed an empty array.
            let datum = {
              time: "",
              res: []
            };

            //This is nothing more than a time converter so that user's don't have to read a bunch of UNIX timestamps.
            let time = new Date(result.hourly.data[i].time * 1000);
            let hours = time.getHours();
            let minutes = "0" + time.getMinutes();
            let formatted = hours + ":" + minutes;
            //The formatted 00:00 time is passed to datum as a string.
            datum.time = formatted;

            //An iterator within an iterator, what fun. So, the select variable is bound to the HTML via v-model to each of the checkbox values, meaning that it holds the values of each of the checkbox clicks. These values also happen to be keys in the API data object, so...
            for (let q = 0; q < this.select.length; q++) {
              //Whenever a new checkbox is clicked, we check this.select to see which checks are currently clicked, and push all the data relevant to each of the checks into the datum.res key.
              datum.res.push(result.hourly.data[i][this.select[q]]);
            }
            //At which point,the data array is given the new datum, replete with all the data types the user specified, bound to a particular time.
            this.data.push(datum);
          }
          //And now we can show the table.
          $("#table").show();
        }
      );
    },
    //Second method: the get location method. Pretty basic geolocation stuff.
    getLoc() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
    showPosition(position) {
      //rather than setting DOM elements to the geoloc coords, the cool thing here is that I just have to edit the data...
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      //Unfortunately, Materialize doesn't recognize when its inputs have been populated by javascript, so the labels need to be manually set to active if they're going to rise.
      $('#lat-label').addClass('active');
      $('#lng-label').addClass('active')
    }
  }
});
