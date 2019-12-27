<template>
    <el-menu
            :router="true"
            background-color="#FCEEE0">
        <el-submenu index="1">
            <template slot="title">
                <font-awesome-icon icon="user-cog" size="fa-lg" style="margin-right: 10px"/>
                <span style="font-size: 17px">Profil</span>
            </template>
            <el-menu-item @click="$router.push('/user')">Dane osobowe</el-menu-item>
            <el-menu-item @click="$router.push('/user/password')">Zmiana hasła</el-menu-item>
            <el-menu-item @click="$router.push('/user/model')"
                          v-if="showModelBoard">Dane modelki</el-menu-item>
        </el-submenu>
        <el-menu-item index="2" @click="$router.push('/calendar')">
            <font-awesome-icon icon="calendar-alt" size=" fa-lg" style="margin-right: 10px"/>
            <span>Terminarz</span>
        </el-menu-item>
        <el-menu-item index="3" @click="$router.push('/invitations')">
            <font-awesome-icon icon="envelope" size=" fa-lg" style="margin-right: 10px"/>
            <span>Zaproszenia</span>
        </el-menu-item>
        <el-menu-item index="4" @click="$router.push('/notifications')">
            <font-awesome-icon icon="bell" size=" fa-lg" style="margin-right: 10px"/>
            <span>Powiadomienia</span>
        </el-menu-item>
        <el-submenu index="5" >
            <template slot="title">
                <font-awesome-icon icon="camera-retro" size=" fa-mg" style="margin-right: 10px"/>
                <span style="font-size: 17px">Portfolio</span>
            </template>
            <el-menu-item @click="$router.push('/user/portfolio')">Albumy</el-menu-item>
            <el-menu-item @click="$router.push('/user/new/portfolio')">Nowy album</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "Menu",
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
            showModelBoard() {
                if (this.currentUser) {
                    return this.currentUser.role.includes('MODEL');
                }
                return false;
            },
        },
    }
</script>

<style scoped>
    .el-aside{
        color: #FCEEE0;
        background-color: #FCEEE0;
    }

    .el-menu {
        color: black;
        text-align: left;
        min-height: 100vh;
    }

    .el-menu-item{
        float: left;
        font-size: 17px;
        height: 56px;
        padding: 0 20px;
    }

    .el-submenu{
        float: left;
    }

    .el-menu-item.is-active {
        border-bottom: 0px solid black;
        color: black;
    }

    .el-menu .el-menu-item, .el-menu .el-submenu__title {
        font-size: 17px;
        height: 56px;
        letter-spacing: 0.1em;
    }


    .el-menu-item:not(.is-disabled):focus, .el-menu-item:not(.is-disabled):hover, .el-submenu .el-submenu__title:hover {
        background-color: #FCEEE0;
    }

    .el-menu-item:not(.is-disabled):focus, .el-menu-item:not(.is-disabled):hover {
        outline: 0;
        background-color: #FCEEE0;
        color: black;
    }

    .el-submenu__title:hover {
        background-color: #FCEEE0;
    }

    .el-menu-item:focus, .el-menu-item:hover {
        outline: 0;
        background-color: #FCEEE0;
    }
</style>
