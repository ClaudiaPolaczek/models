<template>
    <el-container>
        <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                <el-breadcrumb-item>Profile</el-breadcrumb-item>
                <el-breadcrumb-item>{{model.user.username}}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-row :gutter="20">
                <el-col :span="8"><div>
                    <div class="demo-image" style="margin-bottom: 15px">
                        <el-image
                                style="width: 300px; height: 300px"
                                :src="model.user.mainPhotoUrl"
                                :fit="'contain'">
                        </el-image>
                    </div>
                    {{model.user.username}}
                </div></el-col>
                <el-col :span="6"><div>
                    <el-row style="margin-top: 0px" class="profile">
                        <h3 style="margin-top: 0px"> Informacje o profilu: </h3>
                        {{model.survey.firstName}} {{model.survey.lastName}}
                    </el-row>
                    <el-row class="profile">
                        {{model.survey.city}} ({{model.survey.region}})
                    </el-row>
                    <el-row class="profile">
                        Wiek - {{getAge(model.survey.birthdayYear)}},  {{getGender(model.survey.gender)}}
                    </el-row>
                    <el-row class="profile">
                        Telefon - {{model.survey.phoneNumber}}
                    </el-row>
                    <el-row class="profile">
                        Oczy - {{model.eyesColor}}
                    </el-row>
                    <el-row class="profile">
                        Włosy - {{model.hairColor}}
                    </el-row>
                </div></el-col>
                <el-col :span="4"><div style="margin-top: 20px">
                    <el-row class="profile">
                        <el-button type="primary"
                                   @click="$router.push({ path: `/portfolios/u/${model.user.username}` })">Zobacz portfolio</el-button>
                    </el-row>
                    <el-row class="profile">
                        <el-button  v-if="addCommentPossible" type="primary"
                                    @click="$router.push({ path: `/photoshoot/${model.user.username}` })">Zaproś na sesję</el-button>
                    </el-row>
                </div></el-col>
                <el-col :span="2" style=" text-align: center">
                    <el-row style="margin-top: 15px;">
                        <font-awesome-icon v-if="ifHasInstagram" :icon="['fab', 'instagram']" size=" fa-3x" style="color: #213169" @click="goToInstagram"/>
                    </el-row>
                    <el-row style="margin-top: 0px; text-align: center; color: #213169">
                        {{this.model.survey.instagramName}}
                    </el-row>
                </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 30px; text-align: left; margin-left: 50px">
                <el-collapse accordion @change="handleChange">
                    <el-collapse-item name="Komentarze">
                        <template slot="title">
                            <h3>Komentarze</h3>
                            <el-button type="primary" size="small" v-if="addCommentPossible" style="margin-left: 30px"
                                       @click="dialogFormVisible = true">Dodaj komentarz</el-button>
                            <el-dialog :visible.sync="dialogFormVisible" width="40%">
                                <h2 style="margin-top: 0px; text-align: center">Nowy komentarz</h2>
                                <el-form :model="form"  ref="form" :label-position="top" >
                                    <el-form-item label="Ocena">
                                        <el-rate v-model="form.stars"></el-rate>
                                    </el-form-item>
                                    <el-form-item label="Treść">
                                        <el-input type="textarea"
                                                  maxlength="800"
                                                  show-word-limit
                                                  :rows="6" v-model="form.content"></el-input>
                                    </el-form-item>
                                </el-form>
                                <span slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="dialogFormVisible = false">Anuluj</el-button>
                                    <el-button type="primary" @click="addComment('form')">Dodaj</el-button>
                                </span>
                            </el-dialog>
                        </template>
                        <el-table
                                :data="comments"
                                style="width: 100%; margin-top: 20px">
                            <el-table-column
                                    prop="ratingUser.username"
                                    label="Nazwa użytkownika"
                                    width="220">
                            </el-table-column>
                            <el-table-column
                                    prop="content"
                                    label="Treść"
                                    width="700">
                            </el-table-column>
                            <el-table-column
                                    label="Ocena"
                                    width="180">
                                <template slot-scope="x">
                                <el-rate
                                        v-model="x.row.rating"
                                        disabled>
                                </el-rate>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="addedDate"
                                    label="Data dodania"
                                    width="180">
                                    <template slot-scope="x">
                                        <p>{{getDate(x.row.addedDate)}}</p>
                                    </template>
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="Usuwanie"
                                    width="fill">
                                <template slot-scope="scope">
                                    <el-button v-if="deleteCommentPossible(scope.row.ratingUser.username)"  @click="deleteComment(scope.row.id)"
                                               type="primary">  Usuń  </el-button>
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
    import Notification from "@/models/notification";
    export default {
        mounted() {
            this.id = this.$route.params.id
            this.getModelById(this.id)
        },
        data() {
            return {
                comment: new Comment('', '', '', ''),
                notification: new Notification('', ''),
                model: [],
                user: [],
                message: '',
                id: 0,
                username: '',
                instagram: "https://www.instagram.com/",
                tabUrl: '',
                comments: [],
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    stars: '',
                    content: '',
                }
            };
        },
        methods: {
            getModelById(id) {
                apiService.getModelById(id).then((data) => {
                    this.model = data;
                    this.tabUrl = this.instagram.concat(this.model.survey.instagramName)
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
                this.username = this.model.user.username
                this.getCommentsByRatedUser( this.username )
            },
            addComment(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                            this.comment.ratingUserUsername = this.currentUser.username;
                            this.comment.ratedUserUsername = this.model.user.username;
                            if(this.comment.ratingUserUsername != this.comment.ratedUserUsername) {
                                this.comment.rating = this.form.stars;
                                this.comment.content = this.form.content;
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

                                this.notification.username = this.comment.ratedUserUsername;
                                this.notification.content = 'Nowy komentarz od ' + this.comment.ratingUserUsername + ': ' + this.comment.content;

                                apiService.addNotification(this.notification).then(
                                    data => {
                                        this.message = data.message;
                                        this.notification = data;
                                    },
                                    error => {
                                        this.message = error.message;
                                    }
                                );

                            } else this.dialogFormVisible = false
                        } else {
                        this.$message({
                            message: 'Nieuzupełnione wymagane dane',
                            type: 'error',
                            offset: 30
                        });
                        return false;
                    }
                })
            },
            deleteComment(id) {
                apiService.deleteComment(id).then(
                    data => {
                        this.message = data.message;
                        location.reload();
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
            getAge(year){
                const date = new Date();
                return  date.getFullYear() - year;
            },
            getDate(date){
                return date.slice(0,10)
            },
            goToInstagram(){
                window.open(this.tabUrl)
            }
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
            ifHasInstagram(){
                if(this.model.survey.instagramName!=null) return true;
                else return false
            }
        }
    }
</script>

<style scoped>
.profile{
    text-align: left;
    margin-top: 15px;
}

.el-dialog__title{
        font-size: 30px;
    }

.el-form-item{
    margin-bottom: 0px;
    margin-top: 0px;
}

.el-form{
    margin-bottom: 0px;
}

.el-form-item__label{
    font-size: 30px;
}
</style>
