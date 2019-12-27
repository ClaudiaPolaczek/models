import Vue from 'vue';
import VueRouter from 'vue-router'
import WelcomePage from "@/components/WelcomePage";
import AccountSettings from "@/components/Account/AccountSettings";
import Signin from "@/components/Signin";
import Invitations from "@/components/Account/Invitations";
import Signup from "@/components/Signup";
import Notifications from "@/components/Account/Notifications";
import Calendar from "@/components/Account/Calendar";
import UserPortfolio from "@/components/Account/UserPortfolio";
import EditPortfolio from "@/components/Account/EditPortfolio";
import PhotographerProfiles from "@/components/Profiles/PhotographerProfiles";
import PhotographerProfile from "@/components/Profiles/PhotographerProfile";
import ModelProfile from "@/components/Profiles/ModelProfile";
import ModelProfiles from "@/components/Profiles/ModelProfiles";
import Portfolio from "@/components/Portfolio";
import Account from "@/components/Account/Account";
import Home from "@/components/headers/Home";
import PasswordChange from "@/components/Account/PasswordChange";
import ModelAdditionalData from "@/components/Account/ModelAdditionalData";
import PhotoshootInvitation from "@/components/PhotoshootInvitation";
import AdminComments from "@/components/admin/AdminComments";
import AdminUsers from "@/components/admin/AdminUsers";
import AddPortfolio from "@/components/Account/AddPortfolio";
import PortfolioImages from "@/components/PortfolioImages";
import PortfolioList from "@/components/Portfolios/PortfolioList";

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
        { path: '/user/portfolio', component: UserPortfolio},
        { path: '/user/new/portfolio', component: AddPortfolio},
        { path: '/user/password', component: PasswordChange},
        { path: '/user/model', component: ModelAdditionalData},
        { path: '/portfolios/edit/:id', component: EditPortfolio},
        { path: '/portfolios/u/:username', component: PortfolioList},
        { path: '/portfolios', component: Portfolio},
        { path: '/portfolios/:id', component: PortfolioImages},
        { path: '/photographers', component: PhotographerProfiles},
        { path: '/photographers/:id', component: PhotographerProfile},
        { path: '/models', component: ModelProfiles},
        { path: '/models/:id', component: ModelProfile},
        { path: '/account', component: Account},
        { path: '/home', component: Home},
        { path: '/photoshoot/:username', component: PhotoshootInvitation},
        { path: '/admin/comments', component: AdminComments},
        { path: '/admin/users', component: AdminUsers},
        { path: '/admin', name: 'admin',
            // lazy-loaded
            component: () => import('@/components/headers/BoardAdmin.vue')
        },
        {
            path: '/user',
            name: 'user',
            // lazy-loaded
            component: () => import('@/components/headers/BoardUser.vue')
        }
    ],
    mode: 'history',

})


