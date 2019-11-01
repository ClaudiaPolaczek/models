<template>
    <el-container>
        <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
                <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                <el-breadcrumb-item>Użytkownicy</el-breadcrumb-item>
            </el-breadcrumb>
            <el-row>
                <el-col :span="5"><div class="grid-content bg-purple">
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="Profesja">
                            <el-select v-model="form.role" placeholder="Wybierz">
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
                <el-col :span="5"><div class="grid-content bg-purple">
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
                    <el-col :span="6">
                        Nazwa użytkownika: {{user.username}}
                    </el-col>
                    <el-col :span="8">
                        Profesja:  {{user.role}}
                    </el-col>
                    <el-col :span="4" style="margin-bottom: 10px">
                        <el-button type="primary" @click="$router.push({ path: `/photographers/${photographer.id}` })">Wejdź na profil</el-button>
                    </el-col>
                    <el-col :span="4">
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
            this.getUsers();
        },
        name: 'AdminUsers',
        components: {},
        data() {
            return {
                users: [],
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
            deleteUser(username) {
                apiService.deleteUser(username).then(data => {
                        this.message = data.message;
                    },
                    error => {
                        this.message = error.message;
                    });
            },

        },
        computed: {}
    }
</script>

<style scoped>

</style>
