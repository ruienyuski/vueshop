import Vue from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
// loading-Animating
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// vee-validate
import VeeValidate from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';

import App from './App.vue';
import router from './router';
import './bus';
import dateFilter from './filters/date';
import currencyFilter from './filters/currency';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_TW', zhTWValidate);

Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);

axios.defaults.withCredentials = true;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
