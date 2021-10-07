import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import App from './App.vue';
import { router } from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { setupComponents } from './config/setup-components';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

import dateMixin from './mixins/date';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt,faUserSecret);

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

setupComponents(Vue);

Vue.use(Vuex);

// Globally
Vue.mixin(dateMixin);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
