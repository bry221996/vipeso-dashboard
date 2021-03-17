<template>
  <div class="main-navbar bg-white sticky-top">
    <nav type="light" class="align-items-stretch flex-md-nowrap p-0 navbar navbar-light">
      <d-form class="main-navbar__search w-100 d-none d-md-flex d-lg-flex"></d-form>

      <ul class="border-left flex-row navbar-nav">
        <li class="nav-item border-right dropdown notifications">
          <a class="nav-link nav-link-icon text-center" v-d-toggle.notifications>
            <div class="nav-link-icon__wrapper">
              <i class="material-icons">&#xE7F4;</i>
              <d-badge pill theme="danger"></d-badge>
            </div>
          </a>
          <d-collapse id="notifications" class="dropdown-menu dropdown-menu-small">
            <d-dropdown-item class="notification__all text-center">No Notification</d-dropdown-item>
          </d-collapse>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-nowrap px-3" v-d-toggle.user-actions>
            <img src="@/assets/images/avatar.png"
              class="user-avatar rounded-circle mr-2"
              alt="User Avatar"
            />
            <span class="d-none d-md-inline-block"> {{ displayName }} </span>
          </a>
          <d-collapse id="user-actions" class="dropdown-menu dropdown-menu-small">
            <d-dropdown-item class="text-danger">
              <i class="material-icons text-danger">&#xE879;</i>
              <span @click="logout">Logout</span>
            </d-dropdown-item>
          </d-collapse>
        </li>
      </ul>

      <nav class="nav">
        <a
          href="#"
          class="nav-link nav-link-icon toggle-sidebar d-md-inline d-lg-none text-center"
           @click.prevent="toggleSidebar" >
          <i class="material-icons">&#xE5D2;</i>
        </a>
      </nav>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AdminNavbar',
  computed: {
    ...mapState('auth', {
      current: 'user',
    }),
    displayName() {
      return this.current.username || this.current.mobile || 'Admin';
    },
  },
  methods: {
    logout() {
      this.$store.commit('auth/CLEAR_ALL');
      this.$router.push('/login');
    },
    toggleSidebar() {
      this.$eventHub.$emit('toggle-sidebar');
    },
  },
};
</script>
