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
                                    placeholder="Wybierz dzień"
                                    value-format="yyyy-MM-dd">
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
            <el-row>
            </el-row>
            <el-row :gutter="20" v-for="portfolio in portfolios" :key="portfolio.portfolios"
                    v-if="(!form.occupation || portfolio.user.role == form.occupation) &&
            (!form.title || portfolio.name == form.title) &&
            (!form.addedDate || getDate(portfolio.addedDate) == form.addedDate)">
                <el-card>
                    <el-col :span="6">
                        <el-image
                                style="width: 200px; height: 200px"
                                :src="portfolio.mainPhotoUrl"
                                :fit="'contain'">
                        </el-image>
                        <el-row style="margin-top: 0px">
                            <el-link @click="$router.push({ path: `/portfolios/${portfolio.id}` })" type="info">
                                Zobacz album
                                <i class="el-icon-view el-icon--right"></i> </el-link>
                        </el-row>
                    </el-col>
                    <el-col :span="12"><div class="portfolio">
                        <el-row class="portfolio" style="margin-top: 20px">
                            <h3 style="display: inline;">Nazwa portfolio: </h3> {{portfolio.name}}
                        </el-row>
                        <el-row class="portfolio" style="margin-top: 40px">
                            <h3 style="display: inline">Nazwa użytkownika: </h3> {{portfolio.user.username}}
                        </el-row>
                        <el-row class="portfolio" style="margin-top: 40px">
                            <h3 style="display: inline">Data dodania: </h3> {{getDate(portfolio.addedDate)}}
                        </el-row>
                    </div></el-col>
                    <el-col :span="6"><div>
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
    import {APIService} from '../../services/APIService';
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
            },
            getDate(date){
                return date.slice(0,10)
            },
        }
    }
</script>

<style scoped>
.el-link{
    color: black;
}

    .portfolio{
        text-align: left;
    }

</style>
