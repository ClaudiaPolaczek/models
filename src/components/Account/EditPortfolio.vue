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
                                        :src="url"
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
                                <el-button type="primary" @click="editPortfolio">Edytuj dane</el-button>
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
                                <div class="demo-image__preview">
                                    <el-image
                                            style="width: 100px; height: 100px"
                                            :src="url"
                                            :preview-src-list="srcList">
                                    </el-image>
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
    import {APIService} from "@/services/APIService";
    const apiService = new APIService();
    export default {
        mounted() {
            this.id = this.$route.params.id
            this.getAlbumById(this.id)
        },
        components: {
            Menu
        },
        data() {
            return {
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                srcList: [
                    'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                    'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
                ],
                image: new Image('', ''),
                id: 0,
                portfolio: [],
                images: [],
                message: '',
                fileToDelete: [],
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    stars: '',
                    content: '',
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
                    },
                    error => {
                        this.message = error.message;
                    }
                );
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
            }
        }
    }
</script>

<style scoped>

</style>
