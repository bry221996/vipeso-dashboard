import StoreService from '../../services/storeService';

const state = {
  partners: [],
  form: {
    store_hours: [],
  },
  selected: {},
  analytics: {},
};

const actions = {
  getPartners({ commit }) {
    return new Promise((resolve, reject) => {
      StoreService.fetch('sort=-is_partner')
        .then((res) => {
          const { data } = res.data;
          const partnerStores = data.filter(store => store.is_partner);

          commit('SET_PARTNERS', partnerStores);
          return resolve(partnerStores);
        })
        .catch(err => reject(err));
    });
  },

  showDetails({ commit }, id) {
    return new Promise((resolve, reject) => {
      StoreService.show(id)
        .then((res) => {
          commit('SET_SELECTED', res.data.data);
          return resolve(res.data.data);
        })
        .catch(err => reject(err));
    });
  },

  createNew({ state }) {
    return new Promise((resolve, reject) => {
      StoreService.store(state.form)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  },

  updateDetails({ state }) {
    return new Promise((resolve, reject) => {
      StoreService.update(state.selected.store_id, state.form)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  },

  updateLogo({ state }, id) {
    return new Promise((resolve, reject) => {
      StoreService.uploadLogo(id, state.form.logo)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  },

  addBusinessHours({ state }, id) {
    return new Promise((resolve, reject) => {
      StoreService.addBusinessHours(id, state.form.store_hours)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  },

  addPhotos({ state }, id) {
    const images = state.form.images.filter(photo => photo.file);

    return new Promise((resolve, reject) => {
      StoreService.uploadPhotos(id, images)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  },

  fetchAnalytics({ commit }, id) {
    return new Promise((resolve, reject) => {
      StoreService.analytics(id)
        .then((res) => {
          commit('SET_ANALYTICS', res.data.data);
          return resolve(res.data.data);
        })
        .catch(err => reject(err));
    });
  },
};

const mutations = {
  SET_PARTNERS(state, stores) {
    state.partners = stores;
  },
  SET_FORM(state, form) {
    state.form = form;
  },
  SET_STORE_HOURS(state, hours) {
    state.form.store_hours = hours;
  },
  SET_SPECIFIC_STORE_HOUR(state, { index, hour }) {
    state.form.store_hours.splice(index, 1, hour);
  },
  ADD_PHOTOS(state, photos) {
    state.form.images = photos;
  },
  CLEAR_FORM(state) {
    state.form = {
      store_hours: [],
    };
  },
  SET_SELECTED(state, store) {
    state.selected = store;
  },
  SET_ANALYTICS(state, analytics) {
    state.analytics = analytics;
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
