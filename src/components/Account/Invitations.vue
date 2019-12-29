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
                        <el-breadcrumb-item>Zaproszenia</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-row>
                        <el-col :span="10" style="margin-right: 50px"><div>
                            <el-form label-width="250px">
                                <el-form-item label="Zapraszający użytkownik">
                                    <el-input v-model="search"></el-input>
                                </el-form-item>
                            </el-form>
                        </div></el-col>
                        <el-col :span="8"><div>
                            <el-form label-width="200px">
                                <el-form-item label="Status sesji zdjęciowej">
                                    <el-select v-model="statusRequired">
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
                    </el-row>
                    <el-row>
                        <el-table
                                :data="invitations.filter(data => !statusRequired ||
                                data.photoShootStatus.toLowerCase().startsWith(statusRequired.toLowerCase()))
                                .filter(data => !search ||
                                data.invitingUser.username.toLowerCase().startsWith(search.toLowerCase()))"
                                style="width: 100%"
                                :default-sort = "{prop: 'meetingDate', order: 'descending'}">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <p>Czas trwania sesji: {{ props.row.duration }} h</p>
                                    <p>Tematyka: {{ props.row.topic }}</p>
                                    <p>Adres: {{ props.row.city }} ul. {{ props.row.street }} {{ props.row.houseNumber }}</p>
                                    <p>Notatki: {{ props.row.notes }}</p>
                                </template>
                            </el-table-column>
                        <el-table-column
                                prop="invitingUser.username"
                                label="Użytkownik"
                                width="240"
                                align="center">
                        </el-table-column>
                            <el-table-column
                                    prop="meetingDate"
                                    label="Data sesji"
                                    sortable
                                    align="center"
                                    width="200">
                                <template slot-scope="x">
                                    <p>{{getDate(x.row.meetingDate)}}</p>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="meetingDate"
                                    label="Godzina spotkania"
                                    align="center"
                                    width="210">
                                <template slot-scope="x">
                                    <p>{{getTime(x.row.meetingDate)}}</p>
                                </template>
                            </el-table-column>
                        <el-table-column
                                prop="photoShootStatus"
                                label="Status"
                                width="fill"
                                align="center">
                            <template slot-scope="x">
                                <p>{{translateStatus(x.row.photoShootStatus)}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="Operacje"
                                width="250">
                            <template slot-scope="scope">
                                <el-button v-if="canAccept(scope.row.photoShootStatus)"
                                           @click="acceptPhotoshoot(scope.row.id, scope.row.invitingUser.username)"
                                           type="primary">Akceptuj</el-button>
                                <el-button v-if="canCancel(scope.row.photoShootStatus)"
                                           @click="cancelPhotoshoot(scope.row.id , scope.row.invitingUser.username)"
                                           type="danger">Odrzuć</el-button>
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
    import Menu from "@/components/Account/Menu";
    export default {
        components: {
            Menu
        },
        methods: {
            getAllByInvitedUserUsername(username) {
                apiService.getAllByInvitedUserUsername(username).then((data) => {
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
                location.reload();
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
                } else if (status == "END"){
                    return 'Zakończone';
                }
            },
            translateStatusOnEnglish(status) {
                if(status == "Utworzone"){
                    return "CREATED";
                } else if (status == "Zaakceptowane"){
                    return 'ACCEPTED';
                } else if (status == "Anulowane"){
                    return 'CANCELED';
                }
            },
            getDate(date){
                return date.slice(0,10)
            },
            getTime(date){
                return date.slice(11,19)
            },
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        mounted() {
            this.getAllByInvitedUserUsername(this.currentUser.username)
        },
        data() {
            return {
                search: '',
                notification: new Notification('', ''),
                invitations: [],
                statusRequired: '',
                statusOptions: [{
                    value: 'ACCEPTED',
                    label: 'Zaakceptowne'
                }, {
                    value: 'CANCELED',
                    label: 'Anulowane'
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
.el-table{
    font-size: 15px;
    text-align: center;
}

.el-button--primary {
    color: #FFF;
    background-color: #213159;
    border-color: #213159;
}

.el-button--danger {
    color: #FFF;
    background-color: darkred;
    border-color: darkred;
}

.el-button--primary:focus, .el-button--primary:hover {
    background: #4466BA;
    border-color: #4466BA;
    color: #FFF;
}
</style>
