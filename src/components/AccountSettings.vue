<template>
        <el-container>
            <el-header>
                <el-menu
                        :default-active="activeIndex"
                        class="el-menu"
                        mode="horizontal"
                        @select="handleSelect"
                        background-color="#B3C0D1"
                        text-color="#333"
                        active-text-color="#333"
                >
                    <el-menu-item index="1">
                        <router-link to="/">
                            Start
                        </router-link>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">Portfolio</template>
                        <el-menu-item index="2-1">Fotograf</el-menu-item>
                        <el-menu-item index="2-2">Model/Modelka</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">Portfolio</template>
                        <el-menu-item index="3-1">Fotograf</el-menu-item>
                        <el-menu-item index="3-2">Model/Modelka</el-menu-item>
                    </el-submenu>
                    <div class="currentuser">
                        <span style="padding: 7em 2em">Imie Nazwisko</span>
                        <el-dropdown>
                            <i class="el-icon-setting" style="margin-right: 10px; margin-left: auto"></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-badge :value="numberOfNotifications" class="item">
                                    <el-dropdown-item >Konto</el-dropdown-item>
                                </el-badge>
                                <el-dropdown-item>Wyloguj</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-menu>
            </el-header>
            <el-container>
                <el-aside width="230px">
                    <el-menu
                            class="el-menu-vertical"
                            @open="handleOpen"
                            @close="handleClose"
                            background-color="#4E565F"
                            text-color="#fff"
                            active-text-color="#fff"
                            style="text-align: left; min-height: 100vh">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-user"></i>
                                <span>Profil</span>

                            </template>
                            <el-menu-item index="1-1">Ustawienia profilu</el-menu-item>
                            <el-menu-item index="1-2">Portfolio</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="2">
                            <i class="el-icon-date"></i>
                            <span>Terminarz</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-message"></i>
                            <span>Zaproszenia</span>
                        </el-menu-item>
                        <el-menu-item index="4">
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
                            <el-breadcrumb-item>Ustawienia profilu</el-breadcrumb-item>
                        </el-breadcrumb>
                        <el-form ref="form" :label-position="labelPosition" :model="form" label-width="140px">
                            <el-form-item label="Imię">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="Nazwisko">
                                <el-input v-model="form.surname"></el-input>
                            </el-form-item>
                            <el-form-item label="Login">
                                <el-input v-model="form.username"></el-input>
                            </el-form-item>
                            <el-form-item label="Hasło">
                                <el-input v-model="form.password"></el-input>
                            </el-form-item>
                            <el-form-item label="Potwierdź hasło">
                                <el-input v-model="form.password"></el-input>
                            </el-form-item>
                            <el-form-item label="Płeć">
                                <el-radio-group v-model="form.gender">
                                    <el-radio label="Kobieta"></el-radio>
                                    <el-radio label="Mężczyzna"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="Data urodzenia" style="align-items: center">
                                <el-col  :span="11">
                                    <el-date-picker type="date" placeholder="Wybierz datę" v-model="form.birthDate" style="width: 100%;">
                                    </el-date-picker>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="Województwo">
                                <el-select v-model="form.region" placeholder="Wybierz">
                                    <el-option
                                            v-for="item in form.options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Miasto">
                                <el-input v-model="form.username"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">Aktualizuj</el-button>
                                <el-button>Anuluj</el-button>
                            </el-form-item>
                        </el-form>
                    </el-main>
                </el-container>
            </el-container>
        </el-container>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: '1',
                numberOfNotifications: '2',
                labelPosition: 'left',
                form: {
                    name: '',
                    surname: '',
                    username: '',
                    password: '',
                    gender: '',
                    city: '',
                    birthDate: '',
                    options: [{
                        value: 'dolnoslaskie',
                        label: 'dolnośląskie'
                    }, {
                        value: 'kujawsko-pomorskie',
                        label: 'kujawsko-pomorskie'
                    }, {
                        value: 'lubelskie',
                        label: 'lubelskie'
                    }, {
                        value: 'lubuskie',
                        label: 'lubuskie'
                    }, {
                        value: 'łódzkie',
                        label: 'łódzkie'
                    }, {
                        value: 'małopolskie',
                        label: 'małopolskie'
                    }, {
                        value: 'mazowieckie',
                        label: 'mazowieckie'
                    }, {
                        value: 'opolskie',
                        label: 'opolskie'
                    }, {
                        value: 'podkarpackie',
                        label: 'podkarpackie'
                    }, {
                        value: 'podlaskie',
                        label: 'podlaskie'
                    }, {
                        value: 'pomorskie',
                        label: 'pomorskie'
                    }, {
                        value: 'śląskie',
                        label: 'śląskie'
                    }, {
                        value: 'świętokrzyskie',
                        label: 'świętokrzyskie'
                    }, {
                        value: 'warmińsko-mazurskie',
                        label: 'warmińsko-mazurskie'
                    }, {
                        value: 'wielkopolskie',
                        label: 'wielkopolskie'
                    }, {
                        value: 'zachodniopomorskie',
                        label: 'zachodniopomorskie'
                    }],
                    region: ''
                }
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            onSubmit() {
                console.log('submit!');
            }
        }
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
