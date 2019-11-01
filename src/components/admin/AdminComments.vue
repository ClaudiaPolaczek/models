<template>
    <el-container>
        <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
                <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                <el-breadcrumb-item>Komentarze</el-breadcrumb-item>
            </el-breadcrumb>
            <el-row>
                <el-col :span="10"><div class="grid-content bg-purple">
                    <el-form ref="form" :model="form" label-width="250px">
                        <el-form-item label="Nazwa użytkownika oceniającego">
                            <el-input v-model="form.ratingUserUsername"></el-input>
                        </el-form-item>
                    </el-form>
                </div></el-col>
                <el-col :span="10"><div class="grid-content bg-purple">
                    <el-form ref="form" :model="form" label-width="250px">
                        <el-form-item label="Nazwa użytkownika ocenianego">
                            <el-input v-model="form.ratedUserUsername"></el-input>
                        </el-form-item>
                    </el-form>
                </div></el-col>
            </el-row>
            <el-row :gutter="20"  v-for="comment in comments" :key="comment.comments"
                    v-if="(!form.ratingUserUsername || comment.ratingUser.username == form.ratingUserUsername) &&
                    (!form.ratedUserUsername || comment.ratedUser.username == form.ratedUserUsername)">
                <el-card>
                    <el-col :span="6">
                        <el-row style="margin-top: 10px">
                            Nazwa użytkownika oceniającego: {{comment.ratingUser.username}}
                        </el-row>
                        <el-row>
                            Nazwa użytkownika ocenianiego: {{comment.ratedUser.username}}
                        </el-row>
                    </el-col>
                    <el-col :span="6">
                        Ocena:  {{comment.rating}}</el-col>
                    <el-col :span="6"> Treść:  {{comment.content}}</el-col>
                    <el-col :span="6">
                        <el-button type="primary" @click="deleteComment(comment.id)" style="margin-bottom: 20px">Usuń komentarz</el-button>
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
            this.getComments();
        },
        name: 'AdminComments',
        components: {},
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
            deleteComment(username) {
                apiService.deleteComment(username).then(data => {
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
