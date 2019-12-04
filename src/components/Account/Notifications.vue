<template>
    <el-container>
        <el-container>
            <el-aside width="230px">
                <Menu/>
            </el-aside>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                        <el-breadcrumb-item>Konto</el-breadcrumb-item>
                        <el-breadcrumb-item>Powiadomienia</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-table
                            :data="notifications"
                            style="width: 100%; margin-top: 40px"
                            :default-sort = "{prop: 'addedDate', order: 'descending'}">
                        <el-table-column
                                fixed
                                prop="addedDate"
                                label="Data"
                                width="300"
                                sortable>
                        </el-table-column>
                        <el-table-column
                                fixed
                                prop="content"
                                label="Powiadomienie"
                                width="640">
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="Przeczytane"
                                width="200">
                            <template slot-scope="scope">
                                <el-button v-if="ifNotificationIsAlreadyRead(scope.row.readValue)" type="primary"
                                           @click="onClickRead(scope.row.id)" size="small">
                                    Oznacz jako przeczytane
                                </el-button>
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
                        location.reload();
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
            ifNotificationIsAlreadyRead(readValue){
                if (readValue === 1) {
                    return false;
                } else if (readValue === 0) {
                    return true;
                }
                return '';
            }
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
