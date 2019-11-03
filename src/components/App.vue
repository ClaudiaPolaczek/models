<template>
  <div id="app">
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
          <font-awesome-icon icon="home" size=" fa-lg" style="margin-right: 10px"/> Start
        </el-menu-item>
        <el-menu-item index="2" @click="$router.push('/portfolios')">
           Portfolio
        </el-menu-item>
<!--        <el-submenu index="2" @click="$router.push('/portfolios')">-->
<!--          <template slot="title" @click="$router.push('/portfolios')">-->
<!--            Portfolio-->
<!--          </template>-->
<!--          <el-menu-item index="2-1" @click="$router.push('/portfolios/photo')">Fotograf</el-menu-item>-->
<!--          <el-menu-item index="2-2" @click="$router.push('/portfolios/models')" >Model/Modelka</el-menu-item>-->
<!--        </el-submenu>-->
        <el-submenu index="3">
          <template slot="title">Profile</template>
          <el-menu-item index="3-1" @click="$router.push('/photographers')">
            Fotograf
          </el-menu-item>
          <el-menu-item index="3-2" @click="$router.push('/models')">
            Model/Modelka
          </el-menu-item>
        </el-submenu>

        <el-submenu index="4" v-if="showAdminBoard">
          <template slot="title">Panel administratora</template>
          <el-menu-item index="4-1" @click="$router.push('/admin/comments')">
            Komentarze
          </el-menu-item>
          <el-menu-item index="4-2" @click="$router.push('/admin/users')">
            Użytkownicy
          </el-menu-item>
        </el-submenu>

        <div v-if="!currentUser">
          <el-menu-item index="6" style="float: right;" @click="$router.push('/login')">
            <span style="padding: 7em 2em">Logowanie / Rejestracja</span>
          </el-menu-item>
        </div>

        <div v-if="currentUser">
          <el-submenu index="5" style="float: right;">
            <template slot="title">
              <font-awesome-icon icon="user-circle" size=" fa-2x" style="margin-right: 10px"/>
              {{currentUser.username}}
            </template>
            <el-menu-item v-if="!showAdminBoard" index="4-1" :route="{path:'account'}">
              <font-awesome-icon icon="user" size=" fa-lg" style="margin-right: 10px"/>
              <el-badge :value="numberOfNotifications" class="item">
                Konto
              </el-badge>
            </el-menu-item>
            <el-menu-item index="4-2" @click="logOut">
              <font-awesome-icon icon="sign-out-alt" size=" fa-lg" style="margin-right: 10px"/>
              Wyloguj
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </el-header>
    <router-view/>
  </el-container>
  </div>
</template>

<script>
//import WelcomePage from "@/components/WelcomePage";
import AccountSettings from "@/components/Account/AccountSettings";
export default {
  name: "App",
  components: {
    AccountSettings
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser) {
        return this.currentUser.role.includes('ADMIN');
      }
      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    }
  }
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
