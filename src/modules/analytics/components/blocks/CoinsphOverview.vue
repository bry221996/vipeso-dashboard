<template>
  <div class="card card-small h-100">
    <!-- Card Header -->
    <div class="card-header border-bottom">
      <h6 class="m-0">Coinsph Account</h6>
    </div>

    <div class="card-body pt-0">
      <div class="border-bottom py-2 mb-3 bg-light row">
        <div class="d-flex justify-content-center mb-2 mb-sm-0 text-muted col-sm-12 col-12">
          <p class="m-0 mb-1">Balance: {{ `₱ ${accountBalance}` }}</p>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <doughnut :chartData="datacollection" :styles="chartStyle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Doughnut from '../../../core/components/charts/Doughnut.vue';
import AnalyticsService from '../../../../services/analyticService';

export default {
  name: 'CoinsphOverview',

  components: {
    Doughnut,
  },

  data() {
    return {
      data: [230, 1150],
      label: ['Buy Load', 'Game Reward'],
      background: ['rgba(0, 184, 216, 0.8)', 'rgba(23,198,113, 0.8)'],
      balance: 0,
    };
  },

  computed: {
    datacollection() {
      return {
        labels: this.label,
        datasets: [
          {
            backgroundColor: this.background,
            data: this.data,
          },
        ],
      };
    },
    chartStyle() {
      return {
        height: '300px',
        position: 'relative',
      };
    },
    accountBalance() {
      const bal = Number.parseFloat(this.balance);
      return bal.toFixed(2);
    },
  },
  async mounted() {
    const { data } = await AnalyticsService.getCoinsBalance();

    this.balance = data['crypto-accounts'][0].balance;

    this.$emit('loaded', this.balance);
  },
};
</script>
