<template>
    <el-container>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="12"><div>
                    <div class="block">
                        <el-card> Top portfolia </el-card>
                        <el-carousel trigger="click" height="400px">
                            <el-carousel-item v-for="item in 4" :key="item">
                                <h3 class="small">{{ item }}</h3>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div></el-col>
                <el-col :span="12"><div>
                    <div class="block">
                        <el-card> Top profile </el-card>
                        <el-carousel trigger="click" height="400px">
                            <el-carousel-item v-for="item in 4" :key="item">
                                <h3 class="small">{{ item }}</h3>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div></el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "WelcomePage"
    }
</script>

<style>

    .container{
        max-width: 1200px;
        margin: auto;
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
        color: black;
        opacity: 0;
        line-height: 500px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #EAD3BE;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #EAD3BE;
    }
</style>
