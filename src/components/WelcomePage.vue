<template>
    <el-container>
        <el-header>
            <el-menu
                    :default-active="activeIndex"
                    class="el-menu"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#B3C0D1"
                    text-color="#333"
                    active-text-color="#333"
            >
                <el-menu-item index="1">
                    <router-link to="/user">
                        Start
                    </router-link>
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">Portfolio</template>
                    <el-menu-item index="2-1">Fotograf</el-menu-item>
                    <el-menu-item index="2-2">Model/Modelka</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">Portfolio</template>
                    <el-menu-item index="3-1">Fotograf</el-menu-item>
                    <el-menu-item index="3-2">Model/Modelka</el-menu-item>
                </el-submenu>
                <div class="currentuser">
                    <span style="padding: 7em 2em">Imie Nazwisko</span>
                    <el-dropdown>
                        <i class="el-icon-setting" style="margin-right: 10px; margin-left: auto"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-badge :value="numberOfNotifications" class="item">
                                <el-dropdown-item >Konto</el-dropdown-item>
                            </el-badge>
                            <el-dropdown-item>Wyloguj</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-menu>
        </el-header>
        <el-main>Main</el-main>
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

    .el-header {
        background-color: #B3C0D1;
        color: #333;
        min-height: 61px;
    }
</style>
