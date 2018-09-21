<script>
import { Scatter } from 'vue-chartjs'

export default {
  extends: Scatter,
  props: ['xAxis', 'yAxis'],
  mounted () {
    this.createChart()
  },
  computed: {
    allData () {
      let arrOne = this.xAxis.value.split(',')
      let arrTwo = this.yAxis.value.split(',')
      let arrData = []
      for (let i = 0; i < arrOne.length; i++) {
        let datum = {
          x: parseFloat(arrOne[i]),
          y: parseFloat(arrTwo[i])
        }
        arrData.push(datum)
      }
      return arrData
    }
  },
  methods: {
    createChart () {
      this.renderChart({
        datasets: [
          {
            label: 'Pearson\'s Correlation Coefficient',
            data: this.allData,
            borderColor: '#1c263b',
            backgroundColor: '#1c263b'
          }
        ]
      }, {
        responsive: true
      })
    }
  }
}
</script>