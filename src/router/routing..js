import Vue from 'vue';
import VueRouter from 'vue-router'
import WelcomePage from "@/components/WelcomePage";
import AccountSettings from "@/components/Account/AccountSettings";
import Signin from "@/components/Basic/Signin";
import Invitations from "@/components/Account/Invitations";
import Signup from "@/components/Basic/Signup";
import InstagramName from "@/components/Account/InstagramName";
import Notifications from "@/components/Account/Notifications";
import Calendar from "@/components/Account/Calendar";
import UserPortfolio from "@/components/Account/UserPortfolio";
import EditPortfolio from "@/components/Account/EditPortfolio";
import PhotographerProfiles from "@/components/Profiles/PhotographerProfiles";
import PhotographerProfile from "@/components/Profiles/PhotographerProfile";
import ModelProfile from "@/components/Profiles/ModelProfile";
import ModelProfiles from "@/components/Profiles/ModelProfiles";
import Portfolio from "@/components/Portfolios/Portfolio";
import Account from "@/components/Account/Account";
import PasswordChange from "@/components/Account/PasswordChange";
import ModelAdditionalData from "@/components/Account/ModelAdditionalData";
import PhotoshootInvitation from "@/components/Profiles/PhotoshootInvitation";
import AdminComments from "@/components/Admin/AdminComments";
import AdminUsers from "@/components/Admin/AdminUsers";
import AddPortfolio from "@/components/Account/AddPortfolio";
import PortfolioImages from "@/components/Portfolios/PortfolioImages";
import PortfolioList from "@/components/Portfolios/PortfolioList";
import Regulations from "@/components/Basic/Regulations";

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        { path: '/', component: WelcomePage},
        { path: '/regulations', component: Regulations},
        { path: '/user', component: AccountSettings},
        { path: '/login', component: Signin},
        { path: '/signup', component: Signup},
        { path: '/invitations', component: Invitations},
        { path: '/notifications', component: Notifications},
        { path: '/calendar', component: Calendar},
        { path: '/user/portfolio', component: UserPortfolio},
        { path: '/user/new/portfolio', component: AddPortfolio},
        { path: '/user/password', component: PasswordChange},
        { path: '/user/instagram', component: InstagramName},
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
        { path: '/photoshoot/:username', component: PhotoshootInvitation},
        { path: '/admin/comments', component: AdminComments},
        { path: '/admin/users', component: AdminUsers},
    ],
    mode: 'history',
})


