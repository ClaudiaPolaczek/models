<template>
    <el-container>
        <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
                <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                <el-breadcrumb-item>Profile</el-breadcrumb-item>
                <el-breadcrumb-item>{{model.user.username}}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-row :gutter="20">
                <el-col :span="6"><div class="grid-content bg-purple">
                    <div class="demo-image" style="margin-bottom: 15px">
                        <span class="demonstration"></span>
                        <el-image
                                style="width: 200px; height: 200px"
                                :src="model.user.mainPhotoUrl"
                                :fit="'fill'">
                        </el-image>
                    </div>
                    {{model.user.username}}
                </div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple" >
                        {{model.survey.firstName}} {{model.survey.lastName}}
                    <el-row style="margin-top: 20px">
                        {{model.survey.city}}, {{model.survey.region}}
                    </el-row>
                    <el-row style="margin-top: 10px">
                        Wiek: {{model.survey.age}},  {{getGender(model.survey.gender)}}
                    </el-row>
                    <el-row style="margin-top: 10px">
                        Tel: {{model.survey.phoneNumber}}
                    </el-row>
                    <el-row style="margin-top: 10px">
                        Oczy: {{model.eyesColor}}
                    </el-row>
                    <el-row style="margin-top: 10px">
                        Włosy: {{model.hairColor}}
                    </el-row>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple" style="margin-top: 20px">
                    <el-button type="primary"
                               @click="$router.push('/user/id')">Zobacz portfolio</el-button>
                    <el-button  v-if="addCommentPossible" type="primary"
                                @click="$router.push({ path: `/photoshoot/${id}` })">Zaproś na sesję</el-button>
                </div></el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 30px; text-align: left; margin-left: 50px">
                <el-collapse accordion v-model="activeNames" @change="handleChange">
                    <el-collapse-item name="Komentarze">
                        <template slot="title">
                            Komentarze
                            <el-button v-if="addCommentPossible" style="margin-left: 30px" @click="dialogFormVisible = true">Dodaj komentarz</el-button>
                            <el-dialog title="Nowy komentarz" :visible.sync="dialogFormVisible">
                                <el-form :model="form">
                                    <el-form-item label="Ocena" :label-width="formLabelWidth">
                                        <div class="block">
                                            <el-rate v-model="comment.rating"></el-rate>
                                        </div>
                                    </el-form-item>
                                    <el-form-item label="Treść">
                                        <el-input type="textarea" v-model="comment.content"></el-input>
                                    </el-form-item>
                                </el-form>
                                <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">Anuluj</el-button>
                            <el-button type="success" @click="addComment">Dodaj</el-button>
                        </span>
                            </el-dialog>
                        </template>
                        <el-table
                                :data="comments"
                                stripe
                                style="width: 100%">
                            <el-table-column
                                    prop="ratingUser.username"
                                    label="Nazwa użytkownika"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="content"
                                    label="Treść"
                                    width="700">
                            </el-table-column>
                            <el-table-column
                                    label="Ocena"
                                    width="180">
                                <el-rate
                                        v-model="comments.rating" disabled>
                                </el-rate>
                            </el-table-column>
                            <el-table-column
                                    prop="addedDate"
                                    label="Data dodania"
                                    width="180">
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                </el-collapse>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import {APIService} from '../../services/APIService';
    const apiService = new APIService();
    import Comment from "@/models/comment";
    export default {
        mounted() {
            this.id = this.$route.params.id
            this.getModelById(this.id)
        },
        data() {
            return {
                comment: new Comment('', '', '', ''),
                model: [],
                user: [],
                message: '',
                id: 0,
                username: '',
                comments: [],
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    stars: '',
                    content: '',
                },
                formLabelWidth: '120px'
            };
        },
        methods: {
            getModelById(id) {
                apiService.getModelById(id).then((data) => {
                    this.model = data;
                });
            },
            getCommentsByRatedUser(username) {
                apiService.getCommentsByRatedUser(username).then((data) => {
                    this.comments = data;
                });
            },
            getGender(gender){
                if(gender=='W') return "kobieta"
                else if (gender=='M') return "mężćzyzna"
            },
            handleChange() {
                this.username = this.model.user.username
                this.getCommentsByRatedUser( this.username )
            },
            addComment() {
                this.comment.ratingUserUsername = this.currentUser.username;
                this.comment.ratedUserUsername = this.model.user.username;
                if(this.comment.ratingUserUsername != this.comment.ratedUserUsername) {
                    apiService.addComment(this.comment).then(
                        data => {
                            this.message = data.message;
                            this.comment = data;
                            this.dialogFormVisible = false
                        },
                        error => {
                            this.message = error.message;
                        }
                    );
                } else this.dialogFormVisible = false
            },
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
            addCommentPossible() {
                if (this.currentUser) {
                    if(this.currentUser.role.includes('ADMIN')) return false;
                    else return true;
                }
                else return false;
            },
        }
    }
</script>

<style scoped>

</style>
