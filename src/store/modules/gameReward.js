import GameRewardService from '../../services/gameRewardService';

const state = {
  form: {
    reward: {},
    stores: [],
  },
};

const mutations = {
  SET_FORM(state, form) {
    state.form = form;
  },
  SET_REWARD_FORM(state, reward) {
    state.form.reward = reward;
  },
  SET_REWARD_STORES(state, stores) {
    state.form.stores = stores;
  },
  CLEAR_FORM(state) {
    state.form = {
      reward: {},
      stores: [],
    };
  },
};

const actions = {
  create({ state }) {
    return new Promise((resolve, reject) => {
      GameRewardService.store(state.form)
        .then(res => resolve(res.data.meta))
        .catch(err => reject(err));
    });
  },
};

const getters = {
  isCreatingCoupon: state => Object.is(state.form.type, 'App\\Coupon'),
  isCreatingLoad: state => Object.is(state.form.type, 'App\\Load'),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
