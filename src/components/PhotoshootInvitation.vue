<template>
    <el-container>
        <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
                <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                <el-breadcrumb-item>Profile</el-breadcrumb-item>
                <el-breadcrumb-item>{{user.user.username}}</el-breadcrumb-item>
                <el-breadcrumb-item>Zaproszenie na sesję</el-breadcrumb-item>
            </el-breadcrumb>
            <el-row type="flex" justify="center" :gutter="20" style="margin-top: 0px">
                <el-col :span="12">
                    <el-card>
                        <h2>Zaproszenie na sesję</h2>
                        <el-form name="form" :rules="rules" label-width="120px" class="demo-ruleForm" label-position="left">
                            <el-form-item>
                                <div class="alert alert-danger" role="alert" v-if="message">{{message}}</div>
                            </el-form-item>
                            <el-form-item label="Miasto" prop="city">
                                <el-input v-model="invitation.city"></el-input>
                            </el-form-item>
                            <el-form-item label="Ulica" prop="street">
                                <el-input v-model="invitation.street"></el-input>
                            </el-form-item>
                            <el-form-item label="Numer domu" prop="houseNumber">
                                <el-input v-model="invitation.houseNumber"></el-input>
                            </el-form-item>
                            <el-form-item label="Tematyka sesji" prop="topic">
                                <el-input v-model="invitation.topic"></el-input>
                            </el-form-item>
                            <el-form-item label="Data" prop="meetingDate">
                                <el-date-picker
                                        v-model="invitation.meetingDate"
                                        type="date"
                                        placeholder="Pick a day">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="Czas trwania" prop="duration">
                                <el-input  v-model="invitation.duration"></el-input>
                            </el-form-item>
                            <el-form-item label="Notatka" prop="notes">
                                <el-input type="textarea" v-model="invitation.notes"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="handleRegisterNewPhotoShoot">Wyślij zaproszenie</el-button>
                                    <el-button @click="$router.push('/')">Anuluj</el-button>
                                </el-form-item>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import Invitation from "@/models/invitation";
    import {APIService} from "@/services/APIService";
    const apiService = new APIService();
    export default {
        photo: "photoshoot",
        active: 0,
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            },
            currentUser() {
                return this.$store.state.auth.user;
            },
        },
        mounted() {
            // if (!this.currentUser) {
            //    this.$router.push('/login');
            // }
            this.id = this.$route.params.id
            this.getPhotographerById(this.id)
        },
        data() {
            return {
                user: [],
                id: '',
                invitation: new Invitation('', '', '', '', '', '', '', '', ''),
                message: '',
                rules: {
                    meetingDate: [
                        { required: true, message: 'Podaj imię', trigger: 'blur' },
                        { min: 1, message: 'Długość imienia powinna być wieksza niz 1', trigger: 'blur' }
                    ],
                    duration: [
                        { required: true, message: 'Podaj nazwisko', trigger: 'blur' },
                        { min: 1, message: 'Długość nazwiska powinna być wieksza niz 1', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: 'Podaj miasto', trigger: 'change' }
                    ],
                    street: [
                        { required: true, message: 'Podaj ulice', trigger: 'change' }
                    ],
                    houseNumber: [
                        { required: true, message: 'Podaj numer domu ', trigger: 'change' }
                    ],
                    topic: [
                        { required: true, message: 'Podaj temat sesji', trigger: 'change' }
                    ]
                }
            };
        },
        methods: {
            handleRegisterNewPhotoShoot() {
                this.message = '';
                this.invitation.invitingUserUsername = this.currentUser.username;
                this.invitation.invitedUserUsername = this.user.user.username;
                apiService.addPhotoshoot(this.invitation).then(
                    data => {
                        this.message = data.message;
                    },
                    error => {
                        this.message = error.message;
                    }
                );
            },
            getPhotographerById(id) {
                apiService.getPhotographerById(id).then((data) => {
                    this.user = data;
                });
            },
        }
    };
</script>

<style scoped>
    .el-form{
        margin-left: 50px;
    }
</style>
