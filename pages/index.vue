<template>




<div>
  <div class="section no-pad-bot" id="index-banner">
    <div class="container">
      <h1 class="center header cd-headline letters type">
        <img src="../assets/img/climaScience-transparent.png" alt="ClimaScience logo">
      </h1>
    </div>
  </div>

  <!--Intro and service-->
  <div id="intro" class="section scrollspy forecastFont">
    <div class="container">
      
        <!--<div class="col s12">
          <form method="get">
            <label for="input">Latitude, Longitude</label>
            <input id="latlng" type="text">
            <button class="submit" type="submit">Submit text</button>
          </form>
        </div>-->
        <div class="row forecastRow">
        <div id="app" class="center">
          <div class="section">
            <div class="col s6 m2">
              <h5 class="header center forecastHeaders">{{ date | formatDate }}</h5>
              <div class="card horizontal">
                <div class="card-image">

                </div>
                <div class="card-stacked center">

                  <p>&#8593<span class="high">{{Math.round(high)}}&#8457    </span> &#8595<span class="low">{{Math.round(low)}}</span>&#8457</p>
                  <p>Precip: {{Math.round(precipChance)}}%</p>

                  <i class="wi wi-night-sleet"></i>
                </div>
                <div class="card-action">
                  <p> {{summary}}</p>
                </div>

              </div>
            </div>
            <div class="col s6 m2">
              <h5 class="header center forecastHeaders">{{ date2 | formatDate }}</h5>
              <div class="card horizontal">
                <div class="card-image">

                </div>
                <div class="card-stacked center">

                  <p>&#8593<span class="high">{{Math.round(high2)}}&#8457    </span> &#8595<span class="low">{{Math.round(low2)}}</span>&#8457</p>
                  <p>Precip: {{Math.round(precipChance2)}}%</p>

                  <i class="wi wi-night-sleet"></i>
                </div>
                <div class="card-action">
                  <p> {{summary2}}</p>
                </div>

              </div>
            </div>
            <div class="col s6 m2">
              <h5 class="header center forecastHeaders">{{ date3 | formatDate }}</h5>
              <div class="card horizontal">
                <div class="card-image">

                </div>
                <div class="card-stacked center">

                  <p>&#8593<span class="high">{{Math.round(high3)}}&#8457    </span> &#8595<span class="low">{{Math.round(low3)}}</span>&#8457</p>
                  <p>Precip: {{Math.round(precipChance3)}}%</p>

                  <i class="wi wi-night-sleet"></i>
                </div>
                <div class="card-action">
                  <p> {{summary3}}</p>
                </div>

              </div>
            </div>
            <div class="col s6 m2">
              <h5 class="header center forecastHeaders">{{ date4 | formatDate }}</h5>
              <div class="card horizontal">
                <div class="card-image">

                </div>
                <div class="card-stacked center">

                  <p>&#8593<span class="high">{{Math.round(high4)}}&#8457    </span> &#8595<span class="low">{{Math.round(low4)}}</span>&#8457</p>
                  <p>Precip: {{Math.round(precipChance4)}}%</p>

                  <i class="wi wi-night-sleet"></i>
                </div>
                <div class="card-action">
                  <p> {{summary4}}</p>
                </div>

              </div>
            </div>
            <div class="col s6 m2">
              <h5 class="header center forecastHeaders">{{ date5 | formatDate }}</h5>
              <div class="card horizontal">
                <div class="card-image">

                </div>
                <div class="card-stacked center">

                  <p>&#8593<span class="high">{{Math.round(high5)}}&#8457    </span> &#8595<span class="low">{{Math.round(low5)}}</span>&#8457</p>
                  <p>Precip: {{Math.round(precipChance5)}}%</p>

                  <i class="wi wi-night-sleet"></i>
                </div>
                <div class="card-action">
                  <p> {{summary5}}</p>
                </div>
                
              </div>
        
            </div>
          </div>
           
         
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
        <div class="col s12 center">

            <div id="map_canvas"></div>
        </div>
    </div>
</div>
</div>

</template>

<script>
import axios from '~/plugins/axios'
import moment from 'moment'

// function getLocation () {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition)
//   } else {
//     console.warn('Geolocation not supported.')
//   }
// }
// function showPosition (position) {
//   let lat = position.coords.latitude
//   let lng = position.coords.longitude
// }
/* eslint-disable no-undef */
export default {
  data () {
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
      lat: '',
      lon: '',
      mapLoaded: false
    }
  },
  mounted: function () {
    this.getPosts()
    this.buildMap()
  },
  //   head () {
  //     return {
  //       script: [
  //         { src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDnDVcOKz9T8y1QE9V11gUu0G2EWwGBDQo' }
  //       ]
  //     }
  //   },
  methods: {
    getPosts () {
      // let lat = position.coords.latitude
      // let lng = position.coords.longitude
      // let url =
      //   'https://api.darksky.net/forecast/99f31f87aad858fab80ba47a8b0aaacc/39.7392,-104.9903'
      // 'https://api.darksky.net/forecast/99f31f87aad858fab80ba47a8b0aaacc/' +
      // lat +
      // ',' +
      // lng
      let latlng = '39.7392,-104.9903'
      axios.get('/api/loc/' + latlng).then(res => {
        this.data = res.data
        this.high = res.data.daily.data[0].apparentTemperatureHigh
        this.low = res.data.daily.data[0].apparentTemperatureLow
        this.precipChance = res.data.daily.data[0].precipProbability * 100
        this.summary = res.data.daily.data[0].summary
        this.date = new Date(res.data.daily.data[0].time * 1000)
        this.high2 = res.data.daily.data[1].apparentTemperatureHigh
        this.low2 = res.data.daily.data[1].apparentTemperatureLow
        this.precipChance2 =
            res.data.daily.data[1].precipProbability * 100
        this.summary2 = res.data.daily.data[1].summary
        this.date2 = new Date(res.data.daily.data[1].time * 1000)
        this.high3 = res.data.daily.data[2].apparentTemperatureHigh
        this.low3 = res.data.daily.data[2].apparentTemperatureLow
        this.precipChance3 =
            res.data.daily.data[2].precipProbability * 100
        this.summary3 = res.data.daily.data[2].summary
        this.date3 = new Date(res.data.daily.data[2].time * 1000)
        this.high4 = res.data.daily.data[3].apparentTemperatureHigh
        this.low4 = res.data.daily.data[3].apparentTemperatureLow
        this.precipChance4 =
            res.data.daily.data[3].precipProbability * 100
        this.summary4 = res.data.daily.data[3].summary
        this.date4 = new Date(res.data.daily.data[3].time * 1000)
        this.high5 = res.data.daily.data[4].apparentTemperatureHigh
        this.low5 = res.data.daily.data[4].apparentTemperatureLow
        this.precipChance5 =
            res.data.daily.data[4].precipProbability * 100
        this.summary5 = res.data.daily.data[4].summary
        this.date5 = new Date(res.data.daily.data[4].time * 1000)
      })
        .catch(error => {
          console.log(error)
        })
    },
    buildMap () {
      var map
      function initialize () {
        var mapOptions = {
          zoom: 8,
          center: new google.maps.LatLng(39.7392, -104.9903),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions)
        let tileNEX = new google.maps.ImageMapType({
          getTileUrl: function (tile, zoom) {
            return 'https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913/' + zoom + '/' + tile.x + '/' + tile.y + '.png?' + (new Date()).getTime()
          },
          tileSize: new google.maps.Size(256, 256),
          opacity: 0.60,
          name: 'NEXRAD',
          isPng: true
        })
        let goes = new google.maps.ImageMapType({
          getTileUrl: function (tile, zoom) {
            return 'https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/goes-east-vis-1km-900913/' + zoom + '/' + tile.x + '/' + tile.y + '.png?' + (new Date()).getTime()
          },
          tileSize: new google.maps.Size(256, 256),
          opacity: 0.60,
          name: 'GOES East Vis',
          isPng: true
        })
        map.overlayMapTypes.push(null) // create empty overlay entry
        map.overlayMapTypes.setAt('0', goes)
        map.overlayMapTypes.push(null) // create empty overlay entry
        map.overlayMapTypes.setAt('1', tileNEX)
      }
      google.maps.event.addDomListener(window, 'load', initialize)
    }
    // getLocation () {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(showPosition)
    //   } else {
    //     console.warn('Geolocation not supported.')
    //   }
    // }
    // showPosition (position) {
    //   let lat = position.coords.latitude
    //   let lng = position.coords.longitude
    // }
  },
  filters: {
    formatDate: function (val) {
      if (val) {
        return moment(String(val)).format('ddd M/D')
      }
    }
  }
}
// getLocation()
</script>
<style>
#map_canvas {
  width: 100%; 
  height: 30em;
	margin: 0 0 2em 0;
}
.forecastHeaders{
  color:#1a263d;
  font-weight:300;
}
.forecastRow{
  margin-right: -14.75rem !important;
}
.forecastFont{
  font-size: 1.2rem
}
.high{
  color: red;
  margin-right: .5rem
}
.low{
  color: blue;

}
</style>
