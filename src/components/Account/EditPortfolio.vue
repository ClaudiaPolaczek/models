<template>
    <el-container>
        <el-container>
            <el-aside width="230px">
                <Menu/>
            </el-aside>
            <el-container>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container" style="margin-bottom: 50px">
                        <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                        <el-breadcrumb-item>Konto</el-breadcrumb-item>
                        <el-breadcrumb-item>Portfolio</el-breadcrumb-item>
                        <el-breadcrumb-item>Nazwa</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-row>
                        <el-col :span="6"><div class="grid-content bg-purple">
                            <div class="demo-image" style="margin-bottom: 15px">
                                <span class="demonstration"></span>
                                <el-image
                                        style="width: 200px; height: 200px"
                                        :src="portfolio.mainPhotoUrl"
                                        :fit="'fill'">
                                </el-image>

                            </div>
                            <span class="demonstration">{{portfolio.name}}</span>
                        </div></el-col>
                        <el-col :span="8">
                            <el-row>
                                Data dodania: {{portfolio.addedDate}}
                            </el-row>
                            <el-row>
                                Opis : {{portfolio.description}}
                            </el-row>
                            <el-row>
                                <el-button type="primary" @click="dialogEditFormVisible = true">Edytuj dane</el-button>

                            <el-dialog title="Edycja albumu" :visible.sync="dialogEditFormVisible">
                                <el-form :model="form">
                                    <el-form-item label="Ocena" :label-width="formLabelWidth">
                                        <el-input v-model="form.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="Treść">
                                        <el-input type="textarea" v-model="form.description"></el-input>
                                    </el-form-item>
                                </el-form>
                                <span slot="footer" class="dialog-footer">
                                            <el-button @click="dialogEditFormVisible = false">Anuluj</el-button>
                                            <el-button type="success" @click="editPortfolio">Edytuj</el-button>
                                </span>
                            </el-dialog>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="margin-top: 30px; text-align: left; margin-left: 50px">
                        <el-collapse accordion v-model="activeNames" @change="handleChange">
                            <el-collapse-item name="Zdjęcia">
                                <template slot="title">
                                    Zdjęcia
                                    <el-button style="margin-left: 30px" @click="dialogFormVisible = true">
                                        Dodaj zdjęcia
                                    </el-button>
                                    <el-dialog title="Nowe zdjęcia" :visible.sync="dialogFormVisible">
                                        <el-upload
                                                class="upload-demo"
                                                action="http://localhost:8080/images/uploadFile"
                                                :on-preview="handlePreview"
                                                :on-success="addImage"
                                                :on-remove="handleRemove"
                                                :before-remove="beforeRemove"
                                                :file-list="fileList"
                                                list-type="picture">
                                            <el-button size="small" type="primary">Click to upload</el-button>
                                            <div slot="tip" class="el-upload__tip">Pliki do 10MB</div>
                                        </el-upload>
                                        <span slot="footer" class="dialog-footer">
                                            <el-button @click="dialogFormVisible = false">Anuluj</el-button>
                                            <el-button type="success" @click="addImages">Dodaj</el-button>
                                        </span>
                                    </el-dialog>
                                </template>
                                <div class="demo-image__preview" v-for="image in images" :key="image.images">
                                    <el-row>
                                    <el-col :span="6">
                                    <el-image
                                            style="width: 100px; height: 100px"
                                            :src="image.fileUrl"
                                            :preview-src-list="srcList">
                                    </el-image>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-button @click="setMainProfilePhotoUrl(image.fileUrl)">Ustaw jako profilowe</el-button>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-button @click="setMainPortfolioPhotoUrl(image.fileUrl)">Ustaw jako zdjęcie główne albumu</el-button>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-button @click="deletePhoto(image.id, image.fileUrl)">Usuń zdjęcie</el-button>
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
        },
        components: {
            Menu
        },
        data() {
            return {
                srcList: [],
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
                fileList: [],
                formLabelWidth: '120px'
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
                    this.srcList.push(this.images.fileUrl)
                });
            },
            handleRemove(file, fileList) {
                apiService.deleteImage(file.url).then(
                    data => {
                        this.portfolio = data;
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
                file.url = response;
                this.image.fileUrl = response;
                apiService.addImage(this.image).then(
                    data => {
                        this.image = data;
                    },
                    error => {
                        this.message = error.message;
                    }
                );
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`Cancel the transfert of ${ file.name } ?`);
            },
            editPortfolio(){
                this.portfolioEdit.username = this.currentUser.username;
                this.portfolioEdit.name = this.form.name;
                this.portfolioEdit.description = this.form.description;
                apiService.editPortfolio(this.id, this.portfolioEdit).then(
                    data => {
                        this.portfolio = data;
                        this.dialogEditFormVisible = false
                    },
                    error => {
                        this.message = error.message;
                    }
                );
            },
            setMainProfilePhotoUrl(url){
                this.image.portfolioId = this.id;
                this.image.fileUrl = url;
                apiService.setMainProfilePhotoUrl(this.currentUser.username, this.image).then(
                    data => {
                        this.user = data;
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
                    },
                    error => {
                        this.message = error.message;
                    }
                );
            },
            deletePhoto(id, fileUrl){
                // apiService.deleteImage(fileUrl).then(
                //     data => {
                //         this.message = data;
                //     },
                //     error => {
                //         this.message = error.message;
                //     }
                // );
                apiService.deleteImageFromDatabase(id).then(
                    data => {
                        this.message = data;
                    },
                    error => {
                        this.message = error.message;
                    }
                );
            }
        }
    }
</script>

<style scoped>

</style>
