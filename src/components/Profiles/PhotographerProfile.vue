<template>
    <el-container>
        <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
                <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                <el-breadcrumb-item>Profile</el-breadcrumb-item>
                <el-breadcrumb-item>{{photographer.user.username}}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-row :gutter="20">
                <el-col :span="6"><div class="grid-content bg-purple">
                    <div class="demo-image" style="margin-bottom: 15px">
                        <span class="demonstration"></span>
                        <el-image
                                style="width: 200px; height: 200px"
                                :src="url"
                                :fit="'fill'">
                        </el-image>
                    </div>
                    {{photographer.user.username}}
                </div></el-col>
                <el-col :span="4"><div>
                        {{photographer.survey.firstName}} {{photographer.survey.lastName}}
                    <el-row style="margin-top: 20px">
                        {{photographer.survey.city}}, {{photographer.survey.region}}
                    </el-row>
                    <el-row style="margin-top: 10px">
                        {{getGender(photographer.survey.gender)}},
                    </el-row>
                    <el-row style="margin-top: 10px">
                        {{photographer.survey.age}}
                    </el-row>
                    <el-row style="margin-top: 10px">
                        Tel: {{photographer.survey.phoneNumber}}
                    </el-row>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple" style="margin-top: 20px">
                    <el-button type="primary"
                               @click="$router.push({ path: `/portfolios/u/${photographer.user.username}` })">Zobacz portfolio</el-button>
                    <el-button v-if="addCommentPossible" type="primary"
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
                            <el-table-column
                                    fixed="right"
                                    label="Usuwanie"
                                    width="170">
                                <template slot-scope="scope">
                                    <el-button v-if="deleteCommentPossible(scope.row.ratingUser.username)"  @click="deleteComment(scope.row.id)"
                                               type="text">Usuń</el-button>
                                </template>
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
            this.getPhotographerById(this.id)
        },
        data() {
            return {
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                comment: new Comment('', '', '', ''),
                photographer: [],
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
            getPhotographerById(id) {
                apiService.getPhotographerById(id).then((data) => {
                    this.photographer = data;
                });
            },
            getCommentsByRatedUser(username) {
                apiService.getCommentsByRatedUser(username).then((data) => {
                    this.comments = data;
                });
            },
            getGender(gender){
                if(gender=='W') return "kobieta"
                else if (gender=='M') return "mężczyzna"
            },
            handleChange() {
                this.username = this.photographer.user.username
                this.getCommentsByRatedUser( this.username )
            },
            addComment() {
                this.comment.ratingUserUsername = this.currentUser.username;
                this.comment.ratedUserUsername = this.photographer.user.username;
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
            deleteComment(id) {
                apiService.deleteComment(id).then(
                        data => {
                            this.message = data.message;
                        },
                        error => {
                            this.message = error.message;
                        }
                    );
                },
            deleteCommentPossible(username) {
                if (this.currentUser.username == username) {
                    return true;
                }
                else return false;
            },
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
            addCommentPossible() {
                if (this.currentUser) {
                    return true;
                }
                else return false;
            }
        }
    }
</script>

<style scoped>

</style>
