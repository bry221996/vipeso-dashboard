<template>
  <div class="container-fluid">
    <div class="row no-gutters page-header py-4">
      <div class="col-12 col-sm-8 text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Dashboard</span>
        <h3 class="page-title">{{ $route.meta.title }}</h3>
      </div>
      <div
        :class="[
        'col-12',
        'col-sm-4',
        'col-lg-4',
        'd-flex',
        'align-items-end',
        'justify-content-center',
        'justify-content-sm-end'
        ]"
      >
        <button
          class="btn btn-outline-info btn-pill px-5"
          @click.prevent="navigate"
        >{{ buttonText }}</button>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'StoreIndex',
  computed: {
    onListPage() {
      return this.$route.name === 'store-list';
    },
    buttonText() {
      return this.onListPage ? 'Add New Store' : 'Back';
    },
  },
  methods: {
    navigate() {
      const redirect = this.onListPage ? '/stores/create' : '/stores';
      this.$store.commit('store/CLEAR_FORM');
      this.$router.push(redirect);
    },
  },
};
</script>
