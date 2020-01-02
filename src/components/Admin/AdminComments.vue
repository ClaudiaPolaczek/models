<template>
    <el-container>
        <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                <el-breadcrumb-item>Komentarze</el-breadcrumb-item>
            </el-breadcrumb>
            <el-row>
                <el-col :span="10" ><div>
                    <el-form ref="form" :model="form" label-width="300px">
                        <el-form-item label="Oceniający użytkownik">
                            <el-input v-model="form.ratingUserUsername"></el-input>
                        </el-form-item>
                    </el-form>
                </div></el-col>
                <el-col :span="10"><div>
                    <el-form ref="form" :model="form" label-width="300px">
                        <el-form-item label="Oceniany użytkownik">
                            <el-input v-model="form.ratedUserUsername"></el-input>
                        </el-form-item>
                    </el-form>
                </div></el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <h2 style="margin-top: 5px; margin-bottom: 5px; font-size: 20px">Dane użytkowników</h2>
                </el-col>
                <el-col :span="4">
                    <h2 style="margin-top: 5px; margin-bottom: 5px; font-size: 20px">Ocena</h2>
                </el-col>
                <el-col :span="8">
                    <h2 style="margin-top: 5px; margin-bottom: 5px; font-size: 20px">Treść</h2>
                </el-col>
                <el-col :span="6">
                </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px" v-for="comment in comments" :key="comment.comments"
                    v-if="(!form.ratingUserUsername || comment.ratingUser.username == form.ratingUserUsername) &&
                    (!form.ratedUserUsername || comment.ratedUser.username == form.ratedUserUsername)">
                <el-card>
                    <el-col :span="6">
                        <el-row style="margin-top: 5px">
                            Oceniający użytkownik: {{comment.ratingUser.username}}
                        </el-row>
                        <el-row style="margin-top: 5px;">
                            Oceniany użytkownik: {{comment.ratedUser.username}}
                        </el-row>
                    </el-col>
                    <el-col :span="4">
                        {{comment.rating}}</el-col>
                    <el-col :span="8" style="text-align: justify"> {{comment.content}}</el-col>
                    <el-col :span="6">
                        <el-button type="primary" @click="deleteComment(comment.id)" style="margin-top: 10px">Usuń komentarz</el-button>
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
            this.getComments();
        },
        name: 'AdminComments',
        components: {
        },
        data() {
            return {
                comments: [],
                form: {
                    ratingUserUsername: '',
                    ratedUserUsername: '',
                }
            }
        },
        methods: {
            getComments() {
                apiService.getComments().then((data) => {
                    this.comments = data;
                });
            },
            deleteComment(id) {
                this.$confirm('Czy na pewno chcesz usunąć ten komentarz?', 'Potwierdzenie', {
                    confirmButtonText: 'Usuń',
                    cancelButtonText: 'Anuluj',
                    type: 'warning',
                    center: true
                }).then(() => {
                    apiService.deleteComment(id).then(data => {
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
    .el-button{
        border-color: #213159;
        background-color: #213159;
    }
</style>
