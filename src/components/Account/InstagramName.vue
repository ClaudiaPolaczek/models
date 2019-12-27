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
                    <el-breadcrumb-item>Instagram</el-breadcrumb-item>
                </el-breadcrumb>
                <el-col span="10">
                    <el-form :model="ruleForm" ref="ruleForm" >
                        <el-form-item label="Nazwa konta w serwisie instagram">
                            <el-input type="instagramName" v-model="ruleForm.instagramName"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="editInstagramName">Zapisz</el-button>
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
                user: new User('', '', ''),
                labelPosition: 'top',
                ruleForm: {
                    instagramName: ''
                }
            };
        },
        methods: {
            editInstagramName() {
                 this.user.username = this.currentUser.username;
                 this.user.password = this.currentUser.password;
                 this.user.instagramName = this.ruleForm.instagramName;
                apiService.editInstagramName(this.user.username, this.user).then(
                    data => {
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
            if (!this.currentUser) {
                this.$router.push('/login');
            }
        },
    }
</script>

<style scoped>

</style>
