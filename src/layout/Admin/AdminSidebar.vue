<template>
  <aside :class="sideBarClass">
      <div class="main-navbar">
        <nav
          class="navbar align-items-stretch navbar-light bg-white flex-md-nowrap border-bottom p-0">

          <a class="navbar-brand w-100 mr-0" href="#" style="line-height: 25px;">
            <div class="d-table m-auto">
              <img id="main-logo" class="d-inline-block align-top mr-1" style="max-width: 25px;">
              <span v-if="!hideLogoText" class="d-none d-md-inline ml-1">Vipeso Dashboard</span>
            </div>
          </a>

          <a class="toggle-sidebar d-sm-inline d-md-none d-lg-none" @click="handleToggleSidebar()">
            <i class="material-icons">&#xE5C4;</i>
          </a>

        </nav>
      </div>

      <div class="nav-wrapper">
          <d-nav class="flex-column">
            <li
              v-for="(item, navItemIdx) in items" :key="navItemIdx" class="nav-item dropdown">
              <d-link v-if="item.isVisible" class="nav-link" :to="item.to">
                <div class="item-icon-wrapper" v-if="item.htmlBefore" v-html="item.htmlBefore" />
                <span v-if="item.title">{{ item.title }}</span>
                <div class="item-icon-wrapper" v-if="item.htmlAfter" v-html="item.htmlAfter" />
              </d-link>
            </li>
          </d-nav>
      </div>
  </aside>
</template>

<script>
export default {
  name: 'main-sidebar',
  props: {
    hideLogoText: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      sidebarVisible: false,
    };
  },
  computed: {
    sideBarClass() {
      return [
        'main-sidebar col-12 col-md-3 col-lg-2 px-0', this.sidebarVisible ? 'open' : ''];
    },
  },
  created() {
    this.$eventHub.$on('toggle-sidebar', this.handleToggleSidebar);
  },
  beforeDestroy() {
    this.$eventHub.$off('toggle-sidebar');
  },
  methods: {
    handleToggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },
  },
};
</script>

<style lang="scss">
  .main-sidebar {
    .item-icon-wrapper {
      display: inline-block;
    }
    .dropdown-menu {
      display: block;
    }
  }
</style>
