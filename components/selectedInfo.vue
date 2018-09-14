<template>
  <div v-if="dataArrayCheck !== true">
    <div class="card white" v-if='data !== ""'>
      <div class="card-content black-text">
        <span class="card-title black-text">
          {{ displayLabel }}: {{ dataArray }}</span>
        <div v-if='label=="temperature"'>
          <div class="card white col s12 m6 l6">
            <div class="card-content black-text">
              <span class="card-title red-text"><i class="fas fa-thermometer-full"></i>  {{averageHighTemp[month]}}&deg;</span>
              <p v-if='tempDiff < 0'>This Temperature is {{tempDiff *= -1 }} degrees Fahrenheit higher than the monthly average high.</p>
              <p v-else>This Temperature is {{tempDiff}} degrees Fahrenheit below the monthy average high.</p>
            </div>
          </div>
          <div class="card white col s12 m6 l6">
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
              <div class="col s4 center-align">
                <h1><i class="fas fa-exclamation-circle red-text"></i></h1>
              </div>
              <div class="col s8">
                <p class="flow-text">
                  The Ozone Layer is normally between 200 and 400 Dobson Units thick. Your recorded value of {{data}} DU falls below that range.
                </p>
              </div>
            </div>
          </div>
          <div v-if='data > 200 && data < 400'>
            <div class="row">
              <div class="col s4 center-align">
                <h1><i class="fas fa-check-circle green-text"></i></h1>
              </div>
              <div class="col s8">
                <p class="flow-text">The Ozone Layer is normally between 200 and 400 Dobson Units thick. Your recorded value of {{data}} DU falls into this range.</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if='label=="uvIndex"'>
          <div class="row">
            <div class="col s12">
              <div class="w3-border w3-round w3-xlarge" style="height:30px;">
                <div :style='uvIndexProg.css' class="w3-round w3-center w3-container"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col s12" v-if='data <=2'>
              <p class="flow-text">This is a low ultraviolet index. Wear sunglasses if it's bright.</p>
              <div class="card white">
                <div class="card-content black-text">
                  <span class="card-title green-text"><h4><i class="fas fa-sun"></i></h4></span>
                  <p>Apply SPF 30+ sunscreen and cover up if you burn easily.</p>
                </div>
              </div>
            </div>
            <div class="col s12" v-if='data > 2 && data <= 5'>
              <p class="flow-text">This is a moderate ultraviolet index. Try to keep out of the sun during the midday hours.</p>
              <div class="card white">
                <div class="card-content black-text">
                  <span class="card-title yellow-text"><h4><i class="fas fa-sun"></i></h4></span>
                  <p>Apply SPF 30+ sunscreen every two hours, even when cloudy.</p>
                </div>
              </div>
            </div>
            <div class="col s12" v-if='data > 5 && data <=7'>
              <p class="flow-text">This is a high ultraviolet index. Unprotected skin and eyes are subject to damage.</p>
              <div class="card white">
                <div class="card-content black-text">
                  <span class="card-title orange-text"><h4><i class="fas fa-sun"></i></h4></span>
                  <p>Generouly apply SPF 30+ sunscreen every two hours, even on cloudy days. Wear UV-blocking sunglasses.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col s12" v-if='data > 7 && data <= 10'>
            <p class="flow-text">This is a very high ultraviolet index. Take extra precaution as skin and eyes can burn very quickly. Minimize sun exposure during daylight hours.</p>
            <div class="card white">
              <div class="card-content black-text">
                <span class="card-title red-text"><h4><i class="fas fa-sun"></i></h4></span>
                <p>Generouly apply broad spectrum SPF 30+ sunscreen every two hours, even if cloudy.</p>
              </div>
            </div>
          </div>
          <div class="col s12" v-if='data > 10'>
          <p class="flow-text">This is an extreme ultraviolet index. Take all precautions as skin and eyes can burn within minutes. Avoid any sun exposure.</p>
            <div class='card white'>
              <div class="card-content black-text">
                <span class="card-title purple-text"><h4><i class="fas fa-sun"></i></h4></span>
                <p>Generouly apply broad spectrum SPF 30+ sunscreen every two hours, even if cloudy. Wear protective clothing and sunglasses.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="row">
      <div class="col s12">
        <div class="card white">
          <div class="card-content black-text">
            <span class="card-title black-text">Data Array for: {{ displayLabel }}</span>
            <hr>
            <div v-if='displayLabel === "PrecipIntensity"'>
              <div class="row">
                <div class="col s4">
                  <p class="center flow-text">In the next 48 hours, {{ cumulativeRainfall }}" of rain are expected to fall in the area of this recording.</p>
                </div>
                <div class="col s4">
                  <div :style='this.rainfallBarCSS.css' class="w3-round-large">
                    <div class="w3-grey" :style='rainfallBarCSS.percent'></div>
                  </div>
                </div>
                <div class="col s4">
                  <p class="center flow-text">
                    <span v-if="cumulativeRainfall < 4.8">This is considered a low amount of rainfall.</span>
                    <span v-if="cumulativeRainfall > 4.8 && cumulativeRainfall <= 14.4">This is considered a medium amount of rainfall.</span>
                    <span v-else>This is considered a large amount of rainfall.</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="row">
                <h4 class="center">Hour by hour:</h4>
                <div class="col s12 m4 l4">
                  <div class="card white analytic">
                    <div class="card-content black-text">
                      <span class="card-title center green-text"><h3><i class="fas fa-caret-up"></i></h3></span>
                      <h5 class="center">Highest:</h5>
                      <span class="flow-text center span">{{columnAnalysis.min}}</span>
                      <span class="display:inline;">
                        <span class="flow-text" v-if='selectOperand=="deg"'>&deg; F</span>
                        <span v-else> {{selectOperand}}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col s12 m4 l4">
                  <div class="card white analytic">
                    <div class="card-content black-text">
                      <span class="card-title center red-text"><h3><i class="fas fa-caret-down"></i></h3></span>
                      <h5 class="center">Lowest:</h5>
                      <span class="flow-text center">{{columnAnalysis.min}}</span>
                      <span class="display:inline;">
                        <span class="flow-text" v-if='selectOperand=="deg"'>&deg; F</span>
                        <span v-else> {{selectOperand}}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col s12 m4 l4">
                  <div class="card white analytic">
                    <div class="card-content black-text">
                      <span class="card-title center blue-text"><h3><i class="fas fa-bullseye"></i></h3></span>
                      <h5 class="center">Average:</h5>
                      <span class="flow-text center">{{columnAnalysis.min}}</span>
                      <span class="display:inline;">
                        <span class="flow-text" v-if='selectOperand=="deg"'>&deg; F</span>
                        <span v-else> {{selectOperand}}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
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
      ],
      user: '',
      operands: {
        wind: 'mph',
        temp: 'deg',
        rain: '"',
        ozone: 'DU'
      }
    }
  },
  computed: {
    uvIndexProg () {
      let ind = this.data - 1
      let colors = ['#4b9229', '#4b9229', '#f5e34c', '#f5e34c', '#f5e34c', '#e7632a', 'e7632a', '#c72923', '#c72923', 'c72923', '#654fc1']
      let color = colors[ind]
      return {
        css: 'height:24px;width:' + this.data.toString() + '0%;background-color:' + color + ';height:30px;'
      }
    },
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
    },
    dataArray () {
      let arr = this.data.split('-')
      if (arr.length <= 1) {
        return arr.join('')
      } else {
        return arr
      }
    },
    dataArrayCheck () {
      let arr = this.data.split('-')
      if (arr.length <= 1) {
        return false
      } else {
        return true
      }
    },
    cumulativeRainfall () {
      if (this.label === 'precipIntensity') {
        let counter = 0
        for (let i = 0; i < this.dataArray.length; i++) {
          counter += parseFloat(this.dataArray[i])
        }
        return counter.toFixed(2)
      }
    },
    rainfallBarCSS () {
      let percent = 100 - parseInt(this.cumulativeRainfall / 25 * 100)
      if (this.cumulativeRainfall <= 4.8) {
        return {
          css: 'height:200px;width:24px;margin-left:40%;background:linear-gradient(#4286f4, #373B44)',
          percent: 'width:24px;height:' + percent + '%'
        }
      } else if (this.cumulativeRainfall <= 14.4) {
        return {
          css: 'height:200px;width:24px;margin-left:40%;background:linear-gradient(#4286f4, #373B44)',
          percent: 'width:24px;height:' + percent + '%'
        }
      } else {
        return {
          css: 'height:200px;width:24px;margin-left:36%;background:linear-gradient(#4286f4, #373B44)',
          percent: 'width:24px;height:' + percent + '%'
        }
      }
    },
    columnAnalysis () {
      let sum = 0
      for (let i = 0; i < this.dataArray.length; i++) {
        sum += parseFloat(this.dataArray[i])
      }
      return {
        max: Math.max.apply(null, this.dataArray).toFixed(2),
        min: Math.min.apply(null, this.dataArray).toFixed(2),
        average: (sum / this.dataArray.length).toFixed(2)
      }
    },
    selectOperand () {
      if (this.label === 'apparentTemp' || this.label === 'temperature') {
        return this.operands.temp
      } else if (this.label === 'windSpeed' || this.label === 'windGust') {
        return this.operands.wind
      } else if (this.label === 'ozone') {
        return this.operands.ozone
      } else if (this.label === 'precipIntensity') {
        return this.operands.rain
      }
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
  .analytic {
    text-align: center;
  }
</style>
