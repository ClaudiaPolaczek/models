<template>
    <el-container>
        <el-header>
            <el-menu
                    :default-active="activeIndex"
                    class="el-menu"
                    mode="horizontal"
                    background-color="#B3C0D1"
                    text-color="#333"
                    active-text-color="#333"
                    :router="true">
                <el-menu-item index="1" :route="{path:'/'}">
                    Start
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">Portfolio</template>
                    <el-menu-item index="2-1" :route="{path:''}">Fotograf</el-menu-item>
                    <el-menu-item index="2-2" :route="{path:''}" >Model/Modelka</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">Profile</template>
                    <el-menu-item index="3-1" @click="$router.push('/photographers')">
                        Fotograf
                    </el-menu-item>
                    <el-menu-item index="3-2" @click="$router.push('/models')">
                        Model/Modelka
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="4" style="float: right;">
                    <template slot="title"><i class="el-icon-setting"></i></template>
                    <el-menu-item index="4-1" :route="{path:'user'}"><i class="el-icon-user"></i>
                        <el-badge :value="numberOfNotifications" class="item">
                            Konto
                        </el-badge>
                    </el-menu-item>
                    <el-menu-item index="4-2"><i class="el-icon-circle-close"></i>
                        Wyloguj
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="5" style="float: right;" :route="{path:'login'}">
                    <span style="padding: 7em 2em">Logowanie</span>
                </el-menu-item>
            </el-menu>
        </el-header>
        <el-container>
            <el-aside width="230px">
                <el-menu
                        class="el-menu-vertical"
                        background-color="#4E565F"
                        text-color="#fff"
                        active-text-color="#fff"
                        style="text-align: left; min-height: 100vh"
                        :router="true">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-user"></i>
                            <span>Profil</span>
                        </template>
                        <el-menu-item index="1-1" @click="$router.push('/user')">Ustawienia profilu</el-menu-item>
                        <el-menu-item index="1-2" @click="$router.push('/portfolio/user')">Portfolio</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="2" :route="{path:'calendar'}">
                        <i class="el-icon-date"></i>
                        <span>Terminarz</span>
                    </el-menu-item>
                    <el-menu-item index="3" :route="{path:'invitations'}">
                        <i class="el-icon-message"></i>
                        <span>Zaproszenia</span>
                    </el-menu-item>
                    <el-menu-item index="4" :route="{path:'notifications'}">
                        <i class="el-icon-bell"></i>
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
                    <el-card>
                                <header>
                                    <h3>
                                        <strong>{{currentUser.username}}</strong>
                                    </h3>
                                </header>
                                <p>
                                    <strong>Imię:</strong>
                                    {{user.survey.firstName}}
                                </p>
                                <strong>Rola:</strong>
                                {{currentUser.role}}
                    </el-card>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>


<script>
    import User from '../models/user';
    import {APIService} from '../services/APIService';
    const apiService = new APIService();
    export default {
        name: 'account',
        data() {
            return {
                username: '',
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
            }
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
        }
    };
</script>

<style scoped>

</style>
