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
            <el-main>
                <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
                    <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                    <el-breadcrumb-item>Konto</el-breadcrumb-item>
                    <el-breadcrumb-item>Dane modelki</el-breadcrumb-item>
                </el-breadcrumb>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" label-position="left">
                    <el-form-item label="Kolor włosów">
                        <el-select v-model="ruleForm.hairColor" placeholder="Wybierz">
                            <el-option
                                    v-for="item in ruleForm.hairColors"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Kolor oczu">
                        <el-select v-model="ruleForm.eyesColor" placeholder="Wybierz">
                            <el-option
                                    v-for="item in ruleForm.eyesColors"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="editModelByUsername">Zapisz</el-button>
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
    import User from '../../models/user';
    export default {
        data() {
            return {
                user: new User('', '', '', '', '', '', '', '', '','', ''),
                activeIndex: '1',
                labelPosition: 'left',
                model: [],
                ruleForm: {
                    hairColor: '',
                    eyesColor: '',
                    eyesColors: [{
                        value: 'niebieskie',
                        label: 'niebieskie'
                    }, {
                        value: 'brązowe',
                        label: 'brązowe'
                    }, {
                        value: 'szare',
                        label: 'szare'
                    }, {
                        value: 'piwne',
                        label: 'piwne'
                    }, {
                        value: 'zielone',
                        label: 'zielone'
                    }, {
                        value: 'inne',
                        label: 'inne'
                    }, {
                        value: '',
                        label: '-'
                    },],
                    hairColors: [{
                        value: 'brązowe',
                        label: 'brązowe'
                    }, {
                        value: 'blond',
                        label: 'blond'
                    }, {
                        value: 'czarne',
                        label: 'czarne'
                    }, {
                        value: 'rude',
                        label: 'rude'
                    }, {
                        value: 'siwe',
                        label: 'siwe'
                    }, {
                        value: 'inne',
                        label: 'inne'
                    }, {
                        value: '',
                        label: '-'
                    },],
                },
            };
        },
        methods: {
            getModelByUsername(username) {
                apiService.getModelByUsername(username).then((data) => {
                    this.model = data;
                    this.ruleForm.hairColor = data.hairColor;
                    this.ruleForm.eyesColor = data.eyesColor;
                });
            },
            editModelByUsername() {
                this.user.firstName = this.model.survey.firstName;
                this.user.lastName = this.model.survey.lastName;
                this.user.region = this.model.survey.region;
                this.user.city = this.model.survey.city;
                this.user.age = this.model.survey.age;
                this.user.gender = this.model.survey.gender;
                this.user.phoneNumber = this.model.survey.phoneNumber;
                this.user.username = this.model.user.username;
                this.user.password = this.model.user.password;
                this.user.hairColor = this.ruleForm.hairColor;
                this.user.eyesColor = this.ruleForm.eyesColor;
                apiService.editModelByUsername(this.$store.state.auth.user.username, this.user).then(
                    data => {
                        this.message = data.message;
                        this.user = data;
                    },
                    error => {
                        this.message = error.message;
                    }
                );
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
            if(this.currentUser){
                if(this.$store.state.auth.user.role == "[MODEL]"){
                    this.getModelByUsername(this.$store.state.auth.user.username)
                }
            }
            else if (!this.currentUser) {
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
