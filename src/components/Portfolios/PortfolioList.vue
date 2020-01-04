<template>
    <el-container>
        <el-container>
            <el-container>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 50px">
                        <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                        <el-breadcrumb-item>Konto</el-breadcrumb-item>
                        <el-breadcrumb-item>Albumy</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-row :gutter="20"  v-for="portfolio in portfolios" :key="portfolio.portfolios">
                        <el-card>
                            <el-col :span="6">
                                <el-image
                                        style="width: 200px; height: 200px"
                                        :src="portfolio.mainPhotoUrl"
                                        :fit="'contain'">
                                </el-image>
                                <el-row style="margin-top: 0px">
                                    <el-link @click="$router.push({ path: `/portfolios/${portfolio.id}` })" type="info">
                                        Zobacz album
                                        <i class="el-icon-view el-icon--right"></i> </el-link>
                                </el-row>
                            </el-col>
                            <el-col :span="8"><div class="portfolio">
                                <el-row class="portfolio" style="margin-top: 20px">
                                    <h3 style="display: inline;">Nazwa portfolio: </h3> {{portfolio.name}}
                                </el-row>
                                <el-row class="portfolio" style="margin-top: 40px">
                                    <h3 style="display: inline">Nazwa użytkownika: </h3> {{portfolio.user.username}}
                                </el-row>
                                <el-row class="portfolio" style="margin-top: 40px">
                                    <h3 style="display: inline">Data dodania: </h3> {{getDate(portfolio.addedDate)}}
                                </el-row>
                            </div></el-col>
                            <el-col :span="6"><div>
                                <el-row>
                                    {{portfolio.description}}
                                </el-row>
                            </div></el-col>
                        </el-card>
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
    export default {
        data() {
            return {
                portfolios: [],
                username: ''
            }
        },
        methods: {
            getPortfoliosByUser(username){
                apiService.getPortfoliosByUser(username).then((data) => {
                    this.portfolios = data;
                });
            },
            getDate(date){
                return date.slice(0,10)
            },
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
        },
        mounted() {
            this.username = this.$route.params.username
            this.getPortfoliosByUser(this.username);
        },
    }
</script>

<style scoped>
    .portfolio{
        text-align: left;
    }
</style>
