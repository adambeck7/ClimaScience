<template>
  <div class="container">
    <div class="row">
      <div class="col s12">
        <h2 class='center header text_h2'>The next 48 hours of weather data, visualized.</h2>
        <div class="input-field col s4">
          <a class="waves-effect waves-light btn" @click="getLocation"> Use my Location</a>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s6">
        <input class="validate" type="text" v-model='lat' id="lat"/>
        <label for="lat" class="label">Latitude</label>
      </div>
      <div class="input-field col s6">
        <input class="validate" type="text" id="lng" v-model="lng"/>
        <label for="lng" class="label">Longitude</label>
      </div>
    </div>
    <div class="row">
      <div v-for="option in options" v-bind:key="option" class="input-field col s4">
        <input type="checkbox" :value="option" :id="option" v-model="selected" @click='go'/>
        <label :for="option">{{ option }}</label>
      </div>
    </div>
    <div class="row">
      <temp v-if="ran" :data='weatherData' :time='time'/>
    </div>
    <div class="row">
      <table class="striped">
        <thead>
          <tr>
            <th>Time</th>
            <th v-for="select in selected" v-bind:key="select">{{ select }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ind in indeces"  v-bind:key="ind">
            <td>{{ time[ind] }}</td>
            <td v-for="item in weatherData" v-bind:key="item" :data='item.data[ind]' :label='item.label' @click='getDatum'>{{ item.data[ind] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Temp from '~/components/Temp'

export default {
  components: { Temp },
  data () {
    return {
      weatherData: [],
      time: [],
      indeces: [],
      lat: '',
      lng: '',
      ran: false,
      options: ['apparentTemperature', 'cloudCover', 'dewPoint', 'humidity', 'ozone', 'precipIntensity', 'precipProbability', 'pressure', 'temperature', 'uvIndex', 'visibility', 'windGust', 'windSpeed'],
      colors: ['#800000', '#FF0000', '#FFA500', '#FFFF00', '#008000', '#800080', '#008080', '#0000FF', '#000080', '#808000', '#FF00FF', '#00FFFF', '#00FF00'],
      selected: []
    }
  },
  methods: {
    go () {
      this.ran = false
      this.weatherData = []
      axios.get('/api/loc/' + this.lat + ',' + this.lng).then((res) => {
        let ind = -1
        let formattedTime = []
        // for each checkbox selected...
        for (let j = 0; j < this.selected.length; j++) {
          //  this is what we need to pass to the child element, dynamically creating the label, background color, and data from the selected array.
          let dataToPass = {
            //  the data label is the name of the selected variable.
            label: this.selected[j],
            //  figure this out in a second...
            borderColor: this.colors[j],
            //  Here we go. dataToPass.data is an empty array...
            data: []
          }
          for (let i = 0; i < res.data.hourly.data.length; i++) {
            let datum = res.data.hourly.data[i][this.selected[j]]
            dataToPass.data.push(datum)
          }
          this.weatherData.push(dataToPass)
        }
        for (let k = 0; k < res.data.hourly.data.length; k++) {
          let time = new Date(res.data.hourly.data[k].time * 1000)
          let hours = time.getHours()
          let minutes = '0' + time.getMinutes()
          let formatted = hours + ':' + minutes
          formattedTime.push(formatted)
          ind++
          this.indeces.push(ind)
        }

        this.time = formattedTime
        this.ran = true
      }).catch(error => {
        error({statusCode: 404, message: 'Data not found'})
      })
    },
    getLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition)
      } else {
        console.warn('Geolocation not supported.')
      }
    },
    showPosition (position) {
      this.lat = position.coords.latitude
      this.lng = position.coords.longitude
      let labels = document.getElementsByClassName('label')
      labels[0].classList.add('active')
      labels[1].classList.add('active')
    },
    getDatum (event) {
      let element = event.currentTarget
      let data = element.getAttribute('data')
      let label = element.getAttribute('label')
      axios.post('/api/data', {
        data: data,
        label: label
      })
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>