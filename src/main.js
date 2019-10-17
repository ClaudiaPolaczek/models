import Vue from 'vue';
import router from './router/routing.'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/pl'
import App from "@/components/App";
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
