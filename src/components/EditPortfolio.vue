<template>
    <el-container>
        <el-header>
            <el-menu
                    :default-active="activeIndex"
                    class="el-menu"
                    mode="horizontal"
                    background-color="#B3C0D1"
                    text-color="#333"
                    active-text-color="#333"
                    :router="true">
                <el-menu-item index="1" :route="{path:'/'}">
                    Start
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">Portfolio</template>
                    <el-menu-item index="2-1" :route="{path:''}">Fotograf</el-menu-item>
                    <el-menu-item index="2-2" :route="{path:''}" >Model/Modelka</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">Profile</template>
                    <el-menu-item index="3-1" @click="$router.push('/photographers')">
                        Fotograf
                    </el-menu-item>
                    <el-menu-item index="3-2" @click="$router.push('/models')">
                        Model/Modelka
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="4" style="float: right;">
                    <template slot="title"><i class="el-icon-setting"></i></template>
                    <el-menu-item index="4-1" :route="{path:'user'}"><i class="el-icon-user"></i>
                        <el-badge :value="numberOfNotifications" class="item">
                            Konto
                        </el-badge>
                    </el-menu-item>
                    <el-menu-item index="4-2"><i class="el-icon-circle-close"></i>
                        Wyloguj
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="5" style="float: right;" :route="{path:'login'}">
                    <span style="padding: 7em 2em">Logowanie</span>
                </el-menu-item>
            </el-menu>
        </el-header>
        <el-container>
            <el-aside width="230px">
                <el-menu
                        class="el-menu-vertical"
                        background-color="#4E565F"
                        text-color="#fff"
                        active-text-color="#fff"
                        style="text-align: left; min-height: 100vh"
                        :router="true">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-user"></i>
                            <span>Profil</span>
                        </template>
                        <el-menu-item index="1-1" @click="$router.push('/user')">Ustawienia profilu</el-menu-item>
                        <el-menu-item index="1-2" @click="$router.push('/portfolio/user')">Portfolio</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="2" :route="{path:'calendar'}">
                        <i class="el-icon-date"></i>
                        <span>Terminarz</span>
                    </el-menu-item>
                    <el-menu-item index="3" :route="{path:'invitations'}">
                        <i class="el-icon-message"></i>
                        <span>Zaproszenia</span>
                    </el-menu-item>
                    <el-menu-item index="4" :route="{path:'notifications'}">
                        <i class="el-icon-bell"></i>
                        <span>Powiadomienia</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container" style="margin-bottom: 50px">
                        <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                        <el-breadcrumb-item>Konto</el-breadcrumb-item>
                        <el-breadcrumb-item>Portfolio</el-breadcrumb-item>
                        <el-breadcrumb-item>Nazwa</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-row>
                        <el-col :span="6"><div class="grid-content bg-purple">
                            <div class="demo-image" style="margin-bottom: 15px">
                                <span class="demonstration"></span>
                                <el-image
                                        style="width: 200px; height: 200px"
                                        :src="url"
                                        :fit="'fill'">
                                </el-image>

                            </div>
                            <span class="demonstration">Nazwa portfolio</span>
                        </div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple-light">
                            <el-row>
                                <el-button type="primary" @click="$router.push('/portfolio/id')">Edytu</el-button>
                            </el-row>
                            <el-row>
                                <el-button type="primary" @click="onDelete">Usuń</el-button>
                            </el-row>
                        </div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>

                    </el-row>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
        },
        methods: {
            onDelete() {
                console.log('error submit!!');
                return false;
            },
        }
    }
</script>

<style scoped>

</style>
