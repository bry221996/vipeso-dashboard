<template>
  <div class="store-details">
    <div class="row" v-if="loaded">
      <div class="col-sm-12 col-lg-4">
        <div class="card store-details mb-4">
          <div class="card-body p-0 mt-3">
            <div class="row">
              <div class="col d-flex justify-content-center">
                <image-preview :src="store.logo"></image-preview>
              </div>
            </div>

            <h4 class="text-center m-0 mt-2">{{ store.store_name }}</h4>
            <p class="text-center text-light m-0 mb-2">{{ store.complete_address }}</p>

            <div class="border-top border-bottom my-3 pt-2">
              <div class="row mx-2 mb-2">
                <div class="col w-50">
                  <span class="d-block">Mobile Number</span>
                  <span class="d-block text-light">
                    <i class="material-icons">phone_iphone</i>
                    {{ store.mobile_number }}
                  </span>
                </div>
                <div class="col w-50">
                  <span class="d-block">Telephone Number</span>
                  <span class="d-block text-light">
                    <i class="material-icons">settings_phone</i>
                    {{ store.phone_number }}
                  </span>
                </div>
              </div>
            </div>

            <div class="mb-3">
              <div class="row mx-2">
                <div class="col">
                  <span
                    v-for="(day, i) in store.store_hours"
                    :key="i"
                    class="badge badge-pill badge-light text-light text-uppercase mb-2 border mx-1"
                  >{{ day.day }}({{ day.opening }}-{{ day.closing }})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <store-analytics
          :data="analytics"
          :verified-reviews="store.verified_reviews_count"
          :ratings="store.rating"
        ></store-analytics>

        <orders-overview class="mb-4"></orders-overview>

        <coupons-overview></coupons-overview>
      </div>
    </div>
    <div class="row" v-else>
      <loading-indicator style="margin-top: 35vh; width: 5rem; height: 5rem" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ImagePreview from '../../core/components/common/images/ImagePreview.vue';
import LoadingIndicator from '../../core/components/common/LoadingIndicator.vue';
import OrdersOverview from '../components/charts/OrdersOverview.vue';
import CouponsOverview from '../components/charts/CouponsOverview.vue';
import StoreAnalytics from '../components/StoreAnalytics.vue';


export default {
  name: 'StoreDetails',
  components: {
    ImagePreview,
    LoadingIndicator,
    StoreAnalytics,
    OrdersOverview,
    CouponsOverview,
  },
  data() {
    return {
      loaded: false,
    };
  },
  computed: {
    ...mapState('store', {
      store: 'selected',
      analytics: 'analytics',
    }),
  },
  async mounted() {
    await this.$store.dispatch('store/showDetails', this.$route.params.id);
    await this.$store.dispatch('store/fetchAnalytics', this.$route.params.id);
    this.loaded = true;
  },
};
</script>
