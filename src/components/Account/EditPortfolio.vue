<template>
    <el-container>
        <el-container>
            <el-aside width="230px">
                <Menu/>
            </el-aside>
            <el-container>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 50px">
                        <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                        <el-breadcrumb-item>Konto</el-breadcrumb-item>
                        <el-breadcrumb-item>Albumy</el-breadcrumb-item>
                        <el-breadcrumb-item>{{this.portfolio.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-row>
                        <el-col :span="6"><div>
                            <div>
                                <el-image
                                        style="width: 250px; height: 250px"
                                        :src="portfolio.mainPhotoUrl"
                                        :fit="'contain'">
                                </el-image>
                            </div>
                        </div></el-col>
                            <el-col :span="9"><div class="portfolio">
                                <el-row style="margin-top: 0px" class="profile">
                                    <h3 style="margin-top: 15px; text-align: left"> {{portfolio.name}} </h3>
                                </el-row>
                                <el-row class="portfolio" style="margin-top: 10px">
                                    <h4 style="display: inline">Data utworzenia: </h4> {{getDate(portfolio.addedDate)}}
                                </el-row>
                                <el-row class="portfolio" style="margin-top: 20px">
                                    <h4 style="margin-top: 5px">Opis </h4> {{portfolio.description}}
                                </el-row>
                            </div></el-col>
                            <el-col :span="6"><div class="portfolio" style="margin-top: 10px">
                                <el-button type="primary" @click="dialogEditFormVisible = true">Edytuj dane</el-button>
                                <el-dialog :visible.sync="dialogEditFormVisible" width="40%">
                                    <h2 style="margin-top: 0px; text-align: center; margin-bottom: 40px;">Edycja albumu</h2>
                                    <el-form :model="form" :rules="rules" ref="form">
                                        <el-form-item label="Ocena" label-width="80px" prop="name">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="Treść" prop="description">
                                            <el-input
                                                    type="textarea"
                                                    maxlength="300"
                                                    show-word-limit
                                                    :rows="6"
                                                    v-model="form.description"/>
                                        </el-form-item>
                                    </el-form>
                                    <span slot="footer" class="dialog-footer">
                                            <el-button type="primary" @click="dialogEditFormVisible = false">Anuluj</el-button>
                                            <el-button type="primary" @click="editPortfolio('form')">Edytuj</el-button>
                                </span>
                                </el-dialog>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row >
                        {{this.srcList}}
                    </el-row>
                    <el-row :gutter="20" style="margin-top: 30px; text-align: left; margin-left: 50px">
                        <el-collapse accordion v-model="activeNames" @change="handleChange">
                            <el-collapse-item name="Zdjęcia">
                                <template slot="title">
                                    <h3>Zdjęcia</h3>
                                    <el-button style="margin-left: 30px" @click="dialogFormVisible = true"
                                               type="primary" size="small">
                                        Dodaj zdjęcia
                                    </el-button>
                                    <el-dialog :visible.sync="dialogFormVisible" width="40%">
                                        <h2 style="margin-top: 0px; text-align: center; margin-bottom: 40px;">Nowe zdjęcia</h2>
                                        <el-upload
                                                class="upload-demo"
                                                action="http://localhost:8080/images/uploadFile"
                                                :on-preview="handlePreview"
                                                :on-success="addImage"
                                                :on-remove="handleRemove"
                                                :before-remove="beforeRemove"
                                                :file-list="fileList"
                                                list-type="picture">
                                            <el-button size="small" type="primary">Wybierz zdjęcie</el-button>
                                            <div slot="tip" class="el-upload__tip">Pliki do 10MB</div>
                                        </el-upload>
                                        <span slot="footer" class="dialog-footer">
                                            <el-button type="primary" @click="addImages">Dodaj</el-button>
                                        </span>
                                    </el-dialog>
                                </template>
                                <div class="demo-image__preview" v-for="image in images" :key="image.images">
                                    <el-row>
                                    <el-col :span="5">
                                    <el-image
                                            style="width: 150px; height: 150px"
                                            :src="image.fileUrl"
                                            :preview-src-list="srcList"
                                            :fit="'contain'">
                                    </el-image>
                                    </el-col>
                                    <el-col :span="5" style="margin-top: 25px">
                                        <el-button type="primary" v-if="ifMainProfilePhoto(image.fileUrl)" @click="setMainProfilePhotoUrl(image.fileUrl, image.name)">Ustaw jako profilowe</el-button>
                                    </el-col>
                                    <el-col :span="5" style="margin-top: 25px">
                                        <el-button type="primary" v-if="ifMainPortfolioPhoto(image.fileUrl)" @click="setMainPortfolioPhotoUrl(image.fileUrl)">Ustaw jako zdjęcie główne albumu</el-button>
                                    </el-col>
                                    <el-col :span="5" style="margin-top: 25px">
                                        <el-button type="primary" @click="deletePhoto(image.id, image.fileUrl)">Usuń zdjęcie</el-button>
                                    </el-col></el-row>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </el-row>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    import Menu from "@/components/Account/Menu";
    import Image from "@/models/image";
    import Portfolio from "@/models/portfolio";
    import {APIService} from "@/services/APIService";
    import Photo from "@/models/photo";
    const apiService = new APIService();
    export default {
        mounted() {
            this.id = this.$route.params.id
            this.getAlbumById(this.id)
            this.getImagesByPortfolioId();
            this.getSrcList();
        },
        components: {
            Menu
        },
        data() {
            return {
                srcList: '',
                image: new Image('', ''),
                photo: new Photo(''),
                portfolioEdit: new Portfolio('', '', '', ''),
                id: 0,
                portfolio: [],
                images: [],
                message: '',
                user: [],
                fileToDelete: [],
                dialogTableVisible: false,
                dialogFormVisible: false,
                dialogEditFormVisible: false,
                checkList: ['selected and disabled','Option A'],
                form: {
                    name: '',
                    description: '',
                },
                rules: {
                    name: [
                        {required: true, message: 'Podaj nazwę', trigger: 'change'},
                        { min: 3, message: 'Nazwa musi być dłuższa niż 3 litery', trigger: 'blur' }
                    ],
                    description: [
                        {required: true, message: 'Podaj opis albumu', trigger: 'change'},
                    ]
                },
                fileList: []
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
        },
        methods: {
            getAlbumById(id) {
                apiService.getPortfolioById(id).then(
                    data => {
                        this.portfolio = data;
                        this.form.name = this.portfolio.name;
                        this.form.description = this.portfolio.description;
                    },
                    error => {
                        this.message = error.message;
                    }
                );
            },
            getImagesByPortfolioId() {
                apiService.getImagesByPortfolioId(this.id).then((data) => {
                    this.images = data;

                });
            },
            getSrcList() {
                this.images.forEach(function(entry) {
                    this.srcList.push(entry.fileUrl)
                });
            },
            beforeRemove(file, fileList) {
                this.$confirm(`Czy na pewno anulować przesyłanie pliku ${ file.name } ?`);
            },
            handleRemove(file, fileList) {
                apiService.deleteImageByUrl(file.name).then(
                    data => {
                        this.message = data;
                    },
                    error => {
                        this.message = error.message;
                    }
                );
            },
            handlePreview(file) {
                this.fileList.push(file);
            },
            addImage(response, file, fileList){
                this.image.portfolioId = this.portfolio.id;
                this.image.fileUrl = response;
                this.image.name = file.name;
                apiService.addImage(this.image).then(
                    data => {
                        this.image = data;
                    },
                    error => {
                        this.message = error.message;
                    }
                );
            },
            addImages(){
                location.reload();
            },
            editPortfolio(ruleForm){
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        this.portfolioEdit.username = this.currentUser.username;
                        this.portfolioEdit.name = this.form.name;
                        this.portfolioEdit.description = this.form.description;
                        apiService.editPortfolio(this.id, this.portfolioEdit).then(
                            data => {
                                this.portfolio = data;
                                this.dialogEditFormVisible = false
                                location.reload();
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
            setMainProfilePhotoUrl(url, name){
                this.image.portfolioId = this.id;
                this.image.fileUrl = url;
                this.image.name = name;
                apiService.setMainProfilePhotoUrl(this.currentUser.username, this.image).then(
                    data => {
                        this.user = data;
                        location.reload();
                    },
                    error => {
                        this.message = error.message;
                    }
                );
            },
            setMainPortfolioPhotoUrl(url){
                this.portfolioEdit.username = this.currentUser.username;
                this.portfolioEdit.name = this.form.name;
                this.portfolioEdit.description = this.form.description;
                this.portfolioEdit.mainPhotoUrl = url;
                apiService.setMainPortfolioPhotoUrl(this.id, this.portfolioEdit).then(
                    data => {
                        this.portfolio = data;
                        location.reload();
                    },
                    error => {
                        this.message = error.message;
                    }
                );
            },
            ifMainPortfolioPhoto(fileUrl){
                if(this.portfolio.mainPhotoUrl == fileUrl) return false;
                else return true
            },
            ifMainProfilePhoto(fileUrl){
                if(this.portfolio.user.mainPhotoUrl == fileUrl) return false;
                else return true
            },
            deletePhoto(id){
                apiService.deleteImageFromDatabase(id).then(
                    data => {
                        this.message = data;
                        location.reload();
                    },
                    error => {
                        this.message = error.message;
                    }
                );
            },
            getDate(date){
                return date.slice(0,10)
            },
        }
    }
</script>

<style scoped>
    .portfolio{
        text-align: left;
    }

</style>
