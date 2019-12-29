<template>
    <el-container>
        <el-container>
            <el-aside width="230px">
                <Menu/>
            </el-aside>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 50px">
                        <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                        <el-breadcrumb-item>Konto</el-breadcrumb-item>
                        <el-breadcrumb-item>Nowy album</el-breadcrumb-item>
                    </el-breadcrumb>
                        <el-col span="10"><h2 style="margin-top: 10px">Nowy album</h2>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                            <el-form-item label="Nazwa" prop="name">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="Opis" prop="description">
                                <el-input
                                        type="textarea"
                                        maxlength="800"
                                        show-word-limit
                                        :rows="6"
                                        v-model="ruleForm.description"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="handleAddNewAlbum('ruleForm')">Utwórz album</el-button>
                            </el-form-item>
                        </el-form>
                        </el-col>
                </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import {APIService} from "@/services/APIService";
    const apiService = new APIService();
    import Menu from "@/components/Account/Menu";
    import Portfolio from "@/models/portfolio";
    export default {
        name: "AddPortfolio",
        components: {
            Menu
        },
        data() {
            return {
                portfolio: new Portfolio('','',''),
                addedPortfolio: [],
                message: '',
                ruleForm: {
                    name: '',
                    description: '',
                },
                rules: {
                    name: [
                        {required: true, message: 'Podaj nazwę', trigger: 'change'},
                        { min: 3, max: 64, message: 'Nazwa musi być dłuższa niż 3 litery', trigger: 'blur' }
                    ],
                    description: [
                        {required: true, message: 'Podaj opis albumu', trigger: 'change'},
                    ]
                }
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
        },
        methods: {
            handleAddNewAlbum(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if(valid){
                        this.message = '';
                        this.portfolio.username = this.currentUser.username;
                        this.portfolio.name = this.ruleForm.name;
                        this.portfolio.description = this.ruleForm.description;
                        apiService.addPortfolio(this.portfolio).then(
                            data => {
                                this.addedPortfolio = data;
                                this.$router.push({path: `/portfolios/edit/${data.id}`})
                            },
                            error => {
                                this.message = error.message;
                            }
                        );
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
