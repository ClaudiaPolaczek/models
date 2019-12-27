import Vue from 'vue';
import router from './router/routing.'
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/pl'
import App from "@/components/App";
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons'
import {
  faHome,
  faUser,
  faUserCircle,
  faUserCog,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faCalendarAlt,
  faEnvelope,
  faBell,
  faCameraRetro
} from '@fortawesome/free-solid-svg-icons';

import VeeValidate from 'vee-validate';

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.prototype.$http = axios
library.add(faHome, faUser, faUserCircle,faUserCog, faUserPlus, faSignInAlt, faSignOutAlt , faCalendarAlt, faEnvelope,
    faBell,faCameraRetro);
library.add(faFacebookSquare, faInstagram)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
