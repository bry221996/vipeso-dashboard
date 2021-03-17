import TierService from '../../services/tierService';

const state = {
  selected: {},
  form: {},
};

const actions = {
  showDetails({ commit }, id) {
    return new Promise((resolve, reject) => {
      TierService.show(id)
        .then((res) => {
          commit('SET_SELECTED', res.data.data);
          return resolve(res.data.data);
        })
        .catch(err => reject(err));
    });
  },

  updateDetails({ commit, state }) {
    return new Promise((resolve, reject) => {
      const params = {
        tierId: state.form.tier_id,
        percentDiscount: state.form.percent_discount,
        name: state.form.name,
      };

      TierService.update(params)
        .then((res) => {
          commit('SET_SELECTED', {});
          commit('SET_FORM', {});
          return resolve(res.data);
        })
        .catch(err => reject(err));
    });
  },
};

const mutations = {
  SET_SELECTED(state, tier) {
    state.selected = tier;
  },
  SET_FORM(state, form) {
    state.form = form;
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
