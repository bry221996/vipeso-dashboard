<template>
  <div class="row pb-4">
    <div class="col">
      <data-table table-id="game-rewards" :url="dataTableURL" :columns="columns"></data-table>
    </div>
  </div>
</template>


<script>
import DataTable from '../../core/components/common/Datatable.vue';

export default {
  name: 'GameRewards',
  components: {
    DataTable,
  },
  computed: {
    dataTableURL() {
      const storeId = this.$store.state.auth.store.store_id;
      return this.$store.getters['auth/isPlatformStaff']
        ? 'v1/games/1/rewards'
        : `v1/games/1/rewards?filter[sponsored_by]=${storeId}`;
    },
    columns() {
      return {
        header: ['ID', 'Title', 'Type', 'Total', 'Claimed', 'Redeemed', 'Remaining', 'Created At'],
        record: [
          { data: 'game_reward_id', searchable: false, orderable: false },
          { data: 'rewardable', searchable: false, orderable: false },
          { data: 'type', searchable: false, orderable: false },
          { data: 'limit', searchable: false, orderable: true },
          { data: 'won', searchable: false, orderable: false },
          { data: 'redeemed', searchable: false, orderable: false },
          { data: 'won', searchable: false, orderable: false },
          { data: 'created_at', searchable: false, orderable: true },
        ],
        defs: [
          {
            targets: 1,
            render(data) {
              return data.name;
            },
          },
          {
            targets: -2,
            render(data, display, obj) {
              return obj.limit - obj.won;
            },
          },
          {
            targets: [2, 3, 4, 5],
            className: 'text-center',
          },
        ],
      };
    },
  },
};
</script>
