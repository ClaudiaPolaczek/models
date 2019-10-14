import Vue from 'vue';
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/pl'
import WelcomePage from "@/components/WelcomePage";
import AccountSettings from "@/components/AccountSettings";
import App from "@/components/App";

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.use(VueRouter)

const  routes = [
  { path: '/', component: WelcomePage},
  { path: '/user', component: AccountSettings},
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')
