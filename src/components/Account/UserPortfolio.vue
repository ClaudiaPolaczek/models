<template>
    <el-container>
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
                            <font-awesome-icon icon="user-cog" size=" fa-lg" style="margin-right: 10px"/>
                            <span>Profil</span>
                        </template>
                        <el-menu-item @click="$router.push('/user')">Dane osobowe</el-menu-item>
                        <el-menu-item @click="$router.push('/user/password')">Zmiana hasła</el-menu-item>
                        <el-menu-item @click="$router.push('/user/model')"
                                      v-if="showModelBoard">Dane modelki</el-menu-item>
                        <el-menu-item @click="$router.push('/user/portfolio')">Portfolio</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="2" @click="$router.push('/calendar')">
                        <font-awesome-icon icon="calendar-alt" size=" fa-lg" style="margin-right: 10px"/>
                        <span>Terminarz</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="$router.push('/invitations')">
                        <font-awesome-icon icon="envelope" size=" fa-lg" style="margin-right: 10px"/>
                        <span>Sesje zdjęciowe</span>
                    </el-menu-item>
                    <el-menu-item index="4" @click="$router.push('/notifications')">
                        <font-awesome-icon icon="bell" size=" fa-lg" style="margin-right: 10px"/>
                        <span>Powiadomienia</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container" style="margin-bottom: 50px">
                        <el-breadcrumb-item :to="{ path: '/' }">Start</el-breadcrumb-item>
                        <el-breadcrumb-item>Konto</el-breadcrumb-item>
                        <el-breadcrumb-item>Portfolio</el-breadcrumb-item>
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
                            <span class="demonstration">Nazwa portfolio</span>
                        </div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple-light">
                            <el-row>
                                <el-button type="primary" @click="$router.push('/portfolio/id')">Edytuj</el-button>
                            </el-row>
                            <el-row>
                                <el-button type="primary" @click="onDelete">Usuń</el-button>
                            </el-row>
                        </div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                    </el-row>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
        },
         methods: {
             onDelete() {
                 return false;
             }
        },
        computed: {
            showModelBoard() {
                if (this.currentUser) {
                    return this.currentUser.role.includes('MODEL');
                }
                return false;
            },
        },
    }
</script>

<style scoped>

</style>
