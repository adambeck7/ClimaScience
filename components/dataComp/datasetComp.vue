<template>
  <div>
    <div class="row">
      <div class="col s12">
        <h4 class="center">Correlation Coefficient:</h4>
        <div class="card-panel center" :style="corrColor.style">
          <span class="white-text">{{correlation}}</span>
        </div>
      </div>
    </div>
    <correlation-chart :xAxis='dataOne' :yAxis='dataTwo'/>
    <p v-if='corrColor.type = "strong-pos"'></p>
  </div>
</template>

<script>
/* eslint-disable */
import correlationChart from '~/components/dataComp/correlationChart'

export default {
  components: {
    correlationChart
  },
  props: ['dataOne', 'dataTwo'],
  computed: {
    dataArrayOne () {
      let arr = this.dataOne.value.split(',')
      for (let i = 0; i < arr.length; i++) {
        arr[i] = parseFloat(arr[i])
      }
      return arr
    },
    dataArrayTwo () {
      let arr = this.dataTwo.value.split(',')
      for (let i = 0; i < arr.length; i++) {
        arr[i] = parseFloat(arr[i])
      }
      return arr
    },
    dOneCalc () {
      let sum = 0
      for (let i = 0; i < this.dataArrayOne.length; i++) {
        sum += this.dataArrayOne[i]
      }
      let mean = sum / this.dataArrayOne.length
      let sdSum = 0
      for (let k = 0; k < this.dataArrayOne.length; k++) {
        sdSum += Math.pow(parseFloat(this.dataArrayOne[k]) - mean, 2)
      }
      let meanDiffSqu = sdSum / this.dataArrayOne.length
      let standardDeviation = Math.sqrt(meanDiffSqu).toFixed(2)
      return {
        mean: mean,
        standardDeviation: standardDeviation
      }
    },
    dTwoCalc () {
      let sum = 0
      for (let i = 0; i < this.dataArrayTwo.length; i++) {
        sum += this.dataArrayTwo[i]
      }
      let mean = sum / this.dataArrayTwo.length
      let sdSum = 0
      for (let k = 0; k < this.dataArrayTwo.length; k++) {
        sdSum += Math.pow(parseFloat(this.dataArrayTwo[k]) - mean, 2)
      }
      let meanDiffSqu = sdSum / this.dataArrayTwo.length
      let standardDeviation = Math.sqrt(meanDiffSqu).toFixed(2)
      return {
        mean: mean,
        standardDeviation: standardDeviation
      }
    },
    correlation () {
      let sum = 0
      for (let i = 0; i < this.dataArrayOne.length; i++) {
        let xMinusXMean = this.dataArrayOne[i] - this.dOneCalc.mean
        let yMinusyMean = this.dataArrayTwo[i] - this.dTwoCalc.mean
        let res = xMinusXMean * yMinusyMean
        sum += res
      }
      let sdMult = this.dOneCalc.standardDeviation * this.dTwoCalc.standardDeviation
      let sumDiv = sum / sdMult
      let nMinusOne = this.dataArrayOne.length - 1
      let r = (sumDiv / nMinusOne).toFixed(2)
      if (r > 1) {
        r = 1
      }
      return r
    },
    corrColor () {
      if (this.correlation < -.75) {
        return {
          style: 'background-color: darkred;',
          type: 'strong-neg'
        }
      } else if (this.correlation >= -.75 && this.correlation <= -.25) {
        return {
          style: 'background-color: red;',
          type: 'neg'
        }
      } else if (this.correlation <= -.1 && this.correlation > -.25) {
        return {
          style: 'background-color: indianred;',
          type: 'mild-neg'
        }
      } else if (this.correlation >= -.1 && this.correlation <= .1) {
        return {
          style: 'background-color: grey;',
          type: 'none'
        }
      } else if (this.correlation > .1 && this.correlation <= .25) {
        return {
          style: 'background-color: lightgreen;',
          type: 'mild-pos'
        }
      } else if (this.correlation > .25 && this.correlation <= .75) {
        return {
          style: 'background-color: green;',
          type: 'pos'
        }
      } else {
        return {
          style: 'background-color: darkgreen;',
          type: 'strong-pos'
        }
      } 
    }
  }
}
</script>

<style scoped>
</style>