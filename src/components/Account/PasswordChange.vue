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
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left">
                    <el-form-item label="Nowe hasło" prop="password">
                        <el-input v-model="ruleForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="Potwierdź hasło" prop="passwordConfirmation">
                        <el-input v-model="ruleForm.passwordConfirmation"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="changePassword">Zapisz</el-button>
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
    import User from "@/models/user";
    import Menu from "@/components/Account/Menu";
    export default {
        components: {
            Menu
        },
        data() {
            return {
                user: new User('', ''),
                activeIndex: '1',
                numberOfNotifications: '2',
                labelPosition: 'left',
                message:'',
                ruleForm: {
                    password: '',
                    passwordConfirmation: '',
                    rules: {
                        password: [
                            {required: true, message: 'Podaj hasło', trigger: 'change'}
                        ],
                        passwordConfirmation: [
                            {required: true, message: 'Podaj hasło ponownie', trigger: 'change'}
                        ],
                    }
                }
            };
        },
        methods: {
            changePassword() {
                if(this.ruleForm.password != this.ruleForm.passwordConfirmation){
                    this.message = "Podane hasła nie są takie same";
                }else{
                    this.user.username = this.currentUser.username;
                    this.user.password = this.ruleForm.password;
                    apiService.changePassword(this.user).then(
                        data => {
                            this.message = data.message;
                        },
                        error => {
                            this.message = error.message;
                        }
                    );
                }
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
