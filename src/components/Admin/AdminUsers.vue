<template>
    <el-container>
        <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                <el-breadcrumb-item>Użytkownicy</el-breadcrumb-item>
            </el-breadcrumb>
            <el-row>
                <el-col :span="8"><div>
                    <el-form ref="form" :model="form" label-width="150px" :label-position="left">
                        <el-form-item label="Profesja" >
                            <el-select v-model="form.role">
                                <el-option
                                        v-for="item in form.roleOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">
                    <el-form ref="form" :model="form" label-width="180px">
                        <el-form-item label="Nazwa użytkownika">
                            <el-input v-model="form.username"></el-input>
                        </el-form-item>
                    </el-form>
                </div></el-col>
            </el-row>
            <el-row :gutter="20"  v-for="user in users" :key="user.users"
                    v-if="(!form.role || user.role == form.role) &&
                    (!form.username || user.username == form.username)">
                <el-card>
                    <el-col :span="8" style="margin-bottom: 15px; margin-top: 10px">
                        <h4 style="display: inline"> Nazwa użytkownika:</h4>
                        {{user.username}}
                    </el-col>
                    <el-col :span="8" style="margin-bottom: 15px; margin-top: 10px">
                        <h4 style="display: inline">  Profesja:  </h4>
                       {{getOccupation(user)}}
                    </el-col>
                    <el-col :span="3" style="margin-bottom: 15px">
                        <el-button type="primary" @click="goToProfile(user)">Wejdź na profil</el-button>
                    </el-col>
                    <el-col :span="3" style="margin-bottom: 15px">
                        <el-button type="primary" @click="deleteUser(user.username)">Usuń profil</el-button>
                    </el-col>
                </el-card>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import {APIService} from "@/services/APIService";
    const apiService = new APIService();
    export default {
        mounted() {
            if (!this.currentUser || !this.currentUser.role.includes('ADMIN')) {
                this.$router.push('/');
            }
            this.getUsers();
        },
        name: 'AdminUsers',
        components: {},
        data() {
            return {
                users: [],
                model:[],
                photographer: [],
                id: 0,
                gender: 'U',
                form: {
                    username: '',
                    role: '',
                    roleOptions: [{
                        value: 'MODEL',
                        label: 'model/modelka'
                    }, {
                        value: 'PHOTOGRAPHER',
                        label: 'fotograf'
                    }, {
                        value: '',
                        label: '-'
                    },],
                }
            }
        },
        methods: {
            getUsers() {
                apiService.getAllUsers().then((data) => {
                    this.users = data;
                });
            },
            getOccupation(user) {
                if(user.role.includes('ADMIN')){
                    return "administrator";
                }
                else if(user.role.includes('MODEL')){
                    apiService.getModelByUsername(user.username).then((data) => {
                        this.id = data.id;
                    });
                    return "model/modelka";
                }
                else if(user.role.includes('PHOTOGRAPHER')){
                    apiService.getPhotographerByUsername(user.username).then((data) => {
                        this.id = data.id;
                    });
                    return "fotograf";
                }
            },
            goToProfile(user){
                if(user.role.includes('ADMIN')){
                    this.$router.push({ path: `/` })
                }
                else if(user.role.includes('MODEL')){
                    apiService.getModelByUsername(user.username).then((data) => {
                        this.$router.push({ path: `/models/${data.id}` })
                    });
                }
                else if(user.role.includes('PHOTOGRAPHER')){
                    apiService.getPhotographerByUsername(user.username).then((data) => {
                        this.$router.push({ path: `/photographers/${data.id}` })
                    });
                }
            },
            deleteUser(username) {
                this.$confirm('Czy na pewno chcesz usunąć tego użytkownika?', 'Potwierdzenie', {
                    confirmButtonText: 'Usuń',
                    cancelButtonText: 'Anuluj',
                    type: 'warning',
                    center: true
                }).then(() => {
                    apiService.deleteUser(username).then(data => {
                            this.message = data.message;
                            location.reload();
                            this.$message({
                                type: 'success',
                                message: 'Usunięto użytkownika'
                            });
                        },
                        error => {
                            this.message = error.message;
                        });
                }).catch(() => {
                });
            },
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        }
    }
</script>

<style scoped>


</style>
