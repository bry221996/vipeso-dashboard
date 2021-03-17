<template>
  <div class="container-fluid">
    <div class="row no-gutters page-header py-4">
      <div class="col-12 col-sm-6 text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Dashboard</span>
        <h3 class="page-title">{{ $route.meta.title }}</h3>
      </div>
      <div
        :class="[
        'col-12',
        'col-sm-6',
        'd-flex',
        'align-items-end',
        'justify-content-center',
        'justify-content-sm-end'
        ]"
      >
        <export-button
          v-show="onListPage"
          class="mr-1"
          :columns="exportFields"
          :service="service"
          :query="query"
          file-name="Game_Rewards.xls"
        ></export-button>
        <button
          v-if="isPlatform"
          class="btn btn-outline-info btn-pill px-5 mr-1"
          @click.prevent="navigate"
        >{{ buttonText }}</button>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ExportButton from '../../core/components/common/vendor/ExportButton.vue';
import GameRewardService from '../../../services/gameRewardService';

export default {
  name: 'GameRewardIndex',
  components: {
    ExportButton,
  },
  computed: {
    ...mapGetters('auth', {
      isPlatform: 'isPlatformStaff',
    }),
    onListPage() {
      return this.$route.name === 'game-reward-list';
    },
    buttonText() {
      return this.onListPage ? 'Add Game Reward' : 'Back';
    },
    exportFields() {
      return {
        'Game Reward': {
          field: 'rewardable',
          callback: value => value.name,
        },
        'Sponsored By': {
          field: 'rewardable',
          callback: value => value.store_name || 'Vipeso Inc.',
        },
        Type: 'type',
        Won: 'won',
        Limit: 'limit',
      };
    },
    service() {
      return GameRewardService;
    },
    query() {
      return this.isPlatform ? '' : `filter[sponsored_by]=${this.$store.state.auth.store.store_id}`;
    },
  },
  methods: {
    navigate() {
      const redirect = this.onListPage
        ? '/game-rewards/create'
        : '/game-rewards';
      this.$store.commit('gameReward/CLEAR_FORM');
      this.$router.push(redirect);
    },
  },
};
</script>
