<script>
/* eslint no-underscore-dangle: 0 */
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  name: 'BarChart',
  props: {
    legend: {
      type: Boolean,
      default: false,
    },
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
    this.options.legend.display = this.legend;
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
