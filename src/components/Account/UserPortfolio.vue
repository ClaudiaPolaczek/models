<template>
    <el-container>
        <el-container>
            <el-aside width="230px">
                <Menu/>
            </el-aside>
            <el-container>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 50px">
                        <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                        <el-breadcrumb-item>Konto</el-breadcrumb-item>
                        <el-breadcrumb-item>Albumy</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-row :gutter="20"  v-for="portfolio in portfolios" :key="portfolio.portfolios">
                        <el-card style="margin-left: 40px; margin-right: 100px">
                            <el-col :span="6" style="margin-bottom: 20px"><div class="grid-content bg-purple">
                                <div style="margin-bottom: 15px">
                                    <el-image
                                            style="width: 200px; height: 200px"
                                            :src="portfolio.mainPhotoUrl"
                                            :fit="'contain'">
                                    </el-image>
                                </div>
                                <h3 style="display: inline;">{{portfolio.name}}</h3>
                            </div></el-col>
                            <el-col :span="12" style="margin-right: 20px"><div class="portfolio">
                                <el-row class="portfolio" style="margin-top: 10px">
                                    <h4 style="display: inline">Data utworzenia: </h4> {{getDate(portfolio.addedDate)}}
                                </el-row>
                                <el-row class="portfolio" style="margin-top: 20px">
                                    <h4 style="margin-top: 5px">Opis </h4> {{portfolio.description}}
                                </el-row>
                            </div></el-col>
                            <el-col :span="6"><div class="portfolio" style="margin-top: 10px">
                                    <el-button type="primary"
                                               @click="$router.push({ path: `/portfolios/edit/${portfolio.id}` })">
                                        Edytuj
                                    </el-button>
                                    <el-button type="primary" @click="onDelete(portfolio.id)">Usuń</el-button></div></el-col>
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
                 this.$confirm('Czy na pewno chcesz usunąć portfolio?', 'Potwierdzenie', {
                     confirmButtonText: 'Usuń',
                     cancelButtonText: 'Anuluj',
                     type: 'warning',
                     center: true
                 }).then(() => {
                     apiService.deletePortfolio(id).then(
                         data => {
                             this.message = data.message;
                             location.reload();
                             this.$message({
                                 type: 'success',
                                 message: 'Usunięto portfolio'
                             });
                         },
                         error => {
                             this.message = error.message;
                         }
                     );

                 }).catch(() => {
                 });
             },
             getPortfoliosByUser(){
                 apiService.getPortfoliosByUser(this.currentUser.username).then((data) => {
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
            this.getPortfoliosByUser();
        },
    }
</script>

<style scoped>
    .portfolio{
        text-align: left;
    }
</style>
