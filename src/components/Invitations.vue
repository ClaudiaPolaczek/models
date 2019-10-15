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
                    <el-menu-item index="3-1" :route="{path:''}">
                        Fotograf
                    </el-menu-item>
                    <el-menu-item index="3-2" :route="{path:''}">
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
        <el-container>
            <el-aside width="230px">
                <el-menu
                        class="el-menu-vertical"
                        background-color="#4E565F"
                        text-color="#fff"
                        active-text-color="#fff"
                        style="text-align: left; min-height: 100vh"
                        :router="true">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-user"></i>
                            <span>Profil</span>
                        </template>
                        <el-menu-item index="1-1" @click="$router.push('/user')">Ustawienia profilu</el-menu-item>
                        <el-menu-item index="1-2" @click="$router.push('/portfolio/user')">Portfolio</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="2" :route="{path:'calendar'}">
                        <i class="el-icon-date"></i>
                        <span>Terminarz</span>
                    </el-menu-item>
                    <el-menu-item index="3" :route="{path:'invitations'}">
                        <i class="el-icon-message"></i>
                        <span>Zaproszenia</span>
                    </el-menu-item>
                    <el-menu-item index="4" :route="{path:'notifications'}">
                        <i class="el-icon-bell"></i>
                        <span>Powiadomienia</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
                        <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                        <el-breadcrumb-item>Konto</el-breadcrumb-item>
                        <el-breadcrumb-item>Zaproszenia</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-table
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column
                                fixed
                                prop="name"
                                label="Zaproszenie od"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="date"
                                label="Data sesji"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="duration"
                                label="Czas trwania"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="topic"
                                label="Temat sesji"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="city"
                                label="Miasto"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="Adres"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="Status"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="Operacje"
                                width="170">
                            <template slot-scope="scope">
                                <el-button @click="accept" type="text" size="small">Akceptuj</el-button>
                                <el-button @click="cancel" type="text" size="small">Odrzuć</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        methods: {
            accept() {
                console.log('click');
            },
            cancel() {
                console.log('click');
            }
        },
        data() {
            return {
                tableData: [{
                    date: '2020-05-03',
                    name: 'Jan Kowalski',
                    topic: 'Portret',
                    city: 'Gliwice',
                    address: 'ul. Zwycięstwa 1',
                    duration: '2',
                    status: 'Zaakceptowane'
                }, {
                    date: '2020-05-02',
                    name: 'Jan Kowalski',
                    topic: 'Portret',
                    city: 'Gliwice',
                    address: 'ul. Zwycięstwa 1',
                    duration: '2',
                    status: ''
                }, {
                    date: '2020-05-04',
                    name: 'Jan Kowalski',
                    topic: 'Portret',
                    city: 'Gliwice',
                    address: 'ul. Zwycięstwa 1',
                    duration: '2',
                    status: 'Odrzucone'
                }, {
                    date: '2020-05-01',
                    name: 'Jan Kowalski',
                    topic: 'Portret',
                    city: 'Gliwice',
                    address: 'ul. Zwycięstwa 1',
                    duration: '2',
                    status: 'Zaakceptowane'
                }]
            }
        }
    }
</script>

<style scoped>

</style>
