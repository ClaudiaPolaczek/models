<template>
                <el-menu
                        class="el-menu-vertical"
                        background-color="#4E565F"
                        text-color="#fff"
                        active-text-color="#fff"
                        style="text-align: left; min-height: 100vh"
                        :router="true">
                    <el-submenu index="1" >
                        <template slot="title">
                            <font-awesome-icon icon="user-cog" size=" fa-lg" style="margin-right: 10px"/>
                            <span>Profil</span>
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
                        <span>Sesje zdjęciowe</span>
                    </el-menu-item>
                    <el-menu-item index="4" @click="$router.push('/notifications')">
                        <font-awesome-icon icon="bell" size=" fa-lg" style="margin-right: 10px"/>
                        <span>Powiadomienia</span>
                    </el-menu-item>
                    <el-submenu index="5" >
                        <template slot="title">
                            <font-awesome-icon icon="camera-retro" size=" fa-lg" style="margin-right: 10px"/>
                            <span>Portfolio</span>
                        </template>
                        <el-menu-item @click="$router.push('/user/portfolio')">Zobacz portfolio</el-menu-item>
                        <el-menu-item @click="$router.push('/user/new/portfolio')">Dodaj nowy album</el-menu-item>
                        <el-menu-item @click="$router.push('/')">Dodaj zdjęcia</el-menu-item>
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

</style>
