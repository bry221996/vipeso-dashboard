<template>
  <div class="analytics">
    <div class="container-fluid" v-if="! loaded">
      <loading-indicator style="margin-top: 35vh; width: 5rem; height: 5rem" />
    </div>

    <div class="container-fluid main-content-container px-4" v-else>
      <coins-warning v-show="showCoinsWarning"></coins-warning>

      <div class="row page-header py-4 no-gutters justify-content-between">
        <div class="col-sm-6 col-md-7 col-lg-8 text-center text-sm-left mb-4 mb-sm-0">
          <span class="text-uppercase page-subtitle">Dashboard</span>
          <h3 class="page-title">Analytics</h3>
        </div>

        <store-options @change="onChangeStore"></store-options>
      </div>

      <!-- Analytics Card -->
      <div class="row">
        <div class="col-lg-3 col-md-6 mb-4" v-for="(key, id) in Object.keys(analytics)" :key="key">
          <analytics-card
            :title="key"
            :count="analytics[key].count"
            :data="analytics[key].data"
            :line-chart-color="lineColors[id]"
            :loaded="loaded"
          />
        </div>
      </div>

      <!-- Chart Displays when auth is platform staff -->
      <template v-if="isPlatform">
        <div class="row">
          <div class="col-lg-6 col-md-12 col-sm-12 mb-4">
            <users-overview></users-overview>
          </div>
          <div class="col-lg-6 col-md-12 col-sm-12 mb-4">
            <orders-overview></orders-overview>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-8 mb-4">
            <transactions-overview></transactions-overview>
          </div>
          <div class="col-lg-4 mb-4">
            <coinsph-overview @loaded="onCoinsChartLoaded"></coinsph-overview>
          </div>
        </div>
      </template>

      <!-- Chart Displays when auth is store staff -->
      <template v-else>
        <div class="row">
          <div class="col-lg-6 mb-4">
            <store-orders-overview />
          </div>
          <div class="col-lg-6 mb-4">
            <store-coupons-overview />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
// Common Components
import { mapGetters, mapState } from 'vuex';
import AnalyticsCard from '../components/AnalyticsCard.vue';
import StoreOptions from '../components/StoreOptions.vue';

// Block Components
import UsersOverview from '../components/blocks/UsersOverview.vue';
import OrdersOverview from '../components/blocks/OrdersOverview.vue';
import TransactionsOverview from '../components/blocks/TransactionsOverview.vue';
import CoinsphOverview from '../components/blocks/CoinsphOverview.vue';
import LoadingIndicator from '../../core/components/common/LoadingIndicator.vue';
import StoreOrdersOverview from '../components/blocks/StoreOrdersOverview.vue';
import StoreCouponsOverview from '../components/blocks/StoreCouponsOverview.vue';
import CoinsWarning from '../components/blocks/CoinsWarning.vue';

// Services
import AnalyticsService from '../../../services/analyticService';
import StoreSevice from '../../../services/storeService';

import ANALYTICS_LINE_COLORS from '../data/lineColors';

export default {
  name: 'Analytics',

  components: {
    AnalyticsCard,
    UsersOverview,
    OrdersOverview,
    TransactionsOverview,
    CoinsphOverview,
    LoadingIndicator,
    StoreOrdersOverview,
    StoreCouponsOverview,
    CoinsWarning,
    StoreOptions,
  },

  data() {
    return {
      loaded: false,
      showCoinsWarning: false,
      analytics: {},
      lineColors: ANALYTICS_LINE_COLORS,
    };
  },

  computed: {
    ...mapGetters('auth', {
      isPlatform: 'isPlatformStaff',
    }),
    ...mapState('auth', {
      currentStore: 'store',
    }),
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      this.loaded = false;
      if (this.isPlatform) {
        this.persistFetchForPlatform();
      } else {
        this.persistFetchForStore();
      }
    },
    onCoinsChartLoaded(balance) {
      this.showCoinsWarning = balance < 1000;
    },
    onChangeStore() {
      this.fetchData();
    },
    async persistFetchForPlatform() {
      const { data } = await AnalyticsService.get();
      this.analytics = data.data;
      this.loaded = true;
    },
    async persistFetchForStore() {
      const { data } = await StoreSevice.analytics(this.currentStore.store_id);
      delete data.data.reviews;
      const keys = Object.keys(data.data);

      const analytics = {};

      keys.forEach((key) => {
        analytics[key] = {
          count: data.data[key],
        };
      });

      this.analytics = analytics;
      this.loaded = true;
    },
  },
};
</script>
