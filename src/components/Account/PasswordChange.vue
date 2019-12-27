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
                    <el-breadcrumb-item>Zmiana hasła</el-breadcrumb-item>
                </el-breadcrumb>
                <el-col span="10">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
                    <el-form-item label="Nowe hasło" prop="password">
                        <el-input type="password" v-model="ruleForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="Potwierdź hasło" prop="passwordConfirmation">
                        <el-input type="password" v-model="ruleForm.passwordConfirmation"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="changePassword('ruleForm')">Zapisz</el-button>
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
    import User from "@/models/user";
    import Menu from "@/components/Account/Menu";
    export default {
        components: {
            Menu
        },
        data() {
            return {
                user: new User('', ''),
                labelPosition: 'left',
                message:'',
                ruleForm: {
                    password: '',
                    passwordConfirmation: '',
                },
                rules: {
                    password: [
                        {required: true, message: 'Podaj hasło', trigger: 'change'},
                        { min: 5, message: 'Długość hasła musi być dłuższa niż 5 liter', trigger: 'blur' }
                    ],
                    passwordConfirmation: [
                        {required: true, message: 'Podaj hasło ponownie', trigger: 'change'}
                    ],
                }
            };
        },
        methods: {
            changePassword(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if(valid){
                        if(this.ruleForm.password != this.ruleForm.passwordConfirmation){
                            this.$message.error('Podane hasła nie są takie same');
                            this.ruleForm.password = '';
                            this.ruleForm.passwordConfirmation = '';
                        }else{
                            this.user.username = this.currentUser.username;
                            this.user.password = this.ruleForm.password;
                            apiService.changePassword(this.user).then(
                                data => {
                                    this.message = data.message;
                                    this.$message({
                                        message: 'Hasło zostało zmienione',
                                        type: 'success'
                                    });
                                    this.ruleForm.password = '';
                                    this.ruleForm.passwordConfirmation = '';
                                },
                                error => {
                                    this.message = error.message;
                                }
                            );
                        }
                    }
                });
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        mounted() {
            if (!this.currentUser) {
                this.$router.push('/login');
            }
        },
    }
</script>

<style>

</style>
