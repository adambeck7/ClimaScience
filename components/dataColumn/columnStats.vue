<template>
  <div>
    <h4>{{label}}</h4>
    <div class="chart-container">
      <bell-curve :xAxis="barsForHistogram.xAxis" :yAxis="barsForHistogram.yAxis"/>
    </div>
  </div>
</template>

<script>
  import bellCurve from './bellcurve'

  export default {
    props: ['value', 'label', 'time', 'stamp'],
    components: {
      bellCurve
    },
    data () {
      return {
        ran: false
      }
    },
    computed: {
      dataArray () {
        let arr = this.value.split(',')
        for (let i = 0; i < arr.length; i++) {
          arr[i] = parseFloat(arr[i])
        }
        return arr
      },
      mean () {
        let sum = 0
        for (let i = 0; i < this.dataArray.length; i++) {
          sum += this.dataArray[i]
        }
        return (sum / this.dataArray.length).toFixed(2)
      },
      max () {
        return Math.max.apply(null, this.dataArray)
      },
      min () {
        return Math.min.apply(null, this.dataArray)
      },
      standardDeviation () {
        let mean = this.mean
        let sdSum = 0
        for (let k = 0; k < this.dataArray.length; k++) {
          sdSum += Math.pow(parseFloat(this.dataArray[k]) - mean, 2)
        }
        let meanDiffSqu = sdSum / this.dataArray.length
        let standardDeviation = Math.sqrt(meanDiffSqu).toFixed(2)
        this.ran = true
        return standardDeviation
      },
      standardDeviationsByValue () {
        // initializing a blank array to fill with integer values.
        let standardDeviations = []
        for (let i = 0; i < this.dataArray.length; i++) {
          // calc for distance to mean-if positive, value is higher than mean.
          let dToMean = this.dataArray[i] - this.mean
          // calculate the number of standard deviations away from the mean based on how many SDs dToMean is divisible by.
          let numberSigmasFromMean = Math.floor(dToMean / this.standardDeviation)
          standardDeviations.push(numberSigmasFromMean)
        }
        return standardDeviations
      },
      barsForHistogram () {
        // Defining a blank object
        let res = {}
        // iterating through standardDevsList
        for (let i = 0; i < this.standardDeviationsByValue.length; i++) {
          // if the object does not include a key with this value...
          if (!res[this.standardDeviationsByValue[i]]) {
            // create said key and provide it a value of 0.
            res[this.standardDeviationsByValue[i]] = 0
          }
          // Increment the value by occurrence in the array.
          res[this.standardDeviationsByValue[i]]++
        }
        // objects are by their nature unsorted, and we need sorted data, so...
        let arr = []
        // for each key in res...
        for (let key in res) {
          // create an xAxis / yAxis object
          let arrKey = {
            xAxis: parseInt(key),
            yAxis: res[key]
          }
          // and push it to an array, which can be sorted.
          arr.push(arrKey)
        }
        // so here, we go ahead and sort it.
        let sortedAxes = arr.sort((a, b) => { return a.xAxis - b.xAxis })
        // define two more arrays
        let xAxisValues = []
        let yAxisValues = []
        // iterate through the sorted array
        for (let j = 0; j < sortedAxes.length; j++) {
          // push each x and y value to the subarrays
          xAxisValues.push(sortedAxes[j].xAxis)
          yAxisValues.push(sortedAxes[j].yAxis)
        }
        // and return two axes that can be plugged directly into chartjs.
        return {
          xAxis: xAxisValues,
          yAxis: yAxisValues
        }
      }
    }
  }
</script>

<style scoped>
  .chart-container {
    max-width: 200px;
  }
</style>