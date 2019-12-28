<template>
    <el-container>
        <el-main>
            <el-row :gutter="20">
                <el-row style="margin-top: 10px"><div>
                    <div class="block">
                        <el-card> Top profile modelek </el-card>
                        <el-carousel :interval="5000" type="card" height="400px" arrow="always">
                            <el-carousel-item v-for="model in models" :key="model" :label="model.user.username">
                                <el-image :src="model.user.mainPhotoUrl"></el-image>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div></el-row>
                <el-row><div>
                    <div class="block">
                        <el-card style="margin-top: 20px"> Top profile fotografów </el-card>
                        <el-carousel :interval="5000" type="card" height="400px" arrow="always">
                            <el-carousel-item v-for="photographer in photographers" :key="photographer" :label="photographer.user.username">
                                <el-image :src="photographer.user.mainPhotoUrl"></el-image>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div></el-row>
            </el-row>
        </el-main>
        <el-footer>
            Korzystanie z portalu oznacza akceptację
            <el-button type="text" style="border: #ebd9c8; background-color: #ebd9c8; color: #1989FA; font-size: 16px; font-family: Georgia, serif;
            font-style: normal;font-weight: 500;letter-spacing: 0.1em;" @click="$router.push('/Regulations')"> Regulaminu</el-button>.
        </el-footer>
    </el-container>
</template>

<script>
    import {APIService} from "@/services/APIService";
    const apiService = new APIService();
    export default {
        name: "WelcomePage",
        mounted() {
            this.getAvgOfRating();
        },
        data() {
            return {
                users: [],
                models: [],
                photographers: [],
                x: [],
                maxAvgUsers: '',
            };
        },
        methods: {
            getAvgOfRating(){
                apiService.getAvgOfRating().then((data) => {
                    this.users = data.sort((a, b) => b.avgRate - a.avgRate ).filter(((item, i) => i < 5));
                });

                apiService.getModels().then((data) => {
                    this.models = data.sort((a, b) => b.user.avgRate - a.user.avgRate ).filter(((item, i) => i < 2));
                });

                apiService.getPhotographers().then((data) => {
                    this.photographers = data.sort((a, b) => b.user.avgRate - a.user.avgRate ).filter(((item, i) => i < 2));
                });
            },
        },
    }
</script>

<style>
    .container{
        max-width: 1200px;
        margin: auto;
    }

    .el-footer {
        background-color: #ebd9c8;
        color: black;
        text-align: right;
        line-height: 60px;
        font-family: Georgia, serif;
        font-style: normal;
        font-weight: 500;
        letter-spacing: 0.1em;
        font-size: 16px;
    }

    .span{
        display: block;
    }

    .el-row {
        margin-top: 40px;
        margin-bottom: 20px;
        text-align: center;
        font-style: normal;
    }

    .el-col {
        border-radius: 4px;
        text-align: center;
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
