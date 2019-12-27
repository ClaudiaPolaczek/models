<template>
    <el-container>
        <el-main>
            <el-row type="flex" justify="center" :gutter="20" style="margin-top: 0px">
                <el-col :span="12">
                <el-card>
                    <h2>Rejestracja</h2>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" :label-position="left">
                            <el-form-item label="Profesja" prop="occupation">
                                <el-radio-group v-model="ruleForm.occupation">
                                    <el-radio label="Fotograf"></el-radio>
                                    <el-radio label="Model/Modelka"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="Imię" prop="firstName">
                                <el-input v-model="ruleForm.firstName"></el-input>
                            </el-form-item>
                            <el-form-item label="Nazwisko" prop="lastName">
                                <el-input v-model="ruleForm.lastName"></el-input>
                            </el-form-item>
                            <el-form-item label="Login" prop="username">
                                <el-input v-model="ruleForm.username"></el-input>
                            </el-form-item>
                            <el-form-item label="Hasło" prop="password">
                                <el-input type="password" v-model="ruleForm.password"></el-input>
                            </el-form-item>
                            <el-form-item label="Potwierdź hasło" prop="passwordConfirmation">
                                <el-input type="password" v-model="ruleForm.passwordConfirmation"></el-input>
                            </el-form-item>
                            <el-form-item label="Płeć" prop="gender">
                                <el-radio-group v-model="ruleForm.gender">
                                    <el-radio label="Kobieta"></el-radio>
                                    <el-radio label="Mężczyzna"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="Rok urodzenia" prop="birthdayYear">
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
                                <el-form-item>
                                <el-button type="primary" @click="handleRegister('ruleForm')"
                                           style="background-color: #213159; border-color: #213159;">
                                    Utwórz konto
                                </el-button>
                                <el-button @click="$router.push('/')">Anuluj</el-button>
                                </el-form-item>
                            </el-form-item>
                        </el-form>
                </el-card>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import User from '../models/user';
    export default {
        name: "register",
        active: 0,
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        mounted() {
            if (this.loggedIn) {
                this.$router.push('/account');
            }
        },
        data() {
            return {
                user: new User('', '', '', '', '', '', '', '', '','', ''),
                submitted: false,
                successful: false,
                message: '',
                ruleForm: {
                    occupation: '',
                    firstName: '',
                    lastName: '',
                    username: '',
                    password: '',
                    passwordConfirmation:  '',
                    gender: '',
                    region: '',
                    city: '',
                    birthdayYear: '',
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
                    occupation: [
                        { required: true, message: 'Wybierz profesje', trigger: 'change' }
                    ],
                    firstName: [
                        { required: true, message: 'Podaj imię', trigger: 'blur' },
                        { min: 3, message: 'Długość imienia powinna być dłuższa niż 3 litery', trigger: 'blur' }
                    ],
                    lastName: [
                        { required: true, message: 'Podaj nazwisko', trigger: 'blur' },
                        { min: 3, message: 'Długość nazwiska powinna być dłuższa niż 3 litery', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: 'Podaj login', trigger: 'blur' },
                        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Podaj hasło', trigger: 'change' },
                        { min: 5, message: 'Długość hasła musi być dłuższa niż 3 litery', trigger: 'blur' }
                    ],
                    passwordConfirmation:  [
                         { required: true, message: 'Podaj hasło ponownie', trigger: 'change' }
                     ],
                    gender: [
                        { required: true, message: 'Wybierz płeć', trigger: 'change' }
                    ],
                    region: [
                        { required: true, message: 'Wybierz wojewódźtwo', trigger: 'change' }
                    ],
                    city: [
                        { required: true, message: 'Podaj miasto', trigger: 'change' },
                        { min: 3, message: 'Nazwa miasta musi być dłuższa niż 3 litery', trigger: 'blur' }
                    ],
                    birthdayYear: [
                        { required: true, message: 'Podaj rok urodzenia ', trigger: 'change' },
                        { min: 4, max: 4, message: 'Rok urodzenia musi być 4 cyfrową liczbą'}
                    ],
                    phoneNumber: [
                        { required: true, message: 'Podaj wiek ', trigger: 'change' },
                        { min: 7, message: 'Numer telefonu nie może być krótszy niż 7 cyfr', trigger: 'blur' },
                    ]
                }
            };
        },
        methods: {
            handleRegister(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.message = '';
                        this.submitted = true;
                        if (this.ruleForm.password == this.ruleForm.passwordConfirmation) {
                            this.$validator.validate().then(valid => {
                                if (valid) {
                                    this.user.username = this.ruleForm.user;
                                    this.user.password = this.ruleForm.password;
                                    this.user.firstName = this.ruleForm.firstName;
                                    this.user.lastName = this.ruleForm.lastName;
                                    this.user.age = this.ruleForm.age;
                                    this.user.gender = this.ruleForm.gender;
                                    this.user.region = this.ruleForm.region;
                                    this.user.city = this.ruleForm.city;
                                    this.user.phoneNumber = this.ruleForm.phoneNumber;
                                    this.user.eyesColor = this.ruleForm.eyesColor;
                                    this.user.hairColor = this.ruleForm.hairColor;
                                    if(this.ruleForm.occupation=="Fotograf"){
                                        this.specifyGender(this.user.gender);
                                        this.$store.dispatch('auth/registerPhotographer', this.user).then(
                                            data => {
                                                this.message = data.message;
                                                this.successful = true;
                                            },
                                            error => {
                                                this.message = error.message;
                                                this.successful = false;
                                            }
                                        );
                                    }else if(this.ruleForm.occupation=="Model/Modelka"){
                                        this.specifyGender(this.user.gender);
                                        this.$store.dispatch('auth/registerModel', this.user).then(
                                            data => {
                                                this.message = data.message;
                                                this.successful = true;
                                            },
                                            error => {
                                                this.message = error.message;
                                                this.successful = false;
                                            }
                                        );
                                    }
                                }
                            });
                        } else {
                            this.$message({
                                message: 'Podane hasła nie są takie same',
                                type: 'error',
                                offset: 30
                            });
                            this.successful = false;
                        }
                    } else {
                        this.$message({
                            message: 'Nieuzupełnione wymagane dane',
                            type: 'error',
                            offset: 30
                        });
                        return false;
                    }
                });
            },
            specifyGender(gender){
                if(gender=="Kobieta"){
                   this.user.gender = 'W';
                } else this.user.gender = 'M';
            }
        }
    };
</script>

<style scoped>
.el-form{
    margin-left: 40px;
}

.el-button{
    border-color: #213159;
}
</style>
