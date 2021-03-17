import AuthService from '../../services/authService';
import StoreService from '../../services/storeService';

const state = {
  passport: JSON.parse(localStorage.getItem('passport')) || {},
  user: JSON.parse(localStorage.getItem('user')) || {},
  store: JSON.parse(localStorage.getItem('store')) || {},
  form: {},
};

const mutations = {
  SET_PASSPORT(state, passport) {
    state.passport = passport;
    localStorage.setItem('passport', JSON.stringify(passport));
  },
  SET_USER(state, user) {
    state.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  },
  SET_CURRENT_STORE(state, store) {
    state.store = store;
    localStorage.setItem('store', JSON.stringify(store));
  },
  SET_FORM(state, form) {
    state.form = form;
  },
  CLEAR_ALL(state) {
    localStorage.removeItem('passport');
    localStorage.removeItem('user');
    localStorage.removeItem('store');

    state.user = {};
    state.passport = {};
    state.store = {};
  },
};

const actions = {
  attemptLogin({ commit, state }) {
    return new Promise((resolve, reject) => {
      AuthService.login(state.form)
        .then((res) => {
          commit('SET_PASSPORT', res.data);
          return resolve(res.data);
        })
        .catch(err => reject(err));
    });
  },

  getCurrentUser({ commit }) {
    return new Promise((resolve, reject) => {
      AuthService.current()
        .then((res) => {
          commit('SET_USER', res.data);
          return resolve(res.data);
        })
        .catch(err => reject(err));
    });
  },

  getCurrentStore({ commit }, id) {
    return new Promise((resolve, reject) => {
      StoreService.show(id)
        .then((res) => {
          commit('SET_CURRENT_STORE', res.data.data);
          return resolve(res.data);
        })
        .catch(err => reject(err));
    });
  },
};

const getters = {
  isLoggedIn(state) {
    return 'access_token' in state.passport;
  },
  token(state) {
    return state.passport.access_token;
  },
  isAdmin(state) {
    return state.user.id === 0;
  },
  isPlatformStaff(state) {
    return 'roles' in state.user ? state.user.roles.some(role => role.pivot.store_id === 0) : false;
  },
  hasAccess(state) {
    return 'roles' in state.user ? state.user.roles.some(role => role.pivot.role_id !== 3) : false;
  },
  employeeAt(state) {
    return 'roles' in state.user ? state.user.roles.map(role => role.pivot.store_id) : null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
