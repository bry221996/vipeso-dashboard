<template>
  <chart-display
    :labels="labels"
    :data-sets="dataSets"
    :date-options="false"
    type="bar-chart"
    ref="display"
    title="Game Coupons Overview"
    legend
    @on-fetch="fetchData"
  ></chart-display>
</template>

<script>
import ChartDisplay from '../../../core/components/common/ChartDisplay.vue';
import StoreAnalytics from '../../../../services/storeService';

export default {
  name: 'StoreCouponsOverview',

  components: {
    ChartDisplay,
  },

  data() {
    return {
      total: [],
      won: [],
      redeemed: [],
      claimed: [],
      labels: [],
    };
  },

  computed: {
    dataSets() {
      return [
        {
          label: 'Total',
          fill: 'start',
          borderWidth: 1,
          backgroundColor: 'rgba(0, 184, 216, 0.5)',
          borderColor: 'rgb(0, 184, 216)',
          data: this.total,
        },
        {
          label: 'Won',
          fill: 'start',
          borderWidth: 1,
          backgroundColor: 'rgba(23,198,113, 0.5)',
          borderColor: 'rgb(23,198,113)',
          data: this.won,
        },
        {
          label: 'Claimed',
          fill: 'start',
          borderWidth: 1,
          backgroundColor: 'rgba(255,180,0, 0.5)',
          borderColor: 'rgb(255,180,0)',
          data: this.claimed,
        },
        {
          label: 'Redeemed',
          fill: 'start',
          borderWidth: 1,
          backgroundColor: 'rgba(255,65,105, 0.5)',
          borderColor: 'rgb(255,65,105)',
          data: this.redeemed,
        },
      ];
    },
  },

  methods: {
    resetData() {
      this.total = [];
      this.won = [];
      this.redeemed = [];
      this.claimed = [];
      this.labels = [];
    },
    async fetchData() {
      this.resetData();
      const storeId = this.$route.params.id;

      const { data } = await StoreAnalytics.fetchGameCouponsAnalytics(storeId);

      data.data.forEach((dataElement) => {
        this.labels.push(dataElement.name);
        this.won.push(dataElement.won);
        this.claimed.push(dataElement.claimed);
        this.redeemed.push(dataElement.redeemed);
        this.total.push(dataElement.total);
      });

      this.$refs.display.doneLoading();
    },
  },
};
</script>
