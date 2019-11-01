<template>
    <el-container>
        <el-main>
            <el-row type="flex" justify="center" :gutter="20" style="margin-top: 0px">
                <el-col :span="12">
                <el-card>
                    <h2>Rejestracja</h2>
                        <el-form name="form" :rules="rules" label-width="120px" class="demo-ruleForm" label-position="left">
                            <el-form-item>
                                <div class="alert alert-danger" role="alert" v-if="message">{{message}}</div>
                            </el-form-item>
                            <el-form-item label="Profesja" prop="occupation">
                                <el-radio-group v-model="occupation">
                                    <el-radio label="Fotograf"></el-radio>
                                    <el-radio label="Model/Modelka"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="Imię" prop="name">
                                <el-input v-model="user.firstName"></el-input>
                            </el-form-item>
                            <el-form-item label="Nazwisko" prop="surname">
                                <el-input v-model="user.lastName"></el-input>
                            </el-form-item>
                            <el-form-item label="Login" prop="username">
                                <el-input v-model="user.username"></el-input>
                            </el-form-item>
                            <el-form-item label="Hasło" prop="password">
                                <el-input type="password" onkeyup='check();' v-model="user.password"></el-input>
                            </el-form-item>
                            <el-form-item label="Potwierdź hasło" prop="passwordConfirmation">
                                <el-input type="password" onkeyup='check();' v-model="passwordConfirmation"></el-input>
                            </el-form-item>
                            <el-form-item label="Płeć" prop="gender">
                                <el-radio-group v-model="user.gender">
                                    <el-radio label="Kobieta"></el-radio>
                                    <el-radio label="Mężczyzna"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="Wiek" style="align-items: center">
                                <el-input  v-model="user.age"></el-input>
<!--                                <el-select v-model="user.age" placeholder="Wybierz">-->
<!--                                    <el-option-->
<!--                                            v-for="n in 50"-->
<!--                                            :key="n.value">-->
<!--                                    </el-option>-->
<!--                                </el-select>-->
                            </el-form-item>
                            <el-form-item label="Województwo">
                                <el-select v-model="user.region" placeholder="Wybierz">
                                    <el-option
                                            v-for="item in ruleForm.options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Miasto" prop="city">
                                <el-input v-model="user.city"></el-input>
                            </el-form-item>
                            <el-form-item label="Numer telefonu">
                                <el-input v-model="user.phoneNumber"></el-input>
                            </el-form-item>
                            <el-form-item label="Kolor włosów">
                                <el-input v-model="user.hairColor"></el-input>
                            </el-form-item>
                            <el-form-item label="Kolor oczu">
                                <el-input v-model="user.eyesColor"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-form-item>
                                    <el-button type="primary"  @click="next" v-if="active==1">Dalej</el-button>
                                <el-button type="primary" @click="handleRegister">Utwórz konto</el-button>
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
               // this.$router.push('/profile');
            }
        },
        data() {
            return {
                user: new User('', '', '', '', '', '', '', '', '','', ''),
                submitted: false,
                successful: false,
                message: '',
                occupation: '',
                passwordConfirmation: '',
                ruleForm: {
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
                        { required: true, message: 'Wybierz wojewódźtwo', trigger: 'change' }
                    ],
                    city: [
                        { required: true, message: 'Podaj miasto', trigger: 'change' }
                    ],
                    age: [
                        { required: true, message: 'Podaj wiek ', trigger: 'change' }
                    ]
                }
            };
        },
        methods: {
            handleRegister() {
                this.message = '';
                this.submitted = true;
                if (this.user.password == this.passwordConfirmation) {
                    this.$validator.validate().then(valid => {
                        if (valid) {
                            if(this.occupation=="Fotograf"){
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
                            }else if(this.occupation=="Model/Modelka"){
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
                    this.message = "Podane hasła nie są takie same";
                    this.successful = false;
                }
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
    margin-left: 50px;
}
</style>
