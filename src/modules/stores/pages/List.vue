<template>
  <div class="row pb-4">
    <div class="col">
      <data-table
        table-id="stores"
        url="v1/stores"
        :columns="columns"
        :menu-actions="actions"
        searchable
        @show-store="onShowStore"
        @edit-store="onEditStore"
      ></data-table>
    </div>
  </div>
</template>


<script>
import DataTable from '../../core/components/common/Datatable.vue';

export default {
  name: 'StoreList',
  data() {
    return {
      actions: ['show-store', 'edit-store'],
    };
  },
  components: {
    DataTable,
  },
  computed: {
    columns() {
      return {
        header: ['ID', 'Name', 'Phone', 'Locality', 'Added', 'Actions'],
        record: [
          { data: 'store_id', searchable: false, orderable: true },
          { data: 'store_name', searchable: true, orderable: true },
          { data: 'phone_number', searchable: false, orderable: false },
          { data: 'locality', searchable: true, orderable: true },
          { data: 'created_at', searchable: false, orderable: true },
          { data: 'store_id', searchable: false, orderable: true },
        ],
        defs: [
          {
            targets: -1,
            className: 'text-center',
            render(data) {
              return `
              <div aria-role="group" aria-label="Button group" class="d-flex justify-content-center btn-group-sm btn-group">
                <button
                  class="btn btn-white btn-primary action-button show-store"
                  title="Show Details"
                  data-id="${data}">
                  <i class="material-icons">info</i>
                </button>
                <button
                  class="btn btn-white btn-primary action-button edit-store"
                  title="Edit Store"
                  data-id="${data}">
                  <i class="material-icons">edit</i>
                </button>
              </div>`;
            },
          },
        ],
      };
    },
  },
  methods: {
    onEditStore(id) {
      this.$router.push(`/stores/${id}/edit`);
    },
    onShowStore(id) {
      this.$router.push(`/stores/${id}`);
    },
  },
};
</script>
