<script>
/* eslint no-underscore-dangle: 0 */
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  name: 'LineChart',
  props: {
    chartData: {
      type: Object,
      default: () => {},
    },
    options: {
      type: Object,
      default: () => ({
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: false,
        },
        elements: {
          point: {
            radius: 2,
          },
          line: {
            tension: 0.33,
          },
        },
        scales: {
          yAxes: [{
            ticks: {
              isplay: false,
              beginAtZero: true,
            },
          }],
        },
      }),
    },
  },
  computed: {
    data() {
      return this.chartData;
    },
  },
  mounted() {
    this.renderChart(this.data, this.options);
  },
  watch: {
    chartData() {
      this.$data._chart.destroy();
      this.renderChart(this.data, this.options);
    },
  },
};
</script>
