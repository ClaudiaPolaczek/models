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
                        <el-col span="10">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px" class="demo-ruleForm" label-position="left">
                            <el-form-item label="Imię" prop="firstName">
                                <el-input v-model="ruleForm.firstName"></el-input>
                            </el-form-item>
                            <el-form-item label="Nazwisko" prop="lastName">
                                <el-input v-model="ruleForm.lastName"></el-input>
                            </el-form-item>
                            <el-form-item label="Rok urodzenia" style="align-items: center" prop="birthdayYear">
                                    <el-input  v-model="ruleForm.birthdayYear"></el-input>
                            </el-form-item>
                            <el-form-item label="Województwo" prop="region">
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
                            <el-form-item label="Numer telefonu" prop="phoneNumber">
                                <el-input v-model="ruleForm.phoneNumber"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="editData">Zapisz</el-button>
                            </el-form-item>
                        </el-form>
                        </el-col>
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
                    birthdayYear: '',
                    city: '',
                    phoneNumber: '',
                    firstName: '',
                    lastName: '',
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
                    region: [
                        { required: true, message: 'Wybierz wojewódźtwo', trigger: 'change' }
                    ],
                    city: [
                        { required: true, message: 'Podaj miasto', trigger: 'change' },
                        { min: 3, message: 'Nazwa miasta musi być dłuższa niż 3 litery', trigger: 'blur' }
                    ],
                    firstName: [
                        { required: true, message: 'Podaj imię', trigger: 'blur' },
                        { min: 3, message: 'Długość imienia powinna być dłuższa niż 3 litery', trigger: 'blur' }
                    ],
                    lastName: [
                        { required: true, message: 'Podaj nazwisko', trigger: 'blur' },
                        { min: 3, message: 'Długość nazwiska powinna być dłuższa niż 3 litery', trigger: 'blur' }
                    ],
                    birthdayYear: [
                        { required: true, message: 'Podaj rok urodzenia ', trigger: 'change' },
                        { min: 4, max: 4, message: 'Rok urodzenia musi być 4 cyfrową liczbą'}
                    ],
                    phoneNumber: [
                        { required: true, message: 'Podaj numer telefonu ', trigger: 'change' },
                        { min: 7, message: 'Numer telefonu nie może być krótszy niż 7 cyfr', trigger: 'blur' },
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
                    this.ruleForm.firstName = this.downloadUser.survey.firstName;
                    this.ruleForm.lastName = this.downloadUser.survey.lastName;
                    this.ruleForm.birthdayYear = this.downloadUser.survey.birthdayYear;
                    this.ruleForm.region = this.downloadUser.survey.region;
                    this.ruleForm.city = this.downloadUser.survey.city;
                    this.ruleForm.phoneNumber = this.downloadUser.survey.phoneNumber;
                });
            },
            getPhotographerByUsername(username) {
                apiService.getPhotographerByUsername(username).then((data) => {
                    this.downloadUser = data;
                    this.ruleForm.firstName = this.downloadUser.survey.firstName;
                    this.ruleForm.lastName = this.downloadUser.survey.lastName;
                    this.ruleForm.birthdayYear = this.downloadUser.survey.birthdayYear;
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
                this.user.birthdayYear = this.ruleForm.birthdayYear;
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
                        location.reload();
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
                this.user.birthdayYear = this.ruleForm.birthdayYear;
                this.user.gender = this.downloadUser.survey.gender;
                this.user.phoneNumber = this.ruleForm.phoneNumber;
                this.user.username = this.downloadUser.user.username;
                this.user.password = this.downloadUser.user.password;
                apiService.editPhotographerByUsername(this.$store.state.auth.user.username, this.user).then(
                    data => {
                        this.message = data.message;
                        this.user = data;
                        location.reload();
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
    .breadcrumb-container{
        margin-bottom: 40px;
    }
</style>
