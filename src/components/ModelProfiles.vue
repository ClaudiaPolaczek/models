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
                    <el-menu-item index="3-1" @click="$router.push('/photographers')">
                        Fotograf
                    </el-menu-item>
                    <el-menu-item index="3-2" @click="$router.push('/models')">
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
                <el-menu-item index="5" style="float: right;" :route="{path:'login'}">
                    <span style="padding: 7em 2em">Logowanie</span>
                </el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
                <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                <el-breadcrumb-item>Profile</el-breadcrumb-item>
            </el-breadcrumb>
            <el-row>
                <el-col :span="5"><div class="grid-content bg-purple">
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="Województwo">
                            <el-select v-model="form.region" placeholder="Wybierz">
                                <el-option
                                        v-for="item in form.options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple">
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="Miasto">
                            <el-input v-model="form.city"></el-input>
                        </el-form-item>
                    </el-form>
                </div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple">
                    <el-form ref="form" :model="form" label-width="100px">
                        <el-form-item label="Płeć">
                            <el-select v-model="form.gender" placeholder="Wybierz">
                                <el-option
                                        v-for="item in form.genderOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple">
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="Wiek">
                            <el-select v-model="form.age" placeholder="Wybierz">
                                <el-option
                                        v-for="n in 50"
                                        :key="n.id">
                                    {{n}}
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div></el-col>
            </el-row>
            <el-row>
                <el-col :span="5"><div class="grid-content bg-purple">
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="Kolor włosów">
                            <el-select v-model="form.hairColor" placeholder="Wybierz">
                                <el-option
                                        v-for="item in form.hairColors"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple">
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="Kolor oczu">
                            <el-select v-model="form.eyesColor" placeholder="Wybierz">
                                <el-option
                                        v-for="item in form.eyesColors"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div></el-col>
            </el-row>
            <el-row :gutter="20"  v-for="model in models" :key="model.models"
                    v-if="(!form.gender || model.survey.gender == form.gender) &&
            (!form.city || model.survey.city == form.city) &&
            (!form.region || model.survey.region == form.region) &&
            (!form.age || model.survey.age == form.age) &&
            (!form.hairColor || model.hairColor == form.hairColor) &&
            (!form.eyesColor || model.eyesColor == form.eyesColor)"
            >
                <el-card>
                    <el-col :span="6" style="margin-bottom: 20px"><div class="grid-content bg-purple">
                        <div class="demo-image" style="margin-bottom: 15px">
                            <span class="demonstration"></span>
                            <el-image
                                    style="width: 200px; height: 200px"
                                    :src="url"
                                    :fit="'fill'">
                            </el-image>
                        </div>
                        {{model.user.username}}
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple">
                        <el-row>
                            {{model.survey.firstName}} {{model.survey.lastName}}
                        </el-row>
                        <el-row>
                            {{model.survey.city}}, {{model.survey.region}}
                        </el-row>
                        <el-row>
                            {{getGender(model.survey.gender)}}
                        </el-row>
                        <el-row>
                            {{model.survey.age}}
                        </el-row>
                    </div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple" style="margin-top: 20px">
                        <el-button type="primary" @click="$router.push({ path: `/models/${model.id}` })">Zobacz profil</el-button>
                    </div></el-col>
                </el-card>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import {APIService} from '../APIService';
    const API_URL = 'http://localhost:8080';
    const apiService = new APIService();
    export default {
        mounted() {
            this.getModels();
        },
        name: 'ModelProfiles',
        components: {
        },
        data() {
            return {
                models: [],
                form: {
                    city: '',
                    region: '',
                    gender: '',
                    age: '',
                    hairColor: '',
                    eyesColor: '',
                    options: [{
                        value: '',
                        label: '-'
                    }, {
                        value: 'dolnoslaskie',
                        label: 'dolnośląskie'
                    }, {
                        value: 'kujawsko-pomorskie',
                        label: 'kujawsko-pomorskie'
                    }, {
                        value: 'lubelskie',
                        label: 'lubelskie'
                    }, {
                        value: 'lubuskie',
                        label: 'lubuskie'
                    }, {
                        value: 'łódzkie',
                        label: 'łódzkie'
                    }, {
                        value: 'małopolskie',
                        label: 'małopolskie'
                    }, {
                        value: 'mazowieckie',
                        label: 'mazowieckie'
                    }, {
                        value: 'opolskie',
                        label: 'opolskie'
                    }, {
                        value: 'podkarpackie',
                        label: 'podkarpackie'
                    }, {
                        value: 'podlaskie',
                        label: 'podlaskie'
                    }, {
                        value: 'pomorskie',
                        label: 'pomorskie'
                    }, {
                        value: 'śląskie',
                        label: 'śląskie'
                    }, {
                        value: 'świętokrzyskie',
                        label: 'świętokrzyskie'
                    }, {
                        value: 'warmińsko-mazurskie',
                        label: 'warmińsko-mazurskie'
                    }, {
                        value: 'wielkopolskie',
                        label: 'wielkopolskie'
                    }, {
                        value: 'zachodniopomorskie',
                        label: 'zachodniopomorskie'
                    }],
                    genderOptions: [{
                        value: 'W',
                        label: 'kobieta'
                    }, {
                        value: 'M',
                        label: 'mężczyzna'
                    }, {
                        value: '',
                        label: '-'
                    },],
                    eyesColors: [{
                        value: 'niebieskie',
                        label: 'niebieskie'
                    }, {
                        value: 'brązowe',
                        label: 'brązowe'
                    }, {
                        value: 'szare',
                        label: 'szare'
                    }, {
                        value: '',
                        label: '-'
                    },],
                    hairColors: [{
                        value: 'brązowe',
                        label: 'brązowe'
                    }, {
                        value: 'blond',
                        label: 'blond'
                    }, {
                        value: 'czarne',
                        label: 'czarne'
                    }, {
                        value: 'rude',
                        label: 'rude'
                    }, {
                        value: '',
                        label: '-'
                    },],
                },
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
        },
        methods: {
            getModels(){
                apiService.getModels().then((data) => {
                    this.models = data;
                });
            },
            getGender(gender){
                if(gender=='W') return "kobieta"
                else if (gender=='M') return "mężczyzna"
            },
            accept() {
                console.log('click');
            },
            cancel() {
                console.log('click');
            }
        },
    }
</script>

<style scoped>

</style>
