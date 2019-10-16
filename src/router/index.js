import Vue from 'vue';
import VueRouter from 'vue-router'
import WelcomePage from "@/components/WelcomePage";
import AccountSettings from "@/components/AccountSettings";
import Signin from "@/components/Signin";
import Invitations from "@/components/Invitations";
import Signup from "@/components/Signup";
import Notifications from "@/components/Notifications";
import Calendar from "@/components/Calendar";
import UserPortfolio from "@/components/UserPortfolio";
import EditPortfolio from "@/components/EditPortfolio";
import Profiles from "@/components/Profiles";
import Profile from "@/components/Profile";

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        { path: '/', component: WelcomePage},
        { path: '/user', component: AccountSettings},
        { path: '/login', component: Signin},
        { path: '/signup', component: Signup},
        { path: '/invitations', component: Invitations},
        { path: '/notifications', component: Notifications},
        { path: '/calendar', component: Calendar},
        { path: '/portfolio/user', component: UserPortfolio},
        { path: '/portfolio/id', component: EditPortfolio},
        { path: '/photographers', component: Profiles},
        { path: '/user/id', component: Profile},
    ],
    mode: 'history'
})
