import Vue from 'vue';
import Vuex from 'vuex';

import role from './modules/role';
import store from './modules/store';
import auth from './modules/auth';
import tier from './modules/tier';
import review from './modules/review';
import version from './modules/version';
import gameReward from './modules/gameReward';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    role,
    store,
    auth,
    tier,
    review,
    version,
    gameReward,
  },
  strict: debug,
});
