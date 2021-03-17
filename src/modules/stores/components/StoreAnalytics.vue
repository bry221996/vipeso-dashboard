<template>
  <div class="card-small store-analytics mb-4 card">
    <div class="card-body">
      <div class="row">
        <div class="text-center col-sm-3 col-md-6 col-lg-3">
          <h4 class="m-0">{{ data.orders }}</h4>
          <span class="text-light text-uppercase">Orders</span>
        </div>
        <div class="text-center col-sm-3 col-md-6 col-lg-3">
          <h4 class="m-0">{{ data.favorites }}</h4>
          <span class="text-light text-uppercase">Favorites</span>
        </div>
        <div class="text-center col-sm-3 col-md-6 col-lg-3">
          <h4 class="m-0">{{ data.promotions }}</h4>
          <span class="text-light text-uppercase">Promotions</span>
        </div>
        <div class="text-center col-sm-3 col-md-6 col-lg-3">
          <h4 class="m-0">{{ data.coupons }}</h4>
          <span class="text-light text-uppercase">Coupons</span>
        </div>
      </div>
    </div>

    <div class="py-0 card-footer">
      <div class="row">
        <div class="border-top pb-3 pt-2 border-right col-sm-12 col-md-6">
          <div class="progress-wrapper">
            <div class="progress-label">Ratings</div>
            <div class="progress-sm progress">
              <span class="progress-value">{{ ratings }} / 5</span>
              <div
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                class="progress-bar bg-primary progress-bar-striped"
                :aria-valuenow="ratingsPercentage"
                :style="`width: ${ratingsPercentage}%;`"
              ></div>
            </div>
          </div>
        </div>
        <div class="border-top pb-3 pt-2 col-sm-12 col-md-6">
          <div class="progress-wrapper">
            <div class="progress-label">Verified Reviews</div>
            <div class="progress-sm progress">
              <span class="progress-value">{{ verifiedReviews }} / {{ data.reviews }}</span>
              <div
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                class="progress-bar bg-success progress-bar-striped"
                :aria-valuenow="reviewsPercentage"
                :style="`width: ${reviewsPercentage}%;`"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoreAnalytics',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    verifiedReviews: {
      type: Number,
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ratingsPercentage() {
      return Math.floor((this.ratings / 5) * 100);
    },
    reviewsPercentage() {
      return Math.floor((this.verifiedReviews / this.data.reviews) * 100);
    },
  },
};
</script>
