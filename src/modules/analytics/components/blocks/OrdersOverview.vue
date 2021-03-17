<template>
  <chart-display
    :data-sets="dataSets"
    :labels="labels"
    type="line-chart"
    ref="display"
    title="Orders Overview"
    @on-fetch="fetchData">
  </chart-display>
</template>

<script>
import moment from 'moment';
import ChartDisplay from '../../../core/components/common/ChartDisplay.vue';
import AnalyticsService from '../../../../services/analyticService';

export default {
  name: 'OrdersOverview',

  components: {
    ChartDisplay,
  },

  data() {
    return {
      data: [],
      labels: [],
    };
  },

  computed: {
    dataSets() {
      return [
        {
          label: 'Today',
          fill: 'start',
          borderWidth: 1.5,
          backgroundColor: 'rgba(0, 184, 216, 0.1)',
          borderColor: 'rgb(0, 184, 216)',
          data: this.data,
        },
      ];
    },
  },

  methods: {
    resetData() {
      this.data = [];
      this.labels = [];
    },
    async fetchData({ start, end }) {
      this.resetData();

      const { data } = await AnalyticsService.show('orders', start, end);
      this.data = data.data;

      this.data.forEach((element, i) => {
        const date = moment(start).add(i, 'd').format('M-DD');
        this.labels.push(date);
      });

      this.$refs.display.doneLoading();
    },
  },
};
</script>
