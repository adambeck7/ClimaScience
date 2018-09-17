<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['data', 'time'],
  mounted () {
    this.createChart()
  },
  methods: {
    createChart () {
      this.renderChart({
        labels: this.time,
        datasets: this.data
      })
    }
  }
}
</script>