<template>
    <el-container>
        <el-container>
            <el-aside width="230px">
                <Menu/>
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
    import Menu from "@/components/Account/Menu";
    export default {
        components: {
            Menu
        },
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
