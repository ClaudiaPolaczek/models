<template>
    <el-container>
        <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
                <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                <el-breadcrumb-item>Profile</el-breadcrumb-item>
                <el-breadcrumb-item>{{username}}</el-breadcrumb-item>
                <el-breadcrumb-item>Portfolio</el-breadcrumb-item>
            </el-breadcrumb>
            <el-row :gutter="20" v-for="portfolio in portfolios" :key="portfolio.portfolios">
                <el-card>
                    <el-row>
                        Nazwa: {{portfolio.name}}
                    </el-row>
                    <el-row>
                        Data dodania: {{portfolio.addedDate}}
                    </el-row>
                    <el-carousel trigger="click" height="300px">
                    <el-carousel-item v-for="item in 4" :key="item">
                        <h3 class="small">{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>
                <el-col :span="4"><div class="grid-content bg-purple" >
                    <el-row>
                        {{portfolio.description}}
                    </el-row>
                </div></el-col>
                </el-card>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import {APIService} from '../services/APIService';
    const apiService = new APIService();

    export default {
        mounted() {
            this.username = this.$route.params.username
            this.getPortfoliosByUser(this.username)
        },
        data() {
            return {
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                portfolios: [],
                username: '',
            };
        },
        methods: {
            getPortfoliosByUser(id) {
                apiService.getPortfoliosByUser(id).then((data) => {
                    this.portfolios = data;
                });
            }
        }
    }
</script>

<style scoped>

</style>
