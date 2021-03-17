import ReviewService from '../../services/reviewService';

const state = {
  selected: {},
};

const actions = {
  fetchDetails({ commit }, id) {
    return new Promise((resolve, reject) => {
      ReviewService.show(id)
        .then((res) => {
          commit('SET_SELECTED', res.data.data);
          return resolve(res.data.data);
        })
        .catch(err => reject(err));
    });
  },

  verify({ state }, reward) {
    return new Promise((resolve, reject) => {
      ReviewService.verifyReview(state.selected.review_id, reward)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  },
};

const mutations = {
  SET_SELECTED(state, review) {
    state.selected = review;
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
