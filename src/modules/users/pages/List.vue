<template>
  <div class="container-fluid">
    <div class="row no-gutters page-header py-4">
      <div class="col-12 col-sm-8 text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Dashboard</span>
        <h3 class="page-title">Users</h3>
      </div>
    </div>

    <div class="row pb-4">
      <div class="col">
        <data-table table-id="users" url="users" :columns="columns" searchable></data-table>
      </div>
    </div>
  </div>
</template>


<script>
import DataTable from '../../core/components/common/Datatable.vue';

export default {
  name: 'Users',
  components: {
    DataTable,
  },
  computed: {
    columns() {
      return {
        header: [
          'ID',
          'Mobile',
          'First Name',
          'Last Name',
          'Username',
          'Roles',
          'Joined',
        ],
        record: [
          { data: 'id', searchable: false, orderable: true },
          { data: 'mobile', searchable: true, orderable: true },
          { data: 'firstname', searchable: true, orderable: true },
          { data: 'lastname', searchable: false, orderable: true },
          { data: 'username', searchable: true, orderable: true },
          { data: 'roles', searchable: false, orderable: false },
          { data: 'created_at', searchable: false, orderable: true },
        ],
        defs: [
          {
            targets: -2,
            orderable: false,
            render(roles) {
              let roleConcat = '';
              roles.forEach((role, index) => {
                if (!roleConcat.includes(role.name)) {
                  if (index > 0) {
                    roleConcat = `${roleConcat}, `;
                  }
                  roleConcat += role.name;
                }
              });
              return roleConcat;
            },
          },
          {
            targets: -1,
            className: 'text-center',
            render(date) {
              if (date) {
                return new Date(Date.parse(date)).toLocaleDateString();
              }
              return 'Unknown';
            },
          },
        ],
      };
    },
  },
};
</script>
