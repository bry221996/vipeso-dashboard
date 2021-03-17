<template>
  <div class="col-sm-6 col-md-5 col-lg-4" v-if="! isPlatform">
    <div class="form-group">
      <label class="page-subtitle m-0">Current Store:</label>
      <v-select
        :searchable="false"
        :clearable="false"
        :options="storeOptions"
        :value="`${currentStore.store_name} - ${currentStore.locality}`"
        @input="onInput"
      ></v-select>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'StoreOptions',
  computed: {
    ...mapState('store', {
      partners: 'partners',
    }),
    ...mapState('auth', {
      currentStore: 'store',
    }),
    ...mapGetters('auth', {
      employeeAt: 'employeeAt',
      isPlatform: 'isPlatformStaff',
    }),
    storeOptions() {
      const stores = this.partners.filter(store => this.employeeAt.includes(store.store_id));

      return stores.map(store => ({
        label: `${store.store_name} - ${store.locality}`,
        code: store.store_id,
      }));
    },
  },
  methods: {
    onInput(value) {
      const store = this.partners.find(s => s.store_id === value.code);
      this.$store.commit('auth/SET_CURRENT_STORE', store);
      this.$emit('change');
    },
  },
};
</script>
