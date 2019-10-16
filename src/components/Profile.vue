<template>
    <el-container>
        <el-header>
            <el-menu
                    :default-active="activeIndex"
                    class="el-menu"
                    mode="horizontal"
                    background-color="#B3C0D1"
                    text-color="#333"
                    active-text-color="#333"
                    :router="true">
                <el-menu-item index="1" :route="{path:'/'}">
                    Start
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">Portfolio</template>
                    <el-menu-item index="2-1" :route="{path:''}">Fotograf</el-menu-item>
                    <el-menu-item index="2-2" :route="{path:''}" >Model/Modelka</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">Profile</template>
                    <el-menu-item index="3-1" @click="$router.push('/users')">
                        Fotograf
                    </el-menu-item>
                    <el-menu-item index="3-2" @click="$router.push('/users')">
                        Model/Modelka
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="4" style="float: right;">
                    <template slot="title"><i class="el-icon-setting"></i></template>
                    <el-menu-item index="4-1" :route="{path:'user'}"><i class="el-icon-user"></i>
                        <el-badge :value="numberOfNotifications" class="item">
                            Konto
                        </el-badge>
                    </el-menu-item>
                    <el-menu-item index="4-2"><i class="el-icon-circle-close"></i>
                        Wyloguj
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="5" style="float: right;" @click="$router.push('/login')">
                    <span style="padding: 7em 2em">Logowanie</span>
                </el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
                <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                <el-breadcrumb-item>Profile</el-breadcrumb-item>
                <el-breadcrumb-item>Login</el-breadcrumb-item>
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
                </div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple">
                    <el-row>
                        Imię i Nazwisko
                    </el-row>
                    <el-row>
                        Miasto, Województwo
                    </el-row>
                    <el-row>
                        Płeć, Wiek
                    </el-row>
                    <el-row>
                        Profesja
                    </el-row>
                </div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple" style="margin-top: 20px">
                    <el-button type="primary" @click="$router.push('/user/id')">Zobacz portfolio</el-button>
                    <el-button type="primary" @click="$router.push('/photoshoot')">Zaproś na sesję</el-button>
                </div></el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 30px; text-align: left; margin-left: 50px">
                    Komentarze
                    <el-button @click="dialogFormVisible = true">Dodaj komentarz</el-button>
                    <el-dialog title="Nowy komentarz" :visible.sync="dialogFormVisible">
                        <el-form :model="form">
                            <el-form-item label="Promotion name" :label-width="formLabelWidth">
                                <div class="block">
                                    <el-rate v-model="form.stars"></el-rate>
                                </div>
                            </el-form-item>
                            <el-form-item label="Treść">
                                <el-input type="textarea" v-model="form.content"></el-input>
                            </el-form-item>
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">Anuluj</el-button>
                            <el-button type="success" @click="dialogFormVisible = false">Dodaj</el-button>
                        </span>
                    </el-dialog>
            </el-row>
            <el-row style="margin-top: 30px; text-align: left; margin-left: 50px; margin-right: 50px">
                <el-table
                        :data="comments"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="Nick"
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
                                v-model="comments.stars"
                                disabled>
                        </el-rate>
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="Data"
                            width="180">
                    </el-table-column>
                </el-table>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                comments: [{
                    date: '2020-05-02',
                    name: 'Jan Kowalski',
                    content: 'Great work',
                    stars: 2.0
                }, {
                    date: '2020-05-02',
                    name: 'Jan Kowalski',
                    content: 'Great work',
                    stars: 2
                }, {
                    date: '2020-05-02',
                    name: 'Jan Kowalski',
                    content: 'Great work',
                    stars: 2
                }, {
                    date: '2020-05-02',
                    name: 'Jan Kowalski',
                    content: 'Great work',
                    stars: 2
                }],
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    stars: '',
                    content: '',
                },
                formLabelWidth: '120px'
            };
        }
    }
</script>

<style scoped>

</style>
