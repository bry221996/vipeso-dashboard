<template>
  <div class="container-fluid">
    <div class="row no-gutters page-header py-4">
      <div class="col-12 col-sm-6 text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Dashboard</span>
        <h3 class="page-title">App Versions</h3>
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
        <button
          class="btn btn-outline-info btn-pill px-5 mr-1"
          @click="onEditButtonClicked"
        >Edit Versions</button>
      </div>
    </div>

    <div class="row pb-4">
      <div class="col">
        <data-table
          ref="table"
          table-id="staffs"
          url="v1/versions"
          :columns="columns"
          @loaded="onTableLoaded"
        ></data-table>
      </div>
    </div>

    <edit-modal ref="edit" @updated="onUpdate"></edit-modal>
  </div>
</template>


<script>
import DataTable from '../../core/components/common/Datatable.vue';
import EditModal from '../components/EditModal.vue';

export default {
  name: 'AppVersions',
  components: {
    DataTable,
    EditModal,
  },
  computed: {
    columns() {
      return {
        header: [
          'App ID',
          'Name',
          'Version',
          'Platform',
          'Force Update',
          'Persist',
          'Link',
        ],
        record: [
          { data: 'app_id' },
          { data: 'app_name' },
          { data: 'version' },
          { data: 'platform' },
          { data: 'force_update' },
          { data: 'persist' },
          { data: 'update_link' },
        ],
        defs: [
          {
            targets: [2, 3, 4, 5],
            className: 'text-center',
          },
          {
            targets: -1,
            className: 'text-lowercase',
          },
          {
            targets: [4, 5],
            render(data) {
              return data ? 'Yes' : 'No';
            },
          },
        ],
      };
    },
  },
  methods: {
    onTableLoaded({ data }) {
      this.$store.commit('version/SET_VERSIONS', data);
    },
    onEditButtonClicked() {
      const form = this.$store.state.version.all.map(version => ({
        app_id: version.app_id,
        version: version.version,
      }));
      this.$store.commit('version/SET_FORM', form);
      this.$refs.edit.show();
    },
    onUpdate() {
      this.$refs.table.refresh();
    },
  },
};
</script>
