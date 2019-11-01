<template>
    <el-container>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="12"><div class="grid-content bg-purple">
                    <div class="block">
                        <el-carousel trigger="click" height="300px">
                            <el-carousel-item v-for="item in 4" :key="item">
                                <h3 class="small">{{ item }}</h3>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple">
                    <div class="block">
                        <el-carousel trigger="click" height="300px">
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
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    .container{
        max-width: 1200px;
        margin: auto;
    }

    .span{
        display: block;
    }

    .el-header {
        background-color: #B3C0D1;
        color: #333;
        min-height: 60px;
    }

    .el-submenu__icon-arrow {
        display: none;
    }


    .el-icon-setting{
        text-align: center;
    }

    .el-row {
        margin-top: 50px;
        margin-bottom: 20px;
        text-align: center;
    }

    .el-col {
        border-radius: 4px;
        text-align: center;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 1;
        line-height: 300px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
