<template>
    <el-container>
        <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                <el-breadcrumb-item>Portfolio</el-breadcrumb-item>
            </el-breadcrumb>
            <el-row>
                <el-col :span="6"><div>
                    <el-form ref="form" :model="form" label-width="120px" style="margin-right: 12px">
                        <el-form-item label="Tytuł">
                                <el-input v-model="form.title"></el-input>
                        </el-form-item>
                    </el-form>
                </div></el-col>
                <el-col :span="6"><div >
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
                <el-col :span="6"><div>
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
                    <el-col :span="6"><div class="grid-content bg-purple">
                        <el-image
                                style="width: 200px; height: 200px"
                                :src="portfolio.mainPhotoUrl"
                                :fit="'fill'">
                        </el-image>
                        <el-row style="margin-top: 0px">
                            <el-button
                                    type="text"
                                    class="button"
                                    @click="$router.push({ path: `/portfolios/${portfolio.id}` })">
                            Zobacz portfolio
                            </el-button>
                        </el-row>
                    </div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple">
                        <el-row>
                            Nazwa: {{portfolio.name}}
                        </el-row>
                        <el-row>
                            Data dodania: {{portfolio.addedDate}}
                        </el-row>
                    </div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple">
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
