<template>
  <div class="container-fluid">
    <div class="row no-gutters page-header py-4">
      <div class="col-12 col-sm-8 text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Dashboard</span>
        <h3 class="page-title">Staffs</h3>
      </div>
    </div>

    <div class="row pb-4">
      <div class="col">
        <data-table
          table-id="staffs"
          :url="dataTableURL"
          :columns="columns">
        </data-table>
      </div>
    </div>
  </div>
</template>


<script>
import DataTable from '../../core/components/common/Datatable.vue';

export default {
  name: 'Staffs',
  components: {
    DataTable,
  },
  computed: {
    dataTableURL() {
      const storeId = this.$store.state.auth.store.store_id;
      return `v1/stores/${storeId}/staffs`;
    },
    columns() {
      const THIS = this;
      return {
        header: ['ID', 'Mobile', 'Firtname', 'Lastname', 'Username', 'Role'],
        record: [
          { data: 'id' },
          { data: 'mobile' },
          { data: 'firstname' },
          { data: 'lastname' },
          { data: 'username' },
          { data: 'pivot' },
        ],
        defs: [
          {
            targets: -1,
            render(data) {
              const role = THIS.$store.state.role.all.find(r => r.role_id === data.role_id);

              return typeof role === 'object'
                ? role.description
                : 'App Administrator ';
            },
          },
        ],
      };
    },
  },
};
</script>
