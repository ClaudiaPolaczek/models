<template>
    <el-container>
        <el-container>
                <el-aside width="230px">
                    <Menu/>
                </el-aside>
                    <el-main>
                        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
                            <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                            <el-breadcrumb-item>Konto</el-breadcrumb-item>
                            <el-breadcrumb-item>Dane osobowe</el-breadcrumb-item>
                        </el-breadcrumb>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" label-position="left">
                            <el-form-item label="Imię" prop="name">
                                <el-input v-model="downloadUser.survey.firstName"></el-input>
                            </el-form-item>
                            <el-form-item label="Nazwisko" prop="surname">
                                <el-input v-model="downloadUser.survey.lastName"></el-input>
                            </el-form-item>
                            <el-form-item label="Data urodzenia" style="align-items: center">
                                <el-col  :span="11">
                                    <el-input  v-model="ruleForm.age"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="Województwo">
                                <el-select v-model="ruleForm.region" placeholder="Wybierz">
                                    <el-option
                                            v-for="item in ruleForm.options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Miasto" prop="city">
                                <el-input v-model="ruleForm.city"></el-input>
                            </el-form-item>
                            <el-form-item label="Numer telefonu" prop="city">
                                <el-input v-model="ruleForm.phoneNumber"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="editData">Zapisz</el-button>
                            </el-form-item>
                            <div>{{this.currentUser.role.includes('MODEL')}}</div>
                        </el-form>
                    </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import {APIService} from '../../services/APIService';
    const apiService = new APIService();
    import User from '../../models/user';
    import Menu from "@/components/Account/Menu";
    export default {
        components: {
            Menu
        },
        data() {
            return {
                user: new User('', '', '', '', '', '', '', '', '','', ''),
                activeIndex: '1',
                numberOfNotifications: '2',
                labelPosition: 'left',
                downloadUser: [],
                ruleForm: {
                    region: '',
                    age: '',
                    city: '',
                    phoneNumber: '',
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
                },
                rules: {
                    username: [
                        { required: true, message: 'Podaj login', trigger: 'blur' },
                        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: 'Please select Activity zone', trigger: 'change' }
                    ],
                    city: [
                        { required: true, message: 'Please pick a date', trigger: 'change' }
                    ]
                }
            };
        },
        methods: {
            editData() {
                if(this.currentUser.role.includes('MODEL')){
                    this.editModelByUsername();
                } else if(this.currentUser.role.includes('PHOTOGRAPHER')){
                    this.editPhotographerByUsername();
                }
            },
            getModelByUsername(username) {
                apiService.getModelByUsername(username).then((data) => {
                    this.downloadUser = data;
                    this.ruleForm.age = this.downloadUser.survey.age;
                    this.ruleForm.region = this.downloadUser.survey.region;
                    this.ruleForm.city = this.downloadUser.survey.city;
                    this.ruleForm.phoneNumber = this.downloadUser.survey.phoneNumber;
                });
            },
            getPhotographerByUsername(username) {
                apiService.getPhotographerByUsername(username).then((data) => {
                    this.downloadUser = data;
                    this.ruleForm.age = this.downloadUser.survey.age;
                    this.ruleForm.region = this.downloadUser.survey.region;
                    this.ruleForm.city = this.downloadUser.survey.city;
                    this.ruleForm.phoneNumber = this.downloadUser.survey.phoneNumber;
                });
            },
            editModelByUsername() {
                this.user.firstName = this.downloadUser.survey.firstName;
                this.user.lastName = this.downloadUser.survey.lastName;
                this.user.region = this.ruleForm.region;
                this.user.city = this.ruleForm.city;
                this.user.age = this.ruleForm.age;
                this.user.gender = this.downloadUser.survey.gender;
                this.user.phoneNumber = this.ruleForm.phoneNumber;
                this.user.username = this.downloadUser.user.username;
                this.user.password = this.downloadUser.user.password;
                this.user.hairColor = this.downloadUser.hairColor;
                this.user.eyesColor = this.downloadUser.eyesColor;
                apiService.editModelByUsername(this.$store.state.auth.user.username, this.user).then(
                    data => {
                        this.message = data.message;
                        this.user = data;
                    },
                    error => {
                        this.message = error.message;
                    }
                );
            },
            editPhotographerByUsername() {
                this.user.firstName = this.downloadUser.survey.firstName;
                this.user.lastName = this.downloadUser.survey.lastName;
                this.user.region = this.ruleForm.region;
                this.user.city = this.ruleForm.city;
                this.user.age = this.ruleForm.age;
                this.user.gender = this.downloadUser.survey.gender;
                this.user.phoneNumber = this.ruleForm.phoneNumber;
                this.user.username = this.downloadUser.user.username;
                this.user.password = this.downloadUser.user.password;
                apiService.editPhotographerByUsername(this.$store.state.auth.user.username, this.user).then(
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
            }
        },
        mounted() {
            if(this.currentUser){
                if(this.$store.state.auth.user.role == "[MODEL]"){
                    this.getModelByUsername(this.$store.state.auth.user.username)
                } else if(this.$store.state.auth.user.role == "[PHOTOGRAPHER]"){
                    this.getPhotographerByUsername(this.$store.state.auth.user.username)
                }
            }
            else if (!this.currentUser) {
                this.$router.push('/login');
            }
        },
    }
</script>

<style>
    /*#app {*/
    /*    font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*    -webkit-font-smoothing: antialiased;*/
    /*    -moz-osx-font-smoothing: grayscale;*/
    /*    text-align: center;*/
    /*    color: #2c3e50;*/
    /*}*/
    /*.container{*/
    /*    max-width: 1200px;*/
    /*    margin: auto;*/
    /*}*/

    /*.el-header {*/
    /*    !*background-color: #B3C0D1;*!*/
    /*    !*color: #333;*!*/
    /*    min-height: 61px;*/
    /*}*/

    /*.el-aside{*/
    /*    !*background: #4E565F;*!*/
    /*    !*color: white;*!*/
    /*}*/

    /*.currentuser{*/
    /*    text-align: right;*/
    /*    font-size: 15px;*/
    /*    margin-top: 20px;*/
    /*}*/

    /*.el-menu{*/
    /*    font-size: 25px;*/
    /*}*/

    /*.el-form{*/
    /*    max-width: 600px;*/
    /*}*/

    /*.breadcrumb-container{*/
    /*    margin-bottom: 40px;*/
    /*}*/
</style>
