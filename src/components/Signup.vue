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
                    <el-menu-item index="3-1" :route="{path:''}">
                        Fotograf
                    </el-menu-item>
                    <el-menu-item index="3-2" :route="{path:''}">
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
        <el-main>
            <el-row>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" label-position="left">
                    <el-form-item label="Profesja" prop="occupation">
                        <el-radio-group v-model="ruleForm.occupation">
                            <el-radio label="Fotograf"></el-radio>
                            <el-radio label="Model/Modelka"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="Imię" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Nazwisko" prop="surname">
                        <el-input v-model="ruleForm.surname"></el-input>
                    </el-form-item>
                    <el-form-item label="Login" prop="username">
                        <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="Hasło" prop="password">
                        <el-input v-model="ruleForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="Potwierdź hasło" prop="passwordConfirmation">
                        <el-input v-model="ruleForm.passwordConfirmation"></el-input>
                    </el-form-item>
                    <el-form-item label="Płeć" prop="gender">
                        <el-radio-group v-model="ruleForm.gender">
                            <el-radio label="Kobieta"></el-radio>
                            <el-radio label="Mężczyzna"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="Data urodzenia" style="align-items: center">
                        <el-col  :span="11">
                            <el-date-picker type="date" placeholder="Wybierz datę" v-model="ruleForm.birthDate">
                            </el-date-picker>
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
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">Utwórz konto</el-button>
                        <el-button @click="$router.push('/')">Anuluj</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "Signup",
        data() {
            return {
                ruleForm: {
                    occupation: '',
                    name: '',
                    surname: '',
                    username: '',
                    password: '',
                    passwordConfirmation: '',
                    gender: '',
                    region: '',
                    birthDate: '',
                    city: '',
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
                    occupation: [
                        { required: true, message: 'Wybierz profesje', trigger: 'change' }
                    ],
                    name: [
                        { required: true, message: 'Podaj imię', trigger: 'blur' },
                        { min: 1, message: 'Długość imienia powinna być wieksza niz 1', trigger: 'blur' }
                    ],
                    surname: [
                        { required: true, message: 'Podaj nazwisko', trigger: 'blur' },
                        { min: 1, message: 'Długość nazwiska powinna być wieksza niz 1', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: 'Podaj login', trigger: 'blur' },
                        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Podaj hasło', trigger: 'change' }
                    ],
                    passwordConfirmation:  [
                        { required: true, message: 'Podaj hasło ponownie', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: 'Wybierz płeć', trigger: 'change' }
                    ],
                    region: [
                        { required: true, message: 'Please select Activity zone', trigger: 'change' }
                    ],
                    city: [
                        { required: true, message: 'Please pick a date', trigger: 'change' }
                    ],
                    birthDate: [
                        { type: 'date', required: true, message: 'Please pick a time', trigger: 'change' }
                    ]
                }
            };
        },
        methods: {
            signin(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped>
.el-form{
    margin-left: 50px;
}
</style>
