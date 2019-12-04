<template>
    <el-container>
        <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                <el-breadcrumb-item>Profile</el-breadcrumb-item>
            </el-breadcrumb>
            <el-row>
                <el-col :span="5"><div>
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
                <el-col :span="5"><div>
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="Miasto" >
                            <el-input v-model="form.city" placeholder="Dowolne"></el-input>
                        </el-form-item>
                    </el-form>
                </div></el-col>
                <el-col :span="5"><div>
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
                <el-col :span="5"><div>
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="Wiek">
                            <el-select v-model="form.age">
                                <el-option
                                        v-for="item in form.ageOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div></el-col>
            </el-row>
            <el-row :gutter="20"  v-for="photographer in photographers" :key="photographer.photographers"
            v-if="(!form.gender || photographer.survey.gender == form.gender) &&
            (!form.city || photographer.survey.city == form.city) &&
            (!form.region || photographer.survey.region == form.region) &&
            (!form.age || photographer.survey.age == form.age)">
                <el-card>
                    <el-col :span="6" style="margin-bottom: 20px"><div class="grid-content bg-purple">
                    <div class="image">
                        <span class="demonstration"></span>
                            <el-image
                                style="width: 200px; height: 200px"
                                :src="photographer.user.mainPhotoUrl"
                                :fit="'fill'">
                            </el-image>
                        </div>
                        {{photographer.user.username}}
                    </div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple">
                        <el-row style="margin-top: 0px" class="profile">
                            <h3 style="margin-top: 0px"> Informacje o profilu: </h3>
                            {{photographer.survey.firstName}} {{photographer.survey.lastName}}
                        </el-row>
                        <el-row class="profile">
                            {{photographer.survey.city}} ({{photographer.survey.region}})
                        </el-row>
                        <el-row class="profile">
                            {{getGender(photographer.survey.gender)}}
                        </el-row>
                        <el-row class="profile">
                            Wiek - {{photographer.survey.age}}
                        </el-row>
                    </div></el-col>
                    <el-col :span="6">
                        <el-button type="primary" @click="$router.push({ path: `/photographers/${photographer.id}` })">Zobacz profil</el-button>
                    </el-col>
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
            this.getPhotographers();
        },
        name: 'PhotographerProfiles',
        components: {
        },
        data() {
            return {
                photographers: [],
                form: {
                    city: '',
                    region: '',
                    gender: '',
                    age: '',
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
                }
            }
        },
        methods: {
            getPhotographers(){
                apiService.getPhotographers().then((data) => {
                    this.photographers = data;
                });
            },
            getGender(gender){
                if(gender=='W') return "Kobieta"
                else if (gender=='M') return "Mężczyzna"
            },
        }
    }
</script>

<style scoped>
    .image{
        margin-bottom: 15px;
    }
    .profile{
        margin-top: 10px;
        text-align: left;
    }

    .el-button{
        border-color: #213159;
        background-color: #213159;
        margin-top: 150px;
    }
</style>
