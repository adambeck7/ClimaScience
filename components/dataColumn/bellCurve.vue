<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['xAxis', 'yAxis', 'standardDeviation', 'mean'],
  data () {
    return {
      labels: this.xAxis
    }
  },
  computed: {
    values () {
      let realXAxis = []
      for (let i = 0; i < this.xAxis.length; i++) {
        let val = (parseFloat(this.mean) + (this.xAxis[i] * parseFloat(this.standardDeviation))).toFixed(2)
        realXAxis.push(val)
      }
      return realXAxis
    }
  },
  mounted () {
    this.createChart()
  },
  methods: {
    createChart () {
      this.renderChart({
        labels: this.values,
        datasets: [
          {
            label: 'Histogram',
            data: this.yAxis,
            backgroundColor: '#d4c66d'
          }
        ]
      }, {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              min: 0
            }
          }]
        }
      })
    }
  }
}
</script>