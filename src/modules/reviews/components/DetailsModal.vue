<template>
  <d-modal v-if="isShown" @close="close" centered>
    <div class="modal-header">
      <h5 class="modal-title">Edit Tier Settings</h5>
      <button aria-label="Close" class="close" @click="close">×</button>
    </div>

    <div class="modal-body">
      <div class="container-fluid">
        <div class="row d-flex justify-content-center">
          <div class="col-4 col-sm-4">
            <img :src="review.store.logo" class="img-thumbnail img-fluid d-block mx-auto" />
          </div>
        </div>

        <div class="row d-flex justify-content-center">
          <div class="col">
            <p class="m-0 text-center">
              <strong>{{ review.store.store_name }}</strong>
            </p>
          </div>
        </div>

        <div class="row d-flex justify-content-center">
          <div class="col-11 col-sm-9 d-flex justify-content-center">
            <p class="text-center font-italic font-weight-light text-muted">{{ reviewText }}</p>
          </div>
        </div>

        <div class="row d-flex justify-content-center">
          <div class="col">
            <p class="m-0 text-center text-uppercase">
              <strong>{{ revieweeFullName || revieweeMobile }}</strong>
            </p>
            <p class="m-0 text-center" v-html="starRating" />
          </div>
        </div>

        <div class="row mt-3">
          <div class="col">
            <carousel :perPageCustom="[[0, 3], [576, 4]]" autoplay :autoplay-timeout="1000">
              <slide v-for="(photo, id) in review.photos" :key="id">
                <image-preview :src="photo.image" :buttons="false"></image-preview>
              </slide>
            </carousel>
          </div>
        </div>

        <template v-if="isPendingToPublish && $store.getters['auth/isAdmin']">
          <div class="row mt-4 d-flex align-items-center">
            <div class="col-12">Reward Review</div>
            <div class="col-12">
              <v-select
                v-model="reward"
                :searchable="false"
                :clearable="false"
                :options="options" />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col d-flex justify-content-end">
              <button class="btn btn-light mr-2" @click.prevent="close">Cancel</button>
              <submit-button
                :is-disabled="isPublishButtonDisable"
                ref="button"
                class="btn-primary"
                submit-text="Publishing"
                @click="onFormSubmit"
              >Publish</submit-button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </d-modal>
</template>

<script>
import { mapState } from 'vuex';
import ImagePreview from '../../core/components/common/images/ImagePreview.vue';
import SubmitButton from '../../core/components/common/SubmitButton.vue';

import StarRatings from '../utilities/startRatings';
import RewardOptions from '../data/rewardOptions';

export default {
  name: 'DetailsModal',
  components: {
    ImagePreview,
    SubmitButton,
  },
  data() {
    return {
      isShown: false,
      options: RewardOptions,
      reward: null,
    };
  },
  computed: {
    ...mapState('review', {
      review: 'selected',
    }),
    revieweeFullName() {
      return `${this.review.user.firstname} ${this.review.user.lastname}`;
    },
    revieweeMobile() {
      return this.review.user.mobile;
    },
    hasPhotos() {
      return this.review.photos.length > 0;
    },
    isPendingToPublish() {
      return this.review.verified === 0;
    },
    reviewText() {
      return this.review.review || '* * * No Review * * *';
    },
    starRating() {
      return StarRatings(this.review.rating);
    },
    isPublishButtonDisable() {
      return this.reward === null;
    },
  },
  methods: {
    show() {
      this.isShown = true;
    },
    close() {
      this.isShown = false;
    },
    async onFormSubmit() {
      await this.$store.dispatch('review/verify', this.reward.code);
      this.$refs.button.doneSubmit();
      this.$toast.success('Review Published Succesfully');
      this.reward = null;
      this.close();
      this.$store.commit('review/SET_SELECTED', {});
      this.$emit('verified');
    },
  },
};
</script>
