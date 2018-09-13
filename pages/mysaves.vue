<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m12">
        <div class="card white darken-1">
          <div class="card-content black-text">
            <span class="card-title black-text">Your Saves</span>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Value</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for='datum in allData' v-bind:key='datum.id'>
                  <td>{{ datum.label }}</td>
                  <td>{{ datum.data }}</td>
                  <td>{{ datum.time }}:00</td>
                  <td>
                    <button class="btn-floating waves-effect waves-light brain" :label='datum.label' :data='datum.data' :date='datum.time' :stamp='datum.createdAt' @click='selectData($event)'><i class="fas fa-brain"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <selected-info :data='selectedData' :label='selectedLabel' :date='selectedTime' :stamp='selectedStamp'></selected-info>
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
        {rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.3.1/css/all.css'}
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
      selectedStamp: ''
    }
  },
  methods: {
    get () {
      axios.get('/api/data')
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
  },
  mounted () {
    this.get()
  }
}
</script>

<style scoped>
.container {
  margin-top: 50px;
}

.brain {
  background-color: darkkhaki;
}
</style>