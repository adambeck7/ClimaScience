<template>
  <div>
    <div class="icon-bar" id="savelink" v-if="ran">
      <a href='/mysaves'><i class=" fa fa-flask"></i></a> 
    </div>
    <div class="container">
      <div class="row">
        <div class="col s12">
          <h2 class='center header text_h2'>The next 48 hours of weather data, visualized.</h2>
          <div class="input-field col s12 l6 offset-l3">
            <a class="waves-effect waves-light btn" id="getloc" @click="getLocation"> Use my Location</a>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s4">
          <input class="validate" type="text" v-model='lat' id="lat"/>
          <label for="lat" class="label active">Latitude</label>
        </div>
        <div class="input-field col s4">
          <input class="validate" type="text" id="lng" v-model="lng"/>
          <label for="lng" class="label active">Longitude</label>
        </div>
        <div class="input-field col s4">
          <input class="validate" type="text" v-model="user" id="user"/>
          <label for="user" class="label">Username</label>
        </div>
      </div>
      <div class="row">
        <div v-for="option in options" v-bind:key="option" class="input-field col m4 s6 l3">
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
              <td v-for="item in weatherData" v-bind:key="item" :data='item.data[ind]' :label='item.label' :index='ind' @click='getDatum'><p>{{ item.data[ind] }}</p></td>
            </tr>
          </tbody>
        </table>
      </div>
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
      selected: [],
      user: ''
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
    },
    getDatum (event) {
      let element = event.currentTarget
      let data = element.getAttribute('data')
      let label = element.getAttribute('label')
      let time = parseInt(element.getAttribute('index'))
      console.log(time)
      axios.post(('/api/data/' + this.user), {
        data: data,
        label: label,
        time: time,
        user: this.user
      })
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error)
        })
      let icon = document.getElementById('savelink')
      icon.classList.add('pop')
      icon.addEventListener('webkitAnimationEnd', () => {
        icon.classList.remove('pop')
      })
    }
  }
}
</script>

<style>
td p:hover {
  text-decoration: underline;
  cursor: pointer;
}

#getloc {
  width: 100%;
  color: #1c263b;
  background-color: darkkhaki
}

@keyframes extend {
  0% {width: 50.578px; background-color: #d4483e}
  50% {width: 65px; background-color: maroon}
  100% {width: 50.578px; background-color: #d4483e}
}

.icon-bar {
  position: fixed;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  background-color: #d4483e;
  z-index: 10;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
}

.icon-bar a {
  display: block;
  text-align: center;
  padding: 16px;
  transition: all .03 ease;
  color: white;
  font-size: 20px;
}

.pop {
  animation-duration: 1s;
  animation-name: extend;
}

</style>
