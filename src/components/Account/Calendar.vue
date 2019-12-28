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
                        <el-breadcrumb-item>Terminarz</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-row>
                        <el-col :span="10" style="margin-right: 20px"><div>
                            <el-form label-width="250px">
                                <el-form-item label="Zapraszający użytkownik">
                                    <el-input v-model="search"></el-input>
                                </el-form-item>
                            </el-form>
                        </div></el-col>
                        <el-col :span="6"><div>
                            <el-form label-width="110px">
                                <el-form-item label="Data sesji">
                                    <el-date-picker
                                            v-model="sessionDate"
                                            type="date"
                                            placeholder="Wybierz dzień"
                                            :picker-options="pickerOptions"
                                            value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                            </el-form>
                        </div></el-col>
                    </el-row>
                    <el-row>
                        <el-table
                                :data="invitations.filter(data => !statusRequired ||
                                data.photoShootStatus.toLowerCase().startsWith(statusRequired.toLowerCase()))
                                .filter(data => !search ||
                                data.invitingUser.username.toLowerCase().startsWith(search.toLowerCase()))
                                .filter(data => !sessionDate ||
                                data.meetingDate.slice(0,10).startsWith(sessionDate))"
                                style="width: 100%"
                                :default-sort = "{prop: 'meetingDate', order: 'descending'}">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <p>Czas trwania sesji: {{ props.row.duration }} h</p>
                                    <p>Tematyka: {{ props.row.topic }}</p>
                                    <p>Address: {{ props.row.city }} ul. {{ props.row.street }} {{ props.row.houseNumber }}</p>
                                    <p>Notatki: {{ props.row.notes }}</p>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="meetingDate"
                                    label="Data sesji"
                                    sortable
                                    align="center"
                                    width="400">
                                <template slot-scope="x">
                                    <p>{{getDate(x.row.meetingDate)}}</p>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="meetingDate"
                                    label="Godzina spotkania"
                                    align="center"
                                    width="400">
                                <template slot-scope="x">
                                    <p>{{getTime(x.row.meetingDate)}}</p>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="invitingUser.username"
                                    label="Użytkownik"
                                    width="max"
                                    align="center">
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
    import Menu from "@/components/Account/Menu";
    import Notification from "@/models/notification";
    export default {
        components: {
            Menu
        },
        methods: {
            getAllForUser(username) {
                apiService.getAllForUser(username).then((data) => {
                    this.invitations = data;
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
                    return "Utworzone";
                } else if (status == "ACCEPTED"){
                    return 'Zaakceptowane';
                } else if (status == "CANCELED"){
                    return 'Anulowane';
                }
            },
            getDate(date){
                return date.slice(0,10)
            },
            getTime(date){
                return date.slice(11,19)
            },
            translateStatusOnEnglish(status) {
                if(status == "Utworzone"){
                    return "CREATED";
                } else if (status == "Zaakceptowane"){
                    return 'ACCEPTED';
                } else if (status == "Anulowane"){
                    return 'CANCELED';
                }
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        mounted() {
            this.getAllForUser(this.currentUser.username)
        },
        data() {
            return {
                search: '',
                notification: new Notification('', ''),
                invitations: [],
                statusRequired: 'ACCEPTED',
                state: '',
                sessionDate: '',
                whenOptions: [{
                    value: 1,
                    label: 'Przyszłe'
                }, {
                    value: 0,
                    label: 'Odbyte'
                }, {
                    value: '',
                    label: '-'
                },],
                pickerOptions: {
                    shortcuts: [{
                        text: 'Dzisiaj',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: 'Wczoraj',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: 'Tydzień temu',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
            }
        }
    }
</script>

<style scoped>
    .is-selected {
        color: #1989FA;
    }
</style>
