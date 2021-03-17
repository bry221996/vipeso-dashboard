import store from '../../../store/index';

const getSidebarItems = () => [
  {
    title: 'Analytics',
    to: {
      name: 'analytics',
    },
    htmlBefore: '<i class="material-icons">insert_chart_outlined</i>',
    htmlAfter: '',
    isVisible: true,
  },
  {
    title: 'Stores',
    htmlBefore: '<i class="material-icons">store</i>',
    to: {
      name: 'store-list',
    },
    isVisible: store.getters['auth/isPlatformStaff'],
  },
  {
    title: 'Staffs',
    htmlBefore: '<i class="material-icons">people</i>',
    to: {
      name: 'staff-list',
    },
    isVisible: true,
  },
  {
    title: 'Users',
    htmlBefore: '<i class="material-icons">person_outline</i>',
    to: {
      name: 'user-list',
    },
    isVisible: store.getters['auth/isPlatformStaff'],
  },
  {
    title: 'Cards',
    htmlBefore: '<i class="material-icons">credit_card</i>',
    to: {
      name: 'card-list',
    },
    isVisible: store.getters['auth/isPlatformStaff'],
  },
  {
    title: 'Orders',
    htmlBefore: '<i class="material-icons">fastfood</i>',
    to: {
      name: 'order-list',
    },
    isVisible: true,
  },
  {
    title: 'Transactions',
    htmlBefore: '<i class="material-icons">local_atm</i>',
    to: {
      name: 'transaction-list',
    },
    isVisible: store.getters['auth/isPlatformStaff'],
  },
  {
    title: 'Reviews',
    htmlBefore: '<i class="material-icons">credit_card</i>',
    to: {
      name: 'review-list',
    },
    isVisible: true,
  },
  {
    title: 'Game Rewards',
    htmlBefore: '<i class="material-icons">games</i>',
    to: {
      name: 'game-reward-list',
    },
    isVisible: true,
  },
  {
    title: 'User Rewards',
    htmlBefore: '<i class="material-icons">local_atm</i>',
    to: {
      name: 'user-reward-list',
    },
    isVisible: true,
  },
  {
    title: 'Tier Programs',
    htmlBefore: '<i class="material-icons">trending_up</i>',
    to: {
      name: 'tier-program-list',
    },
    isVisible: store.getters['auth/isPlatformStaff'],
  },
  {
    title: 'App Versions',
    htmlBefore: '<i class="material-icons">android</i>',
    to: {
      name: 'app-version-list',
    },
    isVisible: store.getters['auth/isPlatformStaff'],
  },
];

export default getSidebarItems;
