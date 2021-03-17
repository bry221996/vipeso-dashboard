<template>
  <div class="container-fluid">
    <div class="row no-gutters page-header py-4">
      <div class="col-12 col-sm-8 text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Dashboard</span>
        <h3 class="page-title">Orders</h3>
      </div>
    </div>

    <div class="row pb-4">
      <div class="col">
        <data-table
          table-id="staffs"
          :url="dataTableURL"
          :columns="columns"
          :searchable="$store.getters['auth/isPlatformStaff']">
        </data-table>
      </div>
    </div>
  </div>
</template>


<script>
import DataTable from '../../core/components/common/Datatable.vue';
import BadgeStatus from '../utilities/badgeStatus';

export default {
  name: 'Orders',
  components: {
    DataTable,
  },
  computed: {
    dataTableURL() {
      const storeId = this.$store.state.auth.store.store_id;
      return this.$store.getters['auth/isPlatformStaff']
        ? 'orders'
        : `orders?filter[store_id]=${storeId}`;
    },
    columns() {
      return {
        header: ['ID', 'Store', 'Customer', 'Bill', 'Status', 'Date'],
        record: [
          { data: 'order_id', searchable: true, orderable: true },
          { data: 'store', searchable: false, orderable: false },
          { data: 'user', searchable: false, orderable: false },
          { data: 'total_bill', searchable: false, orderable: true },
          { data: 'order_status_id', searchable: false, orderable: false },
          { data: 'created_at', searchable: false, orderable: true },
        ],
        defs: [
          {
            targets: 1,
            render(store) {
              return `${store.store_name} - ${store.locality}`;
            },
          },
          {
            targets: 2,
            render(user) {
              return user.mobile;
            },
          },
          {
            targets: 4,
            render(statusId) {
              return BadgeStatus(statusId);
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
