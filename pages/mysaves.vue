<template>
  <div class="row" id="container">
    <div id="alldata">
      <a class="btn-flat waves-effect expand" @click="expandSelection"><i class="fas fa-expand-arrows-alt"></i></a>
      <div v-for="datum in allData" v-bind:key="datum.index">
        <a class="first-tab tab" v-if='datum.data.length === 1' @click="dataClick($event)" :data="datum.data" :label="datum.label" :time="datum.time" :stamp="datum.createdAt" :index="allData.indexOf(datum)">
          <h5>{{datum.data[0]}}</h5>
          <p>{{datum.label}}</p>
        </a>
        <a class="first-tab tab" href="#" v-else @click="dataClick($event)" :data="datum.data" :label="datum.label" :time='datum.time' :stamp="datum.createdAt" :index="allData.indexOf(datum)">
          <h5>Data Array</h5>
          <p>{{datum.label}}</p>
          <p>{{datum.time}}:00</p>
        </a>
      </div>
    </div>
    <div id="selected">
      <a class="btn-flat waves-effect expand" @click="expandSelection"><i class="fas fa-expand-arrows-alt"></i></a>
      <div v-if="firstDatumIndex !== null" class="select">
        <div v-if="firstDatum.value.split(',').length < 2">
          <uv-index v-if='firstDatum.label === "uvIndex"' :value='firstDatum.value' :label='firstDatum.label' :time='firstDatum.time' :stamp='firstDatum.stamp'/>
        </div>
        <div v-if="firstDatum.value.split(',').length >= 2">
          <column-stats :value='firstDatum.value' :label='firstDatum.label' :time='firstDatum.time' :stamp='firstDatum.stamp'/>
        </div>
      </div>
      <div v-if="secondDatumIndex !== null" class="select">
        <div v-if="secondDatum.value.split(',').length < 2">
          <uv-index v-if='secondDatum.label === "uvIndex"' :value='secondDatum.value' :label='secondDatum.label' :time='secondDatum.time' :stamp='secondDatum.stamp'/>
        </div>
        <div v-if="secondDatum.value.split(',').length >= 2">
          <column-stats :value='secondDatum.value' :label='secondDatum.label' :time='secondDatum.time' :stamp='secondDatum.stamp'/>
        </div>
      </div>
    </div>
    <div id="compared">
      <a class="btn-flat waves-effect expand" @click="expandSelection"><i class="fas fa-expand-arrows-alt"></i></a>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import uvIndex from '~/components/singleDataModules/uvIndex.vue'
import columnStats from '~/components/dataColumn/columnStats.vue'

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
    uvIndex,
    columnStats
  },
  data () {
    return {
      allData: [],
      firstDatum: {
        label: '',
        value: '',
        stamp: '',
        time: ''
      },
      secondDatum: {
        label: '',
        value: '',
        stamp: '',
        time: ''
      },
      user: null,
      clickCount: 0,
      lastClicked: null,
      firstDatumIndex: null,
      secondDatumIndex: null
    }
  },
  methods: {
    get () {
      axios.get(('/api/data/' + this.user))
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].data = res.data[i].data.split('-')
          }
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
    dataClick (event) {
      if (this.clickCount === 0) {
        this.firstDatumIndex = event.currentTarget.getAttribute('index')
        let elemOne = event.currentTarget
        this.firstDatum.label = elemOne.getAttribute('label')
        this.firstDatum.value = elemOne.getAttribute('data')
        this.firstDatum.stamp = elemOne.getAttribute('stamp')
        this.firstDatum.time = elemOne.getAttribute('time')
        elemOne.classList.add('firstborder')
        this.clickCount++
      } else if (this.clickCount === 1) {
        if (event.currentTarget.getAttribute('index') === this.firstDatumIndex) {
          this.firstDatumIndex = null
          event.currentTarget.classList.remove('firstborder')
          this.firstDatum.label = ''
          this.firstDatum.value = ''
          this.firstDatum.stamp = ''
          this.firstDatum.time = ''
          this.clickCount--
        } else if (event.currentTarget.getAttribute('index') === this.secondDatumIndex) {
          this.secondDatum.label = ''
          this.secondDatum.value = ''
          this.secondDatum.stamp = ''
          this.secondDatum.time = ''
          event.currentTarget.classList.remove('secondborder')
          this.clickCount--
          this.secondDatumIndex = null
        } else {
          if (this.firstDatumIndex !== null) {
            this.secondDatumIndex = event.currentTarget.getAttribute('index')
            let elemTwo = event.currentTarget
            this.secondDatum.label = elemTwo.getAttribute('label')
            this.secondDatum.value = elemTwo.getAttribute('data')
            this.secondDatum.stamp = elemTwo.getAttribute('stamp')
            this.secondDatum.time = elemTwo.getAttribute('time')
            elemTwo.classList.add('secondborder')
            this.clickCount++
          } else {
            this.firstDatumIndex = event.currentTarget.getAttribute('index')
            let elemOne = event.currentTarget
            this.firstDatum.label = elemOne.getAttribute('label')
            this.firstDatum.value = elemOne.getAttribute('data')
            this.firstDatum.stamp = elemOne.getAttribute('stamp')
            this.firstDatum.time = elemOne.getAttribute('time')
            elemOne.classList.add('firstborder')
            this.clickCount++
          }
        }
      } else {
        if (event.currentTarget.getAttribute('index') === this.secondDatumIndex) {
          this.secondDatum.label = ''
          this.secondDatum.value = ''
          this.secondDatum.stamp = ''
          this.secondDatum.time = ''
          event.currentTarget.classList.remove('secondborder')
          this.clickCount--
          this.secondDatumIndex = null
        }
        if (event.currentTarget.getAttribute('index') === this.firstDatumIndex) {
          this.firstDatumIndex = null
          event.currentTarget.classList.remove('firstborder')
          this.firstDatum.label = ''
          this.firstDatum.value = ''
          this.firstDatum.stamp = ''
          this.firstDatum.time = ''
          this.clickCount--
        }
      }
    },
    expandSelection (event) {
      let elem = event.currentTarget
      let selectDiv = elem.parentElement
      if (selectDiv.classList.contains('expanded')) {
        selectDiv.classList.remove('expanded')
      } else {
        selectDiv.classList.add('expanded')
      }
    }
  },
  mounted () {
    let user = window.localStorage.getItem('user')
    if (user !== null) {
      let nickname = JSON.parse(user).nickname
      this.user = nickname
      this.get()
    }
  }
}
</script>

<style scoped>
#container {
  display: flex;
  height: 650px;
}

#alldata, #selected, #compared {
  flex: 1;
  border: 1px lightgray solid;
}

.expanded {
  flex: 2 !important;
}

.expand i {
  font-size: 12px;
}

.expand {
  float: right;
}

.tab {
  clear: both;
  padding: 8px;
}

.firstborder {
  border-left: 8px solid #1c263b
}

.secondborder {
  border-left: 8px solid #d4c66d
}

h5 {
  font-size: 18px;
}

p {
  font-size: 14px;
}

.select {
  clear: both;
  position: relative;
  height: 47.3%;
  overflow: scroll;
  border-bottom: 1px lightgray solid;
  border-top: 1px lightgray solid;
  padding: 10px;
}
</style>
