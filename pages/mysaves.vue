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
                  <td>{{ datum.createdAt }}</td>
                  <td>
                    <a class="btn-floating waves-effect waves-light brain" :label='datum.label' :data='datum.data' @click='selectData($event)'><i class="fas fa-brain"></i></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!--<selected-info :data='selectData' :label='selectedLabel'></selected-info>-->
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
      selectedData: null,
      selectedLabel: null
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
        let checkPM = false
        let formattedTime = []
        let x = this.allData[i].createdAt
        let broken = x.split('T')
        let time = broken[1].split(':')
        let hour = time[0] - 12
        if (hour < 0) {
          checkPM = true
          hour *= -1
        }
        let ampm
        if (!checkPM) {
          ampm = 'PM'
        } else {
          ampm = 'AM'
        }
        let finalTime = hour + ':' + time[1] + ' ' + ampm
        formattedTime.push(finalTime)
        formattedTime.push(broken[0])
        this.allData[i].createdAt = formattedTime.join(', ')
      }
    },
    selectData (event) {
      let elem = event.currentTarget
      console.log(elem)
      let label = elem.getAttribute('label')
      let data = elem.getAttribute('data')
      this.selectData = data
      this.selectedLabel = label
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