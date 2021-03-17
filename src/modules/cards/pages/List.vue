<template>
  <div class="container-fluid">
    <div class="row no-gutters page-header py-4">
      <div class="col-12 col-sm-8 text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Dashboard</span>
        <h3 class="page-title">Cards</h3>
      </div>
    </div>

    <div class="row pb-4">
      <div class="col">
        <data-table table-id="stores" url="v1/cards" :columns="columns" searchable></data-table>
      </div>
    </div>
  </div>
</template>


<script>
import DataTable from '../../core/components/common/Datatable.vue';

export default {
  name: 'CardList',
  components: {
    DataTable,
  },
  computed: {
    columns() {
      return {
        header: [
          'ID',
          'Number',
          'Customer',
          'Credits',
          'Redemption',
          'Rewards',
          'Status',
          'Description',
        ],
        record: [
          { data: 'card_id', searchable: false, orderable: true },
          { data: 'card_number', searchable: true, orderable: true },
          { data: 'user', searchable: true, orderable: false },
          { data: 'store_credits', searchable: false, orderable: true },
          { data: 'redemption_points', searchable: false, orderable: true },
          { data: 'reward_points', searchable: false, orderable: true },
          { data: 'status', searchable: false, orderable: false },
          { data: 'description', searchable: false, orderable: false },
        ],
        defs: [
          {
            targets: 2,
            render(user) {
              return user ? user.mobile : 'N/A';
            },
          },
          {
            targets: '_all',
            className: 'text-center',
          },
        ],
      };
    },
  },
};
</script>
