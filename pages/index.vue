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
      
       <div class="center">
      
        <input v-model='geo'/>
        <button @click='geoCoder'>GO</button> 
        <button @click='getPosts(); buildMap()'>Get Forecast</button> 
          <!--<p>{{ geo }}</p>-->
      </div>
      <div class='row'>
        <div class="section">
          <div class="col s4 m2">
            <p class="currentTemp">{{ Math.round(curTemp) }}<span class="farenheitBig">&#8457</span></p>
          </div>
          <div class="col s2 m2">
            <p>Feels Like: {{ Math.round(curFeelsLike) }}<span class="farenheitSmall">&#8457</span></p>
            <p>Humidity: {{ Math.round(curHumid) }}%</p>
            <p>Precip: {{ Math.round(curPrecipProb) }}%</p>
          </div>
          <div class="col s2 m2">
            <p>Wind: {{ Math.round(curWindSpeed) }}mph</p>
            <p>Gusting to: {{ Math.round(curWindGust) }}mph</p>
            <p>Direction: {{ curWindBearing | formatWind }}</p>
          </div>
          <div class="col s2 m2">
            <p>Visibility: {{ Math.round(curVis) }} miles</p>
            <p>The nearest storm is {{ nearestStormDistance }} miles to the {{ nearestStormBearing | formatWind}}.</p>
          
          </div>
        </div>
      </div>

      <div class="row forecastRow">
        <div id="app" class="center">
          <div class="section">
            <div class="col s2 m2">
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
            <div class="col s2 m2">
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
            <div class="col s2 m2">
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
            <div class="col s2 m2">
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
            <div class="col s2 m2">
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
      env: process.env.GEOCODE_API_KEY,
      curTemp: null,
      curFeelsLike: null,
      curIcon: null,
      curHumid: null,
      curOzone: null,
      curWindBearing: null,
      curWindGust: null,
      curWindSpeed: null,
      curVis: null,
      curSummary: null,
      curPrecipIntensity: null,
      curPrecipProb: null,
      curUV: null,
      nearestStormBearing: null,
      nearestStormDistance: null,
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
      geo: '',
      latlon: '',
      mapLoaded: false
    }
  },
  mounted: function () {
    this.geoCoder()
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
    geoCoder () {
      axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.geo + '&key=' + process.env.GEOCODE_API_KEY).then(res => {
        console.log(res)
        this.lat = res.data.results[0].geometry.location.lat
        this.lon = res.data.results[0].geometry.location.lng
        this.latlon = this.lat + ',' + this.lon
      })
    },
    getPosts () {
      axios.get('/api/loc/' + this.latlon).then(res => {
      // axios.get('/api/loc/39.7392,-104.9903').then(res => {
        console.log(res)
        this.curTemp = res.data.currently.temperature
        this.curFeelsLike = res.data.currently.apparentTemperature
        this.curIcon = res.data.currently.icon.icon
        this.curHumid = res.data.currently.humidity
        this.curOzone = res.data.currently.ozone
        this.curWindBearing = res.data.currently.windBearing
        this.curWindGust = res.data.currently.windGust
        this.curWindSpeed = res.data.currently.windSpeed
        this.curVis = res.data.currently.visibility
        this.curSummary = res.data.currently.summary
        this.curPrecipIntensity = res.data.currently.precipIntensity
        this.curPrecipProb = res.data.currently.precipProbability
        this.curUV = res.data.currently.uvIndex
        this.nearestStormBearing = res.data.currently.nearestStormBearing
        this.nearestStormDistance = res.data.currently.nearestStormDistance
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
    },
    formatWind: function (wind) {
      if (wind >= 0 && wind <= 11.25) {
        return 'N'
      } else if (wind >= 11.26 && wind <= 33.75) {
        return 'NNE'
      } else if (wind >= 33.76 && wind <= 56.25) {
        return 'NE'
      } else if (wind >= 56.26 && wind <= 78.75) {
        return 'ENE'
      } else if (wind >= 78.76 && wind <= 101.25) {
        return 'E'
      } else if (wind >= 101.26 && wind <= 123.75) {
        return 'ESE'
      } else if (wind >= 123.76 && wind <= 146.25) {
        return 'SE'
      } else if (wind >= 146.26 && wind <= 168.75) {
        return 'SSE'
      } else if (wind >= 168.76 && wind <= 191.25) {
        return 'S'
      } else if (wind >= 191.26 && wind <= 213.75) {
        return 'SSW'
      } else if (wind >= 213.76 && wind <= 236.25) {
        return 'SW'
      } else if (wind >= 236.26 && wind <= 258.75) {
        return 'WSW'
      } else if (wind >= 258.76 && wind <= 281.25) {
        return 'W'
      } else if (wind >= 281.26 && wind <= 303.75) {
        return 'WNW'
      } else if (wind >= 303.76 && wind <= 326.25) {
        return 'NW'
      } else if (wind >= 326.26 && wind <= 348.75) {
        return 'NNW'
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
  margin-right: -14.75em !important;
}
.forecastFont{
  font-size: 1.2em
}
.high{
  color: red;
  margin-right: .5em
}
.low{
  color: blue;
}
.currentTemp{
  font-size: 5em;
  color:#1a263d;
  margin-top: .1em;
  margin-bottom: 0em;
}
.farenheitBig{
  font-size: .3em;
  position: absolute;
  margin-top: 1em;

}
.farenheitSmall{
  font-size: .6em;
  position: absolute;
  margin-top: .2em;

}
</style>
