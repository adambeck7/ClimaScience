<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['xAxis', 'yAxis'],
  data () {
    return {
      labels: this.xAxis
    }
  },
  computed: {
    arr () {
      for (let i = 0; i < this.standardDeviations.length; i++) {
        this.standardDeviations[i] = parseFloat(this.standardDeviations[i])
      }
    }
  },
  mounted () {
    this.createChart()
  },
  methods: {
    createChart () {
      this.renderChart({
        labels: this.labels,
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