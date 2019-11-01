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
                        <el-breadcrumb-item>Zaproszenia</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-row>
                        <el-col :span="15"><div class="grid-content bg-purple">
                            <el-form label-width="300px">
                                <el-form-item label="Nazwa użytkownika zapraszającego ">
                                    <el-input v-model="inviting"></el-input>
                                </el-form-item>
                                <el-form-item label="Status sesji zdjęciowej">
                                    <el-select v-model="statusRequired" placeholder="Wybierz">
                                        <el-option
                                                v-for="item in statusOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </div></el-col>
                        <el-button @click="filterHandler">Filtruj</el-button>
                        <el-button @click="clearFilter">Usuń filtry</el-button>
                    </el-row>
                    <el-row>
                        <el-table
                                :data="invitations"
                                style="width: 100%">
                        <el-table-column
                                prop="invitingUser.username"
                                label="Zaproszenie od"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                prop="meetingDate"
                                label="Data sesji"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="duration"
                                label="Czas trwania"
                                width="110">
                        </el-table-column>
                        <el-table-column
                                prop="topic"
                                label="Temat sesji"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="city"
                                label="Miasto"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="street"
                                label="Ulica"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="houseNumber"
                                label="Numer domu"
                                width="110">
                        </el-table-column>
                        <el-table-column
                                prop="photoShootStatus"
                                label="Status"
                                width="100">
                        </el-table-column>
                            <el-table-column
                                    prop="notes"
                                    label="Notatki"
                                    width="180">
                            </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="Operacje"
                                width="170">
                            <template slot-scope="scope">
                                <el-button v-if="canAccept(scope.row.photoShootStatus)"
                                           @click="acceptPhotoshoot(scope.row.id, scope.row.invitingUser.username)"
                                           type="text">Akceptuj</el-button>
                                <el-button v-if="canCancel(scope.row.photoShootStatus)"
                                           @click="cancelPhotoshoot(scope.row.id , scope.row.invitingUser.username)"
                                           type="text">Odrzuć</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    </el-row>
                </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import {APIService} from '../../services/APIService';
    const apiService = new APIService();
    import Notification from "@/models/notification";
    export default {
        methods: {
            getAllByInvitedUserUsername(username) {
                apiService.getAllByInvitedUserUsername(username).then((data) => {
                    this.invitations = data;
                    this.filteredInvitations = data;
                });
            },
            acceptPhotoshoot(id, invitingUsername) {
                apiService.acceptPhotoshoot(id).then((data) => {
                    this.message = data;
                });
                this.notification.username = invitingUsername;
                this.notification.content = this.currentUser.username + ' zaakceptował twoje zaproszenie';

                apiService.addNotification(this.notification).then(
                    data => {
                        this.message = data.message;
                        this.notification = data;
                    },
                    error => {
                        this.message = error.message;
                    }
                );
            },
            cancelPhotoshoot(id, invitingUsername) {
                apiService.cancelPhotoshoot(id).then((data) => {
                    this.message = data;
                });

                this.notification.username = invitingUsername;
                this.notification.content = this.currentUser.username + ' odrzucił twoje zaproszenie' ;

                apiService.addNotification(this.notification).then(
                    data => {
                        this.message = data.message;
                        this.notification = data;
                    },
                    error => {
                        this.message = error.message;
                    }
                );
            },
            canCancel(status) {
                if(status == "CREATED" || status == "ACCEPTED" ){
                    return true;
                } else
                    return false;
            },
            canAccept(status) {
                if(status == "CREATED"){
                    return true;
                } else
                    return false;
            },
            translateStatus(status) {
                if(status == "CREATED"){
                    return 'Wysłane zaproszenie';
                } else if (status == "ACCEPTED"){
                    return 'Zaakceptowane';
                } else if (status == "CANCELED"){
                    return 'Anulowane';
                }
            },
            // filterHandler() {
            //     this.filteredInvitations.filter(theSame(,this.inviting))
            //     this.invitations.forEach((item) => {
            //         if(item.invitingUser.username == this.inviting){ this.filteredInvitations.push({item})}
            //     })
            // },
            // theSame(valueOne, valueTwo) {
            //     return valueOne == valueTwo;
            // },
            // resetDateFilter() {
            //     this.$refs.filterTable.clearFilter('date');
            // },
            // clearFilter() {
            //     this.$refs.filterTable.clearFilter();
            // },
        },
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
        mounted() {
            this.getAllByInvitedUserUsername(this.currentUser.username)
        },
        data() {
            return {
                inviting: '',
                notification: new Notification('', ''),
                invitations: [],
                filteredInvitations: [],
                statusRequired: '',
                statusOptions: [{
                    value: 'ACCEPTED',
                    label: 'Zaakceptowne'
                }, {
                    value: 'CANCELED',
                    label: 'Anlowane'
                }, {
                    value: 'CREATED',
                    label: 'Wysłane zaproszenie'
                }, {
                    value: '',
                    label: '-'
                },],
            }
        }
    }
</script>

<style scoped>

</style>
