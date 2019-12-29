<template>
    <el-container>
        <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
                <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                <el-breadcrumb-item>Portfolio</el-breadcrumb-item>
            </el-breadcrumb>
            <el-row>
                <el-carousel :interval="5000" type="card" height="600px" arrow="always">
                    <el-carousel-item v-for="image in images" :key="image">
                        <el-image :src="image.fileUrl"></el-image>
                    </el-carousel-item>
                </el-carousel>
            </el-row>
            <el-row>
                <el-col :span="12"><div class="portfolio">
                    <el-row class="portfolio" style="margin-top: 10px">
                        <h3 style="display: inline;">Nazwa portfolio: </h3> {{portfolio.name}}
                    </el-row>
                    <el-row class="portfolio" style="margin-top: 10px">
                        <h3 style="display: inline">Nazwa użytkownika: </h3> {{portfolio.user.username}}
                    </el-row>
                    <el-row class="portfolio" style="margin-top: 10px">
                        <h3 style="display: inline">Data dodania: </h3> {{getDate(portfolio.addedDate)}}
                    </el-row>
                </div></el-col>
                <el-col :span="6">
                    <el-row>
                        {{portfolio.description}}
                    </el-row>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import {APIService} from '../../services/APIService';
    const apiService = new APIService();

    export default {
        mounted() {
            this.username = this.$route.params.username
            this.id = this.$route.params.id
            this.getImagesByPortfolioId();
            this.getPortfolioById();
        },
        data() {
            return {
                images: [],
                portfolio: [],
                id: '0'
            };
        },
        methods: {
            getImagesByPortfolioId() {
                apiService.getImagesByPortfolioId(this.id).then((data) => {
                    this.images = data;
                });
            },
            getPortfolioById() {
                apiService.getPortfolioById(this.id).then((data) => {
                    this.portfolio = data;
                });
            },
            getDate(date){
                return date.slice(0,10)
            },
        }
    }
</script>

<style scoped>

    .portfolio{
        text-align: left;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: white;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: white;
    }
</style>
