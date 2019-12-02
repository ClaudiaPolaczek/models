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
                        <el-breadcrumb-item>Portfolio</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-row :gutter="20"  v-for="portfolio in portfolios" :key="portfolio.portfolios">
                        <el-card>
                            <el-col :span="6" style="margin-bottom: 20px"><div class="grid-content bg-purple">
                                <div class="demo-image" style="margin-bottom: 15px">
                                    <span class="demonstration"></span>
                                    <el-image
                                            style="width: 200px; height: 200px"
                                            :src="portfolio.mainPhotoUrl"
                                            :fit="'fill'">
                                    </el-image>
                                </div>
                                {{portfolio.name}}
                            </div></el-col>
                            <el-col :span="4"><div class="grid-content bg-purple">
                                <el-row>
                                    {{portfolio.description}}
                                </el-row>
                                <el-row>
                                    {{portfolio.addedDate}}
                                </el-row>
                            </div></el-col>
                            <el-col :span="4"><div class="grid-content bg-purple" style="margin-top: 20px">
                                <el-row>
                                    <el-button type="primary"
                                               @click="$router.push({ path: `/portfolios/edit/${portfolio.id}` })">
                                        Edytuj
                                    </el-button>
                                </el-row>
                                <el-row>
                                    <el-button type="primary" @click="onDelete(portfolio.id)">Usuń</el-button>
                                </el-row>                            </div></el-col>
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
        components: {
            Menu
        },
        data() {
            return {
                portfolios: [],
                username: ''
            }
        },
         methods: {
             onDelete(id) {
                 this.message = '';
                 apiService.deletePortfolio(id).then(
                     data => {
                         this.message = data.message;
                     },
                     error => {
                         this.message = error.message;
                     }
                 );
             },
             getPortfoliosByUser(){
                 apiService.getPortfoliosByUser(this.currentUser.username).then((data) => {
                     this.portfolios = data;
                 });
             },
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
        },
        mounted() {
            this.getPortfoliosByUser();
        },
    }
</script>

<style scoped>

</style>
