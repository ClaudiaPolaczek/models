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
                        <el-form name="form" :rules="rules"  ref="form" :model="form" label-width="150px" :label-position="left">
                            <el-form-item label="Miasto" prop="city">
                                <el-input v-model="form.city"></el-input>
                            </el-form-item>
                            <el-form-item label="Ulica" prop="street">
                                <el-input v-model="form.street"></el-input>
                            </el-form-item>
                            <el-form-item label="Numer domu" prop="houseNumber">
                                <el-input v-model="form.houseNumber"></el-input>
                            </el-form-item>
                            <el-form-item label="Tematyka sesji" prop="topic">
                                <el-input v-model="form.topic"></el-input>
                            </el-form-item>
                            <el-form-item label="Data" prop="meetingDate">
                                <el-date-picker
                                        v-model="form.meetingDate"
                                        type="datetime"
                                        value-format="yyyy-MM-ddTHH:mm:ss"
                                        placeholder="Wybierz datę i godzinę">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="Czas trwania" prop="duration">
                                <el-input  v-model.number="form.duration"></el-input>
                            </el-form-item>
                            <el-form-item label="Notatka">
                                <el-input type="textarea"
                                          maxlength="200"
                                          show-word-limit
                                          :rows="4"
                                          v-model="form.notes"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="handleRegisterNewPhotoShoot('form')">Wyślij zaproszenie</el-button>
                                    <el-button type="primary" @click="$router.push('/')">Anuluj</el-button>
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
            if (!this.currentUser) {
               this.$router.push('/login');
            }
            this.username = this.$route.params.username
            this.getFullUser(this.username);
        },
        data() {
            return {
                user: [],
                occupation: '',
                username: '',
                invitation: new Invitation('', '', '', '', '', '', '', '', ''),
                message: '',
                form: {
                    invitingUserUsername: '',
                    invitedUserUsername: '',
                    city: '',
                    street: '',
                    houseNumber: '',
                    topic: '',
                    notes: '',
                    meetingDate: '',
                    duration: '',
                },
                rules: {
                    city: [
                        { required: true, message: 'Podaj miasto', trigger: 'change' },
                        { min: 3, message: 'Długość nazwy miasta powinna być wieksza niz 3', trigger: 'blur' }
                    ],
                    street: [
                        { required: true, message: 'Podaj ulice', trigger: 'change' },
                        { min: 3, message: 'Długość nazwy ulicy powinna być wieksza niz 3', trigger: 'blur' }
                    ],
                    houseNumber: [
                        { required: true, message: 'Podaj numer domu ', trigger: 'change' }
                    ],
                    topic: [
                        { required: true, message: 'Podaj temat sesji', trigger: 'change' }
                    ],
                    meetingDate: [
                        { required: true, message: 'Wybierz datę sesji ', trigger: 'blur' }
                    ],
                    duration: [
                        { required: true, message: 'Wybierz długość trwania sesji ', trigger: 'blur' },
                        { type: 'number', message: 'Czas musi być liczbą'}
                    ],
                }
            };
        },
        methods: {
            handleRegisterNewPhotoShoot(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.message = '';
                        this.invitation.invitingUserUsername = this.currentUser.username;
                        this.invitation.invitedUserUsername = this.user.user.username;
                        this.invitation.city = this.form.city;
                        this.invitation.street = this.form.street;
                        this.invitation.houseNumber = this.form.houseNumber;
                        this.invitation.topic = this.form.topic;
                        this.invitation.notes = this.form.notes;
                        this.invitation.meetingDate = this.form.meetingDate;
                        this.invitation.duration = this.form.duration;
                        apiService.addPhotoshoot(this.invitation).then(
                            data => {
                                this.message = data.message;
                                location.reload()
                            },
                            error => {
                                this.message = error.message;
                            }
                        );
                    } else {
                        this.$message({
                            message: 'Niepoprawne dane ',
                            type: 'error',
                            offset: 30
                        });
                        return false;
                    }
                })
            },
            getPhotographerById(id) {
                apiService.getPhotographerById(id).then((data) => {
                    this.user = data;
                });
            },
            getModelById(id) {
                apiService.getModelById(id).then((data) => {
                    this.user = data;
                });
            },
            getFullUser(username) {
                apiService.getUserById(username).then((data) => {
                    this.user = data;
                    if(this.user.role.includes('MODEL')){
                        apiService.getModelByUsername(username).then((data) => {
                            this.user = data;
                        });
                    }
                    else if(this.user.role.includes('PHOTOGRAPHER')){
                        apiService.getPhotographerByUsername(username).then((data) => {
                            this.user = data;
                        });
                    }
                });
            },
        }
    };
</script>

<style scoped>
    /*.el-form{*/
    /*    margin-left: 50px;*/
    /*}*/
</style>
