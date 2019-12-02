<template>
    <el-container>
        <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
                <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                <el-breadcrumb-item>Portfolio</el-breadcrumb-item>
            </el-breadcrumb>
            <el-row>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-row>
                        Nazwa: {{portfolio.name}}
                    </el-row>
                    <el-row>
                        Data dodania: {{portfolio.addedDate}}
                    </el-row>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-row>
                        {{portfolio.description}}
                    </el-row>
                </div></el-col>
            </el-row>
            <el-row>
                <el-carousel :interval="5000" arrow="always">
                    <el-carousel-item v-for="image in images" :key="image">
                        <el-image :src="image.fileUrl"></el-image>
                    </el-carousel-item>
                </el-carousel>
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
            }
        }
    }
</script>

<style scoped>

</style>
