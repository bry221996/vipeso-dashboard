<template>
  <div class="container-fluid">
    <div class="row no-gutters page-header py-4">
      <div class="col-12 col-sm-6 text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Dashboard</span>
        <h3 class="page-title">User Rewards</h3>
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
          :columns="exportFields"
          :service="service"
          file-name="User_Rewards.xls"
          :query="query"/>
      </div>
    </div>

    <div class="row pb-4">
      <div class="col">
        <data-table table-id="user-rewards" :url="dataTableURL" :columns="columns"></data-table>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from '../../core/components/common/Datatable.vue';
import ExportButton from '../../core/components/common/vendor/ExportButton.vue';

import UserRewardService from '../../../services/userRewardService';

export default {
  name: 'UserRewards',
  components: {
    DataTable,
    ExportButton,
  },
  computed: {
    dataTableURL() {
      const storeId = this.$store.state.auth.store.store_id;
      return this.$store.getters['auth/isPlatformStaff']
        ? 'v1/user_rewards?include=game_reward,user,logs'
        : `v1/user_rewards?include=game_reward,user,logs&filter[sponsored_by]=${storeId}`;
    },
    columns() {
      const THIS = this;
      return {
        header: [
          'ID',
          'Reward',
          'Won by',
          'Status',
          'Remarks',
          'Claimed At',
          'Redeemed At',
        ],
        record: [
          { data: 'user_reward_id' },
          { data: 'game_reward' },
          { data: 'user' },
          { data: 'is_redeemed' },
          { data: 'logs' },
          { data: 'created_at' },
          { data: 'logs' },
        ],
        defs: [
          {
            targets: 1,
            render(data) {
              return data.rewardable ? data.rewardable.name : '';
            },
          },
          {
            targets: 2,
            className: 'text-center',
            render(data) {
              const fullname = `${data.firstname} ${data.lastname}`;
              return fullname || data.mobile;
            },
          },
          {
            targets: 3,
            className: 'text-center',
            render(data) {
              const status = data
                ? { variant: 'success', text: 'Redeemed' }
                : { variant: 'info', text: 'Claimed' };
              return `<span class='pl-2 pr-2 badge bg-${status.variant}'>${status.text}</span>`;
            },
          },
          {
            targets: -3,
            className: 'text-center uppercase',
            render(data, type, object) {
              return THIS.getRemarks(object.is_redeemed, data);
            },
          },
          {
            targets: -1,
            className: 'text-center uppercase',
            render(data, type, object) {
              return THIS.getRedeemedDate(object.is_redeemed, data);
            },
          },
        ],
      };
    },
    service() {
      return UserRewardService;
    },
    query() {
      return this.$store.getters['auth/isPlatformStaff'] ? '' : `filter[sponsored_by]=${this.$store.state.auth.store.store_id}`;
    },
    exportFields() {
      const THIS = this;
      return {
        Reward: {
          field: 'game_reward',
          callback: value => value.rewardable.name,
        },
        'Sponsored By': {
          field: 'game_reward',
          callback: value => value.rewardable.store_name || 'Vipeso Inc.',
        },
        User: {
          field: 'user',
          callback: (value) => {
            const fullname = `${value.firstname} ${value.lastname}`;
            return fullname || value.mobile;
          },
        },
        Redeemed: {
          field: 'is_redeemed',
          callback: value => (value ? 'Yes' : 'Not yet'),
        },
        Remarks: {
          callback: row => THIS.getRemarks(row.is_redeemed, row.logs),
        },
        'Claimed At': 'created_at',
        'Redeemd At': {
          callback: row => THIS.getRedeemedDate(row.is_redeemed, row.logs),
        },
      };
    },
  },
  methods: {
    getRemarks(isRedeemed, logs) {
      if (isRedeemed && logs.length > 0) {
        const log = logs[0];

        if (log.referenceable_type === 'App\\Store') {
          const store = this.$store.state.store.partners.find(
            s => s.store_id.toString() === log.referenceable_id.toString(),
          );

          return `Redeem at ${store.store_name} - ${store.locality}`;
        }
        return log.remarks;
      }

      return 'Not yet redeemed';
    },
    getRedeemedDate(isRedeemed, logs) {
      return isRedeemed && logs.length > 0 ? logs[0].redeemed_at : '';
    },
  },
};
</script>
