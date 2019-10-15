import Vue from 'vue';
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/pl'
import WelcomePage from "@/components/WelcomePage";
import AccountSettings from "@/components/AccountSettings";
import App from "@/components/App";
import Signin from "@/components/Signin";
import Invitations from "@/components/Invitations";
import Signup from "@/components/Signup";
import Notifications from "@/components/Notifications";
import Calendar from "@/components/Calendar";
import UserPortfolio from "@/components/UserPortfolio";
import EditPortfolio from "@/components/EditPortfolio";

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.use(VueRouter)

const  routes = [
  { path: '/', component: WelcomePage},
  { path: '/user', component: AccountSettings},
  { path: '/login', component: Signin},
  { path: '/signup', component: Signup},
  { path: '/invitations', component: Invitations},
  { path: '/notifications', component: Notifications},
  { path: '/calendar', component: Calendar},
  { path: '/portfolio/user', component: UserPortfolio},
  { path: '/portfolio/id', component: EditPortfolio},
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
