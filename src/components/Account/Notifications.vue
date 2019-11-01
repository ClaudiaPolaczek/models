<template>
    <el-container>
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
                        <el-menu-item @click="$router.push('/user/portfolio')">Wszystkie portfolio</el-menu-item>
                        <el-menu-item @click="$router.push('/')">Dodaj portfolio</el-menu-item>
                        <el-menu-item @click="$router.push('/')">Dodaj zdjęcia</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
                        <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                        <el-breadcrumb-item>Konto</el-breadcrumb-item>
                        <el-breadcrumb-item>Powiadomienia</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-table
                            :data="notifications"
                            style="width: 100%">
                        <el-table-column
                                fixed
                                prop="content"
                                label="Powiadomienie"
                                width="800">
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="Przeczytane"
                                width="170">
                            <template slot-scope="scope">
                                <el-button @click="onClickRead(scope.row.id)" type="text" size="small">Oznacz jako przeczytane</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import {APIService} from "@/services/APIService";
    const apiService = new APIService();
    export default {
        methods: {
            onClickRead(id) {
                apiService.readNotification(id).then(data => {
                        this.message = data.message;
                    },
                    error => {
                        this.message = error.message;
                    });
            },
            getNotifications(username) {
                apiService.getNotificationsByUser(username).then((data) => {
                    this.notifications = data;
                });
            },
            deleteComment(username) {
                apiService.deleteComment(username).then(data => {
                        this.message = data.message;
                    },
                    error => {
                        this.message = error.message;
                    });
            },
        },
        computed: {
            showModelBoard() {
                if (this.currentUser) {
                    return this.currentUser.role.includes('MODEL');
                }
                return false;
            },
            currentUser() {
                return this.$store.state.auth.user;
            },
        },
        data() {
            return {
                notifications: [],
            }
        },
        mounted() {
            this.getNotifications(this.currentUser.username);
        },
    }
</script>

<style scoped>

</style>
