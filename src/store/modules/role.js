import Service from '../../services/service';

const state = {
  all: [],
};

const mutations = {
  SET_ROLES(state, roles) {
    state.all = roles;
  },
};

const actions = {
  getAll({ commit }) {
    return new Promise((resolve, reject) => {
      Service().get('/api/roles')
        .then((res) => {
          commit('SET_ROLES', res.data);
          return resolve(res.data);
        })
        .catch(err => reject(err));
    });
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
