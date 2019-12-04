<template>
    <el-container>
        <el-main>
            <el-row type="flex" justify="center" :gutter="20">
                <el-col :span="8">
                    <el-card>
                        <h2>Logowanie</h2>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" :label-position="labelPosition">
                            <el-form-item label="Login" prop="user">
                                <el-input v-model="ruleForm.user"></el-input>
                            </el-form-item>
                            <el-form-item label="Hasło" prop="password" >
                                <el-input v-model="ruleForm.password" type="password"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="handleLogin('ruleForm')">
                                    <span>Login</span>
                                </el-button>
                                <el-button type="primary" @click="$router.push('signup')">Załóż konto</el-button>
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
        data() {
            return {
                user: new User('', ''),
                loading: false,
                labelPosition: 'top',
                ruleForm: {
                    user: '',
                    password: '',
                },
                rules: {
                    user: [
                        { required: true, message: 'Podaj login', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: 'Podaj hasło', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            handleLogin(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.user.username = this.ruleForm.user;
                        this.user.password = this.ruleForm.password;
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
                                    this.$message.error('Niepoprawne dane logowania');
                                }
                            );
                        }
                    } else {
                        this.$message({
                            message: 'Niepoprawne dane logowania',
                            type: 'error',
                            offset: 30
                        });
                        return false;
                    }
                });
            }
        },
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
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
        margin-top: 20px;
    }

    .el-form{
        margin-top: 20px;
        border-color: #213159;
        text-align: left;
    }

</style>
