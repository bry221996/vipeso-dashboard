<template>
  <div class="row justify-content-center">
    <div class="col-md-10">
      <div class="card">
        <div class="card-body">
          <form class="container">
            <div class="row">
              <div class="col-lg-6 p-0 pl-sm-5 pr-sm-5">
                <div class="form-group">
                  <label class="form-label">Reward Type</label>
                  <v-select
                    :value="formType"
                    :searchable="false"
                    :clearable="false"
                    :options="rewardTypes"
                    @input="onRewardTypeInput"
                  ></v-select>
                </div>

                <div class="form-group" v-show="isCreatingCoupon">
                  <label class="form-label">Choose Coupon Type</label>
                  <v-select
                    :value="couponType"
                    :searchable="false"
                    :clearable="false"
                    :options="couponTypes"
                    @input="onCouponTypeInput"
                  ></v-select>
                </div>

                <div class="form-group">
                  <label class="form-label">Limit</label>
                  <input
                    :value="form.limit"
                    name="limit"
                    v-validate="'required'"
                    class="form-control"
                    type="number"
                    @input="updateLimit"
                  />
                </div>

                <div class="form-group" v-show="isCreatingLoad">
                  <label class="form-label">Amount</label>
                  <input
                    :value="form.reward.value"
                    v-validate="creatingLoadRules"
                    name="value"
                    class="form-control"
                    type="number"
                    @input="updateRewardForm"
                  />
                </div>

                <div class="form-group" v-show="isCreatingCoupon">
                  <label class="form-label">Amount</label>
                  <input
                    v-validate="creatingCouponRules"
                    :value="form.reward.reward_value"
                    name="reward_value"
                    class="form-control"
                    type="number"
                    @input="updateRewardForm"
                  />
                </div>

                <div class="form-group">
                  <label class="form-label">Title</label>
                  <input
                    v-validate="'required'"
                    :value="form.reward.name"
                    name="name"
                    class="form-control"
                    @input="updateRewardForm"
                  />
                </div>

                <div class="form-group" v-show="isCreatingCoupon">
                  <label class="form-label">Minimum Order Amount</label>
                  <input
                    :value="form.reward.conditional_amount"
                    v-validate="creatingCouponRules"
                    name="conditional_amount"
                    class="form-control"
                    type="number"
                    @input="updateRewardForm"
                  />
                </div>
              </div>

              <div class="col-lg-6 p-0 pl-sm-5 pr-sm-5">
                <div class="form-row form-group mb-1">
                  <div class="col">
                    <label class="form-label">Reward Logo</label>
                    <image-upload ref="logo" @change="onChangeLogo">Upload logo</image-upload>
                  </div>
                  <div class="col">
                    <label class="form-label">Reward Banner</label>
                    <image-upload ref="banner" @change="onChangeBanner">Banner</image-upload>
                  </div>
                </div>

                <div class="form-row form-group" v-show="isCreatingCoupon">
                  <div class="col-md-6 form-group">
                    <label class="form-label">Valid From</label>
                    <d-datepicker
                      small
                      :disabled-dates="validFromDisabledDates"
                      @input="onValidFromInput"
                    />
                  </div>
                  <div class="col-md-6 form-group">
                    <label class="form-label">Valid From</label>
                    <d-datepicker
                      small
                      :disabled-dates="validToDisabledDates"
                      @input="onValidUntilInput"
                    />
                  </div>
                </div>
                <div class="form-group" v-show="isCreatingCoupon">
                  <label class="form-label">Mechanics</label>
                  <textarea
                    name="mechanics"
                    rows="4"
                    class="form-control"
                    style="resize: none"
                    v-validate="mechanicsRules"
                    @input="onMechanicsInput"
                  ></textarea>
                </div>

                <div class="form-group" v-show="isCreatingCoupon">
                  <label for="game-reward__stores">Applicable Stores</label>
                  <v-select
                    class="form-label"
                    multiple
                    taggable
                    :searchable="false"
                    :clearable="false"
                    :options="storeOptions"
                    @input="onAplicableStoresSelect"
                  ></v-select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col d-flex justify-content-end">
                <submit-button
                  :is-disabled="isButtonDisable"
                  ref="button"
                  class="btn-primary"
                  submit-text="Submitting"
                  @click="onFormSubmit"
                >Submit</submit-button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import moment from 'moment';
import ImageUpload from '../../core/components/common/images/ImageUpload.vue';
import SubmitButton from '../../core/components/common/SubmitButton.vue';

import { REWARD_TYPES, COUPON_TYPES } from '../data/constants';
import GameRewardService from '../../../services/gameRewardService';

export default {
  name: 'GameRewardForm',
  components: {
    ImageUpload,
    SubmitButton,
  },
  data() {
    return {
      rewardTypes: REWARD_TYPES,
      couponTypes: COUPON_TYPES,
      formValid: false,
      logo: null,
      banner: null,
    };
  },
  computed: {
    ...mapState('gameReward', {
      form: 'form',
    }),
    ...mapState('store', {
      partners: 'partners',
    }),
    ...mapGetters('gameReward', {
      isCreatingCoupon: 'isCreatingCoupon',
      isCreatingLoad: 'isCreatingLoad',
    }),
    creatingLoadRules() {
      return this.isCreatingLoad ? 'required|numeric' : '';
    },
    creatingCouponRules() {
      return this.isCreatingCoupon ? 'required|numeric' : '';
    },
    mechanicsRules() {
      return this.isCreatingCoupon ? 'required' : '';
    },
    formType() {
      return this.form.type ? this.form.type.replace('App\\', '') : '';
    },
    couponType() {
      if (this.form.reward.reward_type_id) {
        const reference = this.couponTypes.find(
          type => type.code === this.form.reward.reward_type_id,
        );
        return reference.label;
      }
      return null;
    },
    isButtonDisable() {
      return !(
        this.formValid
        && !!this.logo
        && !!this.banner
        && this.validStores
        && this.validDates
      );
    },
    validStores() {
      return this.isCreatingCoupon ? this.form.stores.length > 0 : true;
    },
    validDates() {
      return this.isCreatingCoupon
        ? !!this.form.reward.valid_from && !!this.form.reward.valid_until
        : true;
    },
    validFromDisabledDates() {
      return {
        to: new Date(),
      };
    },
    validToDisabledDates() {
      return {
        to: new Date(this.form.reward.valid_from) || new Date(),
      };
    },
    storeOptions() {
      return this.partners.map(store => ({
        label: `${store.store_name} - ${store.locality}`,
        code: store.store_id,
      }));
    },
  },
  methods: {
    onRewardTypeInput(type) {
      this.commitChanges('type', type.code);
      this.$store.commit('gameReward/SET_REWARD_FORM', {});
    },
    onCouponTypeInput(type) {
      const formReward = Object.assign({}, this.form.reward);
      formReward.reward_type_id = Number(type.code);
      formReward.name = this.generateName(this.form.type, formReward);
      this.$store.commit('gameReward/SET_REWARD_FORM', formReward);
    },
    updateLimit(e) {
      this.commitChanges(e.target.name, Number(e.target.value));
      this.validate();
    },
    commitChanges(key, value) {
      const form = Object.assign({}, this.form);
      form[key] = value;
      this.$store.commit('gameReward/SET_FORM', form);
    },
    updateRewardForm(e) {
      const nameDependents = [
        'value',
        'reward_value',
        'reward_type_id',
        'type',
      ];
      const { value, type, name } = e.target;
      const val = type === 'number' ? Number(value) : value;

      const formReward = Object.assign({}, this.form.reward);
      formReward[name] = val;

      if (nameDependents.includes(name)) {
        formReward.name = this.generateName(this.form.type, formReward);
      }
      this.$store.commit('gameReward/SET_REWARD_FORM', formReward);

      this.validate();
    },
    generateName(type, reward) {
      if (type === 'App\\Load' && reward.value) {
        return `LOAD ${reward.value}`;
      }
      if (
        type === 'App\\Coupon'
        && reward.reward_value
        && reward.reward_type_id
      ) {
        if (reward.reward_type_id === 6) {
          return `PHP ${reward.reward_value} OFF`;
        }
        return `${reward.reward_value}% OFF`;
      }
      return '';
    },
    onValidFromInput(date) {
      const dateTime = moment(date).endOf('day');

      this.persistChanges('valid_from', dateTime.format('YYYY-MM-DD HH:mm:ss'));
    },
    onValidUntilInput(date) {
      const dateTime = moment(date).endOf('day');

      this.persistChanges(
        'valid_until',
        dateTime.format('YYYY-MM-DD HH:mm:ss'),
      );
    },
    persistChanges(key, value) {
      const formReward = Object.assign({}, this.form.reward);
      formReward[key] = value;
      this.$store.commit('gameReward/SET_REWARD_FORM', formReward);
      this.validate();
    },
    validate() {
      this.$validator.validateAll().then((valid) => {
        this.formValid = valid;
      });
    },
    onChangeLogo(file) {
      this.logo = file;
    },
    onChangeBanner(file) {
      this.banner = file;
    },
    onMechanicsInput(e) {
      const array = e.target.value.split('\n');
      const mechanicsArray = [];
      array.forEach((arr) => {
        if (arr) {
          mechanicsArray.push(arr);
        }
      });
      const mechanics = JSON.stringify({ data: mechanicsArray });

      this.persistChanges('mechanics', mechanics);
    },
    onAplicableStoresSelect(stores) {
      const ids = stores.map(store => store.code);
      this.$store.commit('gameReward/SET_REWARD_STORES', ids);
    },
    async onFormSubmit() {
      const type = this.isCreatingLoad ? 'loads' : 'coupons';

      if (this.isCreatingCoupon) {
        this.persistChanges('is_for_game', true);
      }

      const reward = await this.$store.dispatch('gameReward/create');

      await GameRewardService.uploadLogo(this.logo, type, reward.rewardable_id);
      await GameRewardService.uploadBanner(this.banner, type, reward.rewardable_id);

      this.$refs.button.doneSubmit();
      this.$router.push('/game-rewards');
      this.$store.commit('gameReward/CLEAR_FORM');
    },
  },
};
</script>
