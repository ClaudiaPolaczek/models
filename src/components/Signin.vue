<template>
    <el-container>
        <el-main>
            <el-row type="flex" justify="center" :gutter="20">
                <el-col :span="8">
                    <el-card>
                        <h2>Logowanie</h2>
                        <el-form name="form" :rules="rules" label-width="100px" :label-position="labelPosition">
                            <el-form-item label="Login" prop="username">
                                <el-input
                                        type="text"
                                        class="form-control"
                                        name="username"
                                        v-model="user.username"
                                        v-validate="'required'"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="Hasło" prop="password">
                                <el-input  type="password"
                                           class="form-control"
                                           name="password"
                                           v-model="user.password"
                                           v-validate="'required'"
                                ></el-input>
                            </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="handleLogin"
                                               style="background-color: #2c3e50; border-color: #2c3e50">
                                        <span>Login</span>
                                    </el-button>
                                    <el-button @click="$router.push('signup')">Załóż konto</el-button>
                                </el-form-item>
                                <el-form-item>
                                    <div class="alert alert-danger" role="alert" v-if="message">{{message}}</div>
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
        name: 'login',
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        data() {
            return {
                user: new User('', ''),
                loading: false,
                message: '',
                labelPosition: 'top',
                rules: {
                    username: [
                        { required: true, message: 'Podaj login', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: 'Podaj hasło', trigger: 'blur' }
                    ]
                }
            };
        },
        mounted() {
            if (this.loggedIn) {
                this.$router.push('/account');
            }
        },
        methods: {
            handleLogin() {
                this.loading = true;
                this.$validator.validateAll();

                if (this.errors.any()) {
                    this.loading = false;
                    return;
                }

                if (this.user.username && this.user.password) {
                    this.$store.dispatch('auth/login', this.user).then(
                        () => {
                            this.$router.push('/account');
                        },
                        error => {
                            this.loading = false;
                            this.message = error.message;
                        }
                    );
                }
            }
        }
    };
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
        margin-top: 20px;
    }

    .el-form{
        margin-top: 20px;
        border-color: #2c3e50;
        text-align: left;
    }

    label {
        display: block;
        margin-top: 10px;
    }

    .card-container.card {
        max-width: 350px !important;
        padding: 40px 40px;
    }

    .card {
        background-color: #f7f7f7;
        padding: 20px 25px 30px;
        margin: 0 auto 25px;
        margin-top: 50px;
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    }

    .profile-img-card {
        width: 96px;
        height: 96px;
        margin: 0 auto 10px;
        display: block;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        border-radius: 50%;
    }
</style>
