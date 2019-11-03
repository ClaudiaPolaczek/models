<template>
    <el-container>
        <el-container>
            <el-aside width="230px">
                <Menu/>
            </el-aside>
            <el-container>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container" style="margin-bottom: 50px">
                        <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                        <el-breadcrumb-item>Konto</el-breadcrumb-item>
                        <el-breadcrumb-item>Nowy album</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-row>
                        <el-col span="12"><h2>Nowy album</h2></el-col>
                        <el-form :rules="rules" label-width="120px" class="demo-ruleForm" label-position="left">
                            <el-form-item>
                                <div class="alert alert-danger" role="alert" v-if="addedPortfolio">{{addedPortfolio.id}}</div>
                            </el-form-item>
                            <el-form-item label="Nazwa" prop="name">
                                <el-input v-model="portfolio.name"></el-input>
                            </el-form-item>
                            <el-form-item label="Opis" prop="notes">
                                <el-input type="textarea" v-model="portfolio.description"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="handleAddNewAlbum">Utwórz album</el-button>
                                </el-form-item>
                            </el-form-item>
                        </el-form>
                    </el-row>
                </el-main>
            </el-container>
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
                message: ''
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
        },
        methods: {
            handleAddNewAlbum() {
                this.message = '';
                this.portfolio.username = this.currentUser.username;
                apiService.addPortfolio(this.portfolio).then(
                    data => {
                        this.addedPortfolio = data;
                        this.$router.push({ path: `/portfolios/edit/${data.id}` })
                    },
                    error => {
                        this.message = error.message;
                    }
                );

            }
        }
    }
</script>

<style scoped>

</style>
