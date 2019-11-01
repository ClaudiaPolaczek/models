<template>
    <el-container>
        <el-container>
            <el-aside width="230px">
                <el-menu
                        class="el-menu-vertical"
                        background-color="#4E565F"
                        text-color="#fff"
                        active-text-color="#fff"
                        style="text-align: left; min-height: 100vh"
                        :router="true">
                    <el-submenu index="1" >
                        <template slot="title">
                            <font-awesome-icon icon="user-cog" size=" fa-lg" style="margin-right: 10px"/>
                            <span>Profil</span>
                        </template>
                        <el-menu-item @click="$router.push('/user')">Dane osobowe</el-menu-item>
                        <el-menu-item @click="$router.push('/user/password')">Zmiana hasła</el-menu-item>
                        <el-menu-item @click="$router.push('/user/model')"
                                      v-if="showModelBoard">Dane modelki</el-menu-item>
                        <el-menu-item @click="$router.push('/user/portfolio')">Portfolio</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="2" @click="$router.push('/calendar')">
                        <font-awesome-icon icon="calendar-alt" size=" fa-lg" style="margin-right: 10px"/>
                        <span>Terminarz</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="$router.push('/invitations')">
                        <font-awesome-icon icon="envelope" size=" fa-lg" style="margin-right: 10px"/>
                        <span>Sesje zdjęciowe</span>
                    </el-menu-item>
                    <el-menu-item index="4" @click="$router.push('/notifications')">
                        <font-awesome-icon icon="bell" size=" fa-lg" style="margin-right: 10px"/>
                        <span>Powiadomienia</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
                        <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                        <el-breadcrumb-item>Konto</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-card style="text-align: left">
                        <h3>{{currentUser.username}}</h3>
                        <p><strong>Imię: </strong>{{user.survey.firstName}}</p>
                        <p><strong>Nazwisko: </strong>{{user.survey.lastName}}</p>
                        <p><strong>Wiek: </strong>{{user.survey.age}}</p>
                        <p><strong>Płeć: </strong>{{getGender(user.survey.gender)}}</p>
                        <p><strong>Województwo: </strong>{{user.survey.region}}</p>
                        <p><strong>Miasto: </strong>{{user.survey.city}}</p>
                        <p><strong>Numer telefonu: </strong>{{user.survey.phoneNumber}}</p>
                        <strong>Rola: </strong>{{currentUser.role}}
                    </el-card>
                    <el-button type="primary" @click="deleteUser(currentUser.username)">Usuń profil</el-button>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>


<script>
    import {APIService} from '../../services/APIService';
    const apiService = new APIService();
    export default {
        name: 'account',
        data() {
            return {
                username: '',
                message: '',
                user: []
            }
        },
        computed: {
            currentUser() {
                 if(this.$store.state.auth.user.role == "[MODEL]"){
                     this.getModelByUsername( this.$store.state.auth.user.username)
                 }
                else if(this.$store.state.auth.user.role == "[PHOTOGRAPHER]"){
                    this.getPhotographerByUsername( this.$store.state.auth.user.username)
                }
                return this.$store.state.auth.user;
            },
            showModelBoard() {
                if (this.currentUser) {
                    return this.$store.state.auth.user.role == "[MODEL]";
                }
                return false;
            },
        },
        mounted() {
            if (!this.currentUser) {
                this.$router.push('/login');
            }
        },
        methods: {
            getModelByUsername(username) {
                apiService.getModelByUsername(username).then((data) => {
                    this.user = data;
                });
            },
            getPhotographerByUsername(username) {
                apiService.getPhotographerByUsername(username).then((data) => {
                    this.user = data;
                });
            },
            getGender(gender){
                if(gender=='W') return "Kobieta"
                else if (gender=='M') return "Mężczyzna"
            },
            deleteUser(username) {
                apiService.deleteUser(username).then((data) => {
                    this.message = data;
                });
                this.$store.dispatch('auth/logout');
                this.$router.push('/');
            },
        }
    };
</script>

<style scoped>

</style>
