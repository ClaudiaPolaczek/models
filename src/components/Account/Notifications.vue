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
                        <el-menu-item @click="$router.push('/user/portfolio')">Portfolio</el-menu-item>
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
                </el-menu>
            </el-aside>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
                        <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                        <el-breadcrumb-item>Konto</el-breadcrumb-item>
                        <el-breadcrumb-item>Powiadomienia</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-table
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column
                                fixed
                                prop="notification"
                                label="Powiadomienie"
                                width="800">
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="Usuń"
                                width="170">
                            <template slot-scope="scope">
                                <el-button @click="onClickDelete" type="text" size="small">Usuń</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        methods: {
            onClickDelete() {
            }
        },
        computed: {
            showModelBoard() {
                if (this.currentUser) {
                    return this.currentUser.role.includes('MODEL');
                }
                return false;
            },
        },
        data() {
            return {
                tableData: [{
                    notification: 'Jan zaakceptowal zaproszenie',
                }, {
                    notification: 'Jan zaakceptowal zaproszenie',
                }, {
                    notification: 'Jan zaakceptowal zaproszenie',
                }, {
                    notification: 'Jan zaakceptowal zaproszenie',
                }]
            }
        }
    }
</script>

<style scoped>

</style>
