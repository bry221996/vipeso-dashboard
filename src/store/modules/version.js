import VersionService from '../../services/versionService';

const state = {
  all: [],
  form: [],
};

const mutations = {
  SET_VERSIONS(state, versions) {
    state.all = versions;
  },
  SET_FORM(state, form) {
    state.form = form;
  },
  UPDATE_VERSION(state, { index, version }) {
    state.form.splice(index, 1, version);
  },
};

const actions = {
  update({ state }) {
    return new Promise((resolve, reject) => {
      VersionService.updateBulk(state.form)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  },
};

const getters = {
  isFormDirty: state => state.form.some((form) => {
    const reference = state.all.find(version => version.app_id === Number(form.app_id));
    return form.version !== reference.version;
  }),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
