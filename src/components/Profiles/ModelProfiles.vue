<template>
    <el-container>
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
                                    :src="model.user.mainPhotoUrl"
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
    import {APIService} from '../../services/APIService';
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
                        value: 'piwne',
                        label: 'piwne'
                    }, {
                        value: 'zielone',
                        label: 'zielone'
                    }, {
                        value: 'inne',
                        label: 'inne'
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
                        value: 'siwe',
                        label: 'siwe'
                    }, {
                        value: 'inne',
                        label: 'inne'
                    }, {
                        value: '',
                        label: '-'
                    },],
                    ageOptions: [{
                        value: '20',
                        label: '< 20'
                    }, {
                        value: '2030',
                        label: '20 - 30'
                    }, {
                        value: '3040',
                        label: '30 - 40'
                    }, {
                        value: '4050',
                        label: '40 - 50'
                    }, {
                        value: '5060',
                        label: '50 - 60'
                    }, {
                        value: '60',
                        label: '> 60'
                    }, {
                        value: '',
                        label: '-'
                    },],
                },
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
        },
    }
</script>

<style scoped>

</style>
