import Vue from 'vue';
import ShardsVue from 'shards-vue';
import VeeValidate from 'vee-validate';
import VueIziToast from 'vue-izitoast';
import VueCarousel from 'vue-carousel';
import vSelect from 'vue-select';
import * as VueGoogleMaps from 'vue2-google-maps';

import App from './App.vue';
import router from './router';
import store from './store/index';

Vue.use(VueCarousel);
Vue.use(ShardsVue);
Vue.use(VueIziToast, {
  position: 'topRight',
  timeout: 1000,
});

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBDwe2zrnGBOB8GoVBWMUQThkze1jEiCPM',
    libraries: 'places',
  },
});

Vue.use(VeeValidate, {
  events: 'input|blur|change',
  fieldsBagName: 'vvFields',
});

Vue.component('v-select', vSelect);
Vue.config.productionTip = false;

Vue.prototype.$eventHub = new Vue();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
