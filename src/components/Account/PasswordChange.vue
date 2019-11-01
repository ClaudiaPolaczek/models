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
                    <el-submenu index="1">
                        <template slot="title">
                            <font-awesome-icon icon="user-cog" size=" fa-lg" style="margin-right: 10px"/>
                            <span>Profil</span>
                        </template>
                        <el-menu-item @click="$router.push('/user')">Dane osobowe</el-menu-item>
                        <el-menu-item @click="$router.push('/user/password')">Zmiana hasła</el-menu-item>
                        <el-menu-item @click="$router.push('/user/model')"
                                      v-if="showModelBoard">Dane modelki</el-menu-item>
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
                        <el-submenu index="5" >
                            <template slot="title">
                                <font-awesome-icon icon="camera-retro" size=" fa-lg" style="margin-right: 10px"/>
                                <span>Portfolio</span>
                            </template>
                            <el-menu-item @click="$router.push('/user/portfolio')">Wszystkie portfolio</el-menu-item>
                            <el-menu-item @click="$router.push('/')">Dodaj portfolio</el-menu-item>
                            <el-menu-item @click="$router.push('/')">Dodaj zdjęcia</el-menu-item>
                        </el-submenu>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
                    <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                    <el-breadcrumb-item>Konto</el-breadcrumb-item>
                    <el-breadcrumb-item>Zmiana hasła</el-breadcrumb-item>
                </el-breadcrumb>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left">
                    <el-form-item label="Nowe hasło" prop="password">
                        <el-input v-model="ruleForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="Potwierdź hasło" prop="passwordConfirmation">
                        <el-input v-model="ruleForm.passwordConfirmation"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="changePassword">Zapisz</el-button>
                    </el-form-item>
                    <el-form-item>
                        <div class="alert alert-danger" role="alert" v-if="message">{{message}}</div>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import {APIService} from '../../services/APIService';
    const apiService = new APIService();
    import User from "@/models/user";
    export default {
        data() {
            return {
                user: new User('', ''),
                activeIndex: '1',
                numberOfNotifications: '2',
                labelPosition: 'left',
                message:'',
                ruleForm: {
                    password: '',
                    passwordConfirmation: '',
                    rules: {
                        password: [
                            {required: true, message: 'Podaj hasło', trigger: 'change'}
                        ],
                        passwordConfirmation: [
                            {required: true, message: 'Podaj hasło ponownie', trigger: 'change'}
                        ],
                    }
                }
            };
        },
        methods: {
            changePassword() {
                if(this.ruleForm.password != this.ruleForm.passwordConfirmation){
                    this.message = "Podane hasła nie są takie same";
                }else{
                    this.user.username = this.currentUser.username;
                    this.user.password = this.ruleForm.password;
                    apiService.changePassword(this.user).then(
                        data => {
                            this.message = data.message;
                        },
                        error => {
                            this.message = error.message;
                        }
                    );
                }
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
            showModelBoard() {
                if (this.currentUser) {
                    return this.currentUser.role.includes('MODEL');
                }
                return false;
            },
        },
        mounted() {
            if (!this.currentUser) {
                this.$router.push('/login');
            }
        },
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    .container{
        max-width: 1200px;
        margin: auto;
    }

    .el-header {
        background-color: #B3C0D1;
        color: #333;
        min-height: 61px;
    }

    .el-aside{
        background: #4E565F;
        color: white;
    }

    .currentuser{
        text-align: right;
        font-size: 15px;
        margin-top: 20px;
    }

    .el-menu{
        font-size: 25px;
    }

    .el-form{
        max-width: 600px;
    }

    .breadcrumb-container{
        margin-bottom: 40px;
    }
</style>
