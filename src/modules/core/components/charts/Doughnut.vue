<script>
/* eslint no-underscore-dangle: 0 */
import { Doughnut } from 'vue-chartjs';

export default {
  extends: Doughnut,
  name: 'DoughnutChart',
  props: {
    chartData: {
      type: Object,
      default: () => {},
    },
    options: {
      type: Object,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateRotate: false,
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
