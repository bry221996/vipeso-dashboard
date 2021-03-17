<template>
  <div class="container-fluid" v-if="isLoaded">
    <div class="row">
      <admin-sidebar :items="sidebarItems" />

      <main class="main-content offset-lg-2 offset-md-3 p-0 col-sm-12 col-md-9 col-lg-10">
        <admin-navbar />

        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import AdminSidebar from './AdminSidebar.vue';
import AdminNavbar from './AdminNavbar.vue';
import getSidebarItems from './data/sidebarItems';

export default {
  name: 'AdminLayout',
  components: {
    AdminSidebar,
    AdminNavbar,
  },
  data() {
    return {
      isLoaded: false,
      sidebarItems: getSidebarItems(),
    };
  },
  async mounted() {
    await this.$store.dispatch('role/getAll');
    await this.$store.dispatch('store/getPartners');
    this.isLoaded = true;
  },
};
</script>
