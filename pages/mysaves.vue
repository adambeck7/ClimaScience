<template>
  <div class="container" id="main">
    <div class="row">
      <div class="input-field col s6">
        <input class="validate" type="text" v-model='user' id="user"/>
        <label for="user">User</label>
      </div>
      <a class="btn waves-effect waves-light red darken-1" @click="get()">Go</a>
    </div>
    <div class="row">
      <div class="col s12 l6">
        <div class="card white darken-1">
          <div class="card-content black-text">
            <span class="card-title black-text">Your Saves</span>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Value</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for='datum in allData' v-bind:key='datum.id'>
                  <td>{{ datum.label }}</td>
                  <td>
                    <p v-if="datum.data.split('-').length > 1">Data Array</p>
                    <p v-else>{{ datum.data }}</p>
                  </td>
                  <td>{{ datum.time }}:00</td>
                  <td>
                    <a class="btn-floating waves-effect waves-light red darken-1" :label='datum.label' :data='datum.data' :date='datum.time' :stamp='datum.createdAt' @click='selectData($event)'><i class="far fa-lightbulb"></i></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col s12 l6">
        <selected-info :data='selectedData' :label='selectedLabel' :date='selectedTime' :stamp='selectedStamp'></selected-info>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import selectedInfo from '~/components/selectedInfo.vue'

export default {
  head () {
    return {
      title: 'Your Data Saves',
      link: [
        {rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.3.1/css/all.css'},
        {rel: 'stylesheet', href: 'https://www.w3schools.com/w3css/4/w3.css'}
      ]
    }
  },
  components: {
    selectedInfo
  },
  data () {
    return {
      allData: [],
      selectedData: '',
      selectedLabel: '',
      selectedTime: '',
      selectedStamp: '',
      user: ''
    }
  },
  methods: {
    get () {
      axios.get(('/api/data/' + this.user))
        .then(res => {
          this.allData = res.data
          this.timestamp()
        })
        .catch(error => {
          console.log(error)
        })
    },
    timestamp () {
      for (let i = 0; i < this.allData.length; i++) {
        let timeMod = this.allData[i].time
        let currentHour = new Date()
        let hour = currentHour.getHours()
        let actualHour = hour + timeMod
        if (actualHour >= 48) {
          actualHour -= 48
        } else if (actualHour >= 24) {
          actualHour -= 24
        }
        this.allData[i].time = actualHour
      }
    },
    selectData (event) {
      let elem = event.currentTarget
      let data = elem.getAttribute('data')
      let label = elem.getAttribute('label')
      let date = elem.getAttribute('date')
      let stamp = elem.getAttribute('stamp')
      this.selectedData = data
      this.selectedLabel = label
      this.selectedTime = date
      this.selectedStamp = stamp
    }
  }
}
</script>

<style>
body, html {
  font-family: 'Roboto', sans-serif !important;
}

#main {
  margin-top: 30px;
}

.brain {
  background-color: darkkhaki !important;
}
</style>