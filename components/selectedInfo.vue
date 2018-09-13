<template>
  <div class="card white" v-if='data !== ""'>
    <div class="card-content black-text">
      <span class="card-title black-text">
        {{ displayLabel }}: {{ data }}</span>
      <div v-if='label=="temperature"'>
        <div class="card white col s6">
          <div class="card-content black-text">
            <span class="card-title red-text"><i class="fas fa-thermometer-full"></i>  {{averageHighTemp[month]}}&deg;</span>
            <p v-if='tempDiff < 0'>This Temperature is {{tempDiff *= -1 }} degrees Fahrenheit higher than the monthly average high.</p>
            <p v-else>This Temperature is {{tempDiff}} degrees Fahrenheit below the monthy average high.</p>
          </div>
        </div>
        <div class="card white col s6">
          <div class="card-content black-text">
            <span class="card-title blue-text"><i class="fas fa-thermometer-empty"></i>  {{averageLowTemp[month]}}&deg;</span>
            <p v-if='tempDiffLow < 0'>This Temperature is {{tempDiffLow *= -1}} degrees Fahrenheit higher than the monthly average low.</p>
            <p v-else>This Temperature is {{tempDiffLow}} degrees Fahrenheit lower than the monthly average low.</p>
          </div>
        </div>
        <p v-if='day'><i class="fas fa-exclamation-triangle"></i> This value was recorded during the day, and is more likely to exceed the monthly average.</p>
        <p v-else><i class="fas fa-exclamation-triangle"></i> This value was recorded during the night, and is more likely to be below the monthly averages.</p>
      </div>
      <div v-if='label=="dewPoint"'>
        <p>Dew Point Data!</p>
      </div>
      <div v-if='label=="cloudCover"'>
        <p>Cloud Cover!</p>
      </div>
      <!--$$$$$$$$$$$$$$$$$$$$$$$$$$$$$-->
      <div v-if='label=="ozone"'>
        <div v-if='data < 200'>
          <div class="row">
            <div class="col s4">
              <h3><i class="fas fa-exclamation-circle red-text"></i></h3>
            </div>
            <div class="col s8">
              <p>
                The Ozone Layer is normally between 200 and 400 Dobson Units thick. Your recorded value of {{data}} DU falls below that range.
              </p>
            </div>
          </div>
        </div>
        <div v-if='data > 200 && data < 400'>
          <div class="row">
            <div class="col s4">
              <h3><i class="fas fa-check-circle green-text"></i></h3>
            </div>
            <div class="col s8">
              <p>The Ozone Layer is normally between 200 and 400 Dobson Units thick. Your recorded value of {{data}} DU falls into this range.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
      <!--$$$$$$$$$$$$$$$$$$$$$$$$$$$$$-->
    <div v-if='label=="precipProbability"'>
      <p>precipProbability!</p>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: ['data', 'label', 'date', 'stamp'],
  data () {
    return {
      ozone: {
        check: false,
        high: 500,
        low: 300,
        average: 400
      },
      averageLowTemp: [
        16,
        19,
        25,
        32,
        41,
        49,
        55,
        52,
        44,
        33,
        23,
        17
      ],
      averageHighTemp: [
        47,
        50,
        56,
        62,
        72,
        83,
        88,
        86,
        79,
        68,
        54,
        48
      ]
    }
  },
  computed: {
    ozoneDiff () {
      return this.ozone.average - this.data
    },
    tempDiff () {
      return (this.averageHighTemp[this.month] - this.data).toFixed(2)
    },
    tempDiffLow () {
      return (this.averageLowTemp[this.month] - this.data).toFixed(2)
    },
    month () {
      return parseInt(this.stamp.split('-')[1]) - 1
    },
    day () {
      if (this.date > 0 && this.date <= 6) {
        return false
      } else if (this.date > 6 && this.date < 20) {
        return true
      } else {
        return false
      }
    },
    displayLabel () {
      let labelSplit = this.label.split('')
      let upper = labelSplit[0].toUpperCase()
      labelSplit[0] = upper
      return labelSplit.join('')
    }
  },
  updated () {
    this.checkType()
  },
  methods: {
    checkType () {
      console.log(this.label)
    }
  }
}
</script>

<style>
</style>