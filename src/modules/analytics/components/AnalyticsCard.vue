<template>
  <d-card class="stats-small card card-small">
    <d-card-body class="px-0 pb-0">
      <div class="d-flex px-3">
        <div class="stats-small__data">
          <span class="stats-small__label text-uppercase mb-1">{{ title }}</span>
          <h6 class="stats-small__value count m-0">{{ animatedCount }}</h6>
        </div>
        <div class="stats-small__data text-right align-items-center">
          <span
            :class="['stats-small__percentage', `stats-small__percentage--${percentageClass}`]"
          >{{ percentage }}</span>
        </div>
      </div>
      <line-chart :chartData="datacollection" :options="chartOptions" :styles="chartStyle" />
    </d-card-body>
  </d-card>
</template>


<script>
import { TweenLite } from 'gsap/TweenMax';
import LineChart from '../../core/components/charts/LineChart.vue';

export default {
  components: {
    LineChart,
  },
  props: {
    count: {
      type: Number,
      default: 0,
    },
    data: {
      type: Array,
      default: () => [0, 0, 0, 0, 0, 0, 0],
    },
    loaded: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Card-Title',
    },
    lineChartColor: {
      type: String,
      default: 'rgb(0, 184, 216)',
    },
  },
  data() {
    return {
      tweenedCount: 0,
    };
  },
  watch: {
    count() {
      TweenLite.to(this.$data, 1, { tweenedCount: this.count });
    },
  },
  mounted() {
    if (this.loaded) {
      TweenLite.to(this.$data, 1, { tweenedCount: this.count });
    }
  },
  computed: {
    percentage() {
      const difference = Math.abs(this.data[6] - this.data[0]);
      let percentage;
      if (this.data[0]) {
        percentage = Math.round((difference / this.data[0]) * 100);
      } else {
        percentage = Math.round(difference * 100);
      }
      return `${percentage}%`;
    },
    dataIncrease() {
      return this.data[6] > this.data[0];
    },
    dataUnchanged() {
      return this.data[0] === this.data[6];
    },
    dataDecrease() {
      return this.data[0] > this.data[6];
    },
    percentageClass() {
      return this.dataUnchanged || this.dataIncrease ? 'increase' : 'decrease';
    },
    animatedCount() {
      return this.tweenedCount.toFixed(0);
    },
    datacollection() {
      return {
        labels: [1, 2, 3, 4, 5, 6, 7],
        datasets: [
          {
            label: 'Today',
            fill: 'start',
            borderWidth: 1.5,
            backgroundColor: 'rgba(0, 184, 216, 0.1)',
            borderColor: this.lineChartColor,
            data: this.data,
          },
        ],
      };
    },
    chartOptions() {
      return {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: true,
          custom: false,
        },
        elements: {
          point: {
            radius: 0,
          },
          line: {
            tension: 0.33,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: false,
              ticks: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: false,
              scaleLabel: false,
              ticks: {
                display: false,
                isplay: false,
                suggestedMin: this.min,
                suggestedMax: this.max,
              },
            },
          ],
        },
      };
    },
    max() {
      return this.loaded ? Math.max(...this.data) + 1 : 0;
    },
    min() {
      return this.loaded ? Math.min(...this.data) - 1 : 0;
    },
    chartStyle() {
      return {
        height: '59px',
      };
    },
  },
};
</script>
