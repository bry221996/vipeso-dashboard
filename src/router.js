import Vue from 'vue';
import Router from 'vue-router';
import store from './store/index';

/** Layouts */
import AdminLayout from './layout/Admin/AdminLayout.vue';

/** Pages */
import Analytics from './modules/analytics/pages/Index.vue';

import StoreIndex from './modules/stores/pages/Index.vue';
import StoreList from './modules/stores/pages/List.vue';
import StoreForm from './modules/stores/pages/Form.vue';
import StoreDetails from './modules/stores/pages/Details.vue';

import GameRewardIndex from './modules/game-rewards/pages/Index.vue';
import GameRewardList from './modules/game-rewards/pages/List.vue';
import GameRewardForm from './modules/game-rewards/pages/Form.vue';

import StaffList from './modules/staffs/pages/List.vue';
import UserList from './modules/users/pages/List.vue';
import CardList from './modules/cards/pages/List.vue';
import OrderList from './modules/orders/pages/List.vue';
import TransactionList from './modules/transactions/pages/List.vue';
import ReviewList from './modules/reviews/pages/List.vue';
import UserRewardList from './modules/user-rewards/pages/List.vue';
import TierProgramList from './modules/tiers/pages/List.vue';
import AppVersionList from './modules/app-versions/pages/List.vue';

import LoginPage from './modules/auth/pages/Login.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  routes: [
    {
      path: '/',
      name: 'admin',
      component: AdminLayout,
      redirect: '/staffs',
      beforeEnter(to, from, next) {
        if (store.getters['auth/isLoggedIn']) {
          return next();
        }
        return next('/login');
      },
      children: [
        {
          path: 'analytics',
          name: 'analytics',
          component: Analytics,
        },
        {
          path: 'stores',
          component: StoreIndex,
          children: [
            {
              path: '',
              name: 'store-list',
              component: StoreList,
              meta: {
                title: 'Stores',
              },
            },
            {
              path: 'create',
              name: 'create-store',
              component: StoreForm,
              meta: {
                title: 'Create Store',
                editing: false,
              },
            },
            {
              path: ':id',
              name: 'store-details',
              component: StoreDetails,
              meta: {
                title: 'Store Details',
              },
            },
            {
              path: ':id/edit',
              name: 'edit-store',
              component: StoreForm,
              meta: {
                title: 'Edit Store',
                editing: true,
              },
            },
          ],
        },
        {
          path: 'staffs',
          name: 'staff-list',
          component: StaffList,
        },
        {
          path: 'users',
          name: 'user-list',
          component: UserList,
        },
        {
          path: 'cards',
          name: 'card-list',
          component: CardList,
        },
        {
          path: 'orders',
          name: 'order-list',
          component: OrderList,
        },
        {
          path: 'transactions',
          name: 'transaction-list',
          component: TransactionList,
        },
        {
          path: 'reviews',
          name: 'review-list',
          component: ReviewList,
        },
        {
          path: 'game-rewards',
          component: GameRewardIndex,
          children: [
            {
              path: '',
              component: GameRewardList,
              name: 'game-reward-list',
              meta: {
                title: 'Game Rewards',
              },
            },
            {
              path: 'create',
              component: GameRewardForm,
              name: 'create-game-reward',
              meta: {
                title: 'Create Game Reward',
              },
            },
          ],
        },
        {
          path: 'user-rewards',
          name: 'user-reward-list',
          component: UserRewardList,
        },
        {
          path: 'tiers',
          name: 'tier-program-list',
          component: TierProgramList,
        },
        {
          path: 'app-versions',
          name: 'app-version-list',
          component: AppVersionList,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      beforeEnter(to, from, next) {
        if (store.getters['auth/isLoggedIn']) {
          return next('/analytics');
        }
        return next();
      },
    },
  ],
});
