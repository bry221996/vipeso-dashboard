<template>
  <div class="container-fluid">
    <div class="row no-gutters page-header py-4">
      <div class="col-12 col-sm-8 text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Dashboard</span>
        <h3 class="page-title">Tier Program Settings</h3>
      </div>
    </div>

    <div class="row pb-4">
      <div class="col">
        <data-table
          ref="table"
          table-id="tier-programs"
          url="v1/tiers"
          :columns="columns"
          :menu-actions="['edit-tier']"
          @edit-tier="onEditTier"
        ></data-table>
      </div>
    </div>

    <edit-modal ref="editModal" @updated="onUpdate"></edit-modal>
  </div>
</template>


<script>
import DataTable from '../../core/components/common/Datatable.vue';
import EditModal from '../components/EditModal.vue';

export default {
  name: 'TierPrograms',
  components: {
    DataTable,
    EditModal,
  },
  computed: {
    columns() {
      const defs = [
        {
          targets: 4,
          className: 'text-center',
          render(data) {
            return `${data} %`;
          },
        },
        {
          targets: [2, 3],
          className: 'text-center',
        },
      ];

      const headers = [
        'Tier ID',
        'Name',
        'Minimum Vipoints',
        'Maximum Vipoints',
        'Tier Promo Discount',
      ];

      const records = [
        { data: 'tier_id' },
        { data: 'name' },
        { data: 'minimum_points' },
        { data: 'maximum_points' },
        { data: 'percent_discount' },
      ];

      if (this.$store.getters['auth/isAdmin']) {
        records.push({ data: 'tier_id' });
        headers.push('Action');

        defs.push({
          targets: -1,
          orderable: false,
          className: 'text-center',
          render(data) {
            return `
              <div aria-role="group" aria-label="Button group" class="d-flex justify-content-center btn-group-sm btn-group">
                <button 
                  class="btn btn-white btn-primary action-button edit-tier"
                  title="Edit Tier"
                  data-id="${data}">
                  <i class="material-icons">edit</i>
                </button>
              </div>`;
          },
        });
      }
      return {
        header: headers,
        record: records,
        defs,
      };
    },
  },
  methods: {
    async onEditTier(index) {
      const tier = await this.$store.dispatch('tier/showDetails', index);
      this.$store.commit('tier/SET_FORM', tier);
      this.$refs.editModal.show();
    },
    onUpdate() {
      this.$refs.table.refresh();
    },
  },
};
</script>
