<template>
    <el-container>
        <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
                <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                <el-breadcrumb-item>Portfolio</el-breadcrumb-item>
            </el-breadcrumb>
            <el-row>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="Tytuł">
                                <el-input v-model="form.addedDate"></el-input>
                        </el-form-item>
                    </el-form>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="Data dodania">
                            <el-date-picker
                                    v-model="form.addedDate"
                                    type="date"
                                    placeholder="Pick a day">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                </div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <el-form ref="form" :model="form" label-width="100px">
                        <el-form-item label="Profesja">
                            <el-select v-model="form.occupation" placeholder="Wybierz">
                                <el-option
                                        v-for="item in form.occupationOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div></el-col>
            </el-row>
            <el-row :gutter="20" v-for="portfolio in portfolios" :key="portfolio.portfolios"
                    v-if="(!form.occupation || portfolio.user.role == form.occupation) &&
            (!form.title || portfolio.name == form.title) &&
            (!form.addedDate || portfolio.addedDate == form.addedDate)">
                <el-card>
                    <el-row>
                        Nazwa: {{portfolio.name}}
                    </el-row>
                    <el-row>
                        Data dodania: {{portfolio.addedDate}}
                    </el-row>
                    <el-carousel trigger="click" height="300px">
                    <el-carousel-item v-for="item in 4" :key="item">
                        <h3 class="small">{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>
                <el-col :span="4"><div class="grid-content bg-purple" >
                    <el-row>
                        {{portfolio.description}}
                    </el-row>
                </div></el-col>
                </el-card>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import {APIService} from '../services/APIService';
    const apiService = new APIService();

    export default {
        mounted() {
            this.username = this.$route.params.username
            this.getPortfolios()
        },
        data() {
            return {
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                portfolios: [],
                form: {
                    title: '',
                    addedDate: '',
                    occupation: '',
                    age: '',
                    occupationOptions: [{
                        value: 'MODEL',
                        label: 'Model/Modelka'
                    }, {
                        value: 'PHOTOGRAPHER',
                        label: 'Fotograf'
                    }, {
                        value: '',
                        label: '-'
                    },],
                },
            };
        },
        methods: {
            getPortfolios() {
                apiService.getPortfolios().then((data) => {
                    this.portfolios = data;
                });
            }
        }
    }
</script>

<style scoped>

</style>
