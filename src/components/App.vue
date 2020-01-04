<template>
  <div id="app">
  <el-container>
    <el-header>
      <el-menu
              mode="horizontal"
              :router="true">
        <el-menu-item index="1" :route="{path:'/'}">
          <font-awesome-icon icon="home" size=" fa-lg" style="margin-right: 10px"/> Start
        </el-menu-item>
        <el-menu-item index="2" @click="$router.push('/portfolios')">
           Portfolia
        </el-menu-item>
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
          <el-submenu index="5" >
            <template slot="title" >
              <font-awesome-icon icon="user-circle" size=" fa-2x" style="margin-right: 10px"/>
              {{currentUser.username}}
            </template>
            <el-menu-item v-if="!showAdminBoard" index="4-1" @click="$router.push('/account')" style="margin-top: 5px">
              <font-awesome-icon icon="user" size=" fa-lg" style="margin-right: 10px"/>
                Konto
              <el-badge v-if="ifNotificationsNumberNull" :value="length" class="item" :max="10">
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
    import {APIService} from "@/services/APIService";
    const apiService = new APIService();
export default {
  name: "App",
  components: {
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
      ifNotificationsNumberNull() {
          if(this.length == 0) return false;
          else return true;
      }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
      getNotifications(username) {
          apiService.getNonReadNotificationsByUser(username).then((data) => {
              this.notifications = data;
              this.length = this.notifications.length;
          });
      },
  },
    data() {
        return {
            notifications: [],
            length: 0,
        }
    },
  mounted() {
    this.getNotifications(this.currentUser.username)
  },
};
</script>

<style>
  #app {
      font-family: Georgia, serif;
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      letter-spacing: 0.1em;
      line-height: 22px;
      text-transform: none;
      color: black;
      text-align: center;
  }

  .el-header{
      color: #ebd9c8;
      background-color: #ebd9c8;
  }

  .el-menu {
      color: black;
      background-color: #ebd9c8 ;
  }

  .el-menu-item{
      color: black;
      font-size: 20px;
  }

  .el-menu-item.is-active {
    color: black;
  }

  .el-submenu{
      float: right;
      background-color: #ebd9c8 ;
  }

  .el-submenu__icon-arrow {
      display: none;
  }

  .el-menu.el-menu--horizontal {
      border-bottom: none;
  }

  .el-menu--horizontal>.el-menu-item.is-active {
      border-bottom: 2px solid black;
      color: black;
  }

  .el-menu--horizontal>.el-menu-item {
      float: left;
      height: 60px;
      line-height: 60px;
      margin: 0;
      border-bottom: 2px solid transparent;
      color: black;
  }

  .el-menu--horizontal>.el-submenu .el-submenu__title {
      height: 60px;
      line-height: 60px;
      border-bottom: 2px solid transparent;
      color: black;
  }

  .el-submenu__title {
      font-size: 21px;
      color: black;
      padding: 0 20px;
      cursor: pointer;
      -webkit-transition: border-color .3s,background-color .3s,color .3s;
      transition: border-color .3s,background-color .3s,color .3s;
    -webkit-box-sizing: border-box;
      box-sizing: border-box;
  }

  .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
      border-bottom: 2px solid black;
      color: black;
  }

  .el-menu--horizontal .el-menu .el-menu-item, .el-menu--horizontal .el-menu .el-submenu__title {
      background-color: #ebd9c8;
      font-size: 17px;
      height: 36px;
      font-family: Georgia, serif;
      font-style: normal;
      font-weight: 500;
      letter-spacing: 0.1em;
      color: black;
      margin-bottom: 10px;
  }

  .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
    background-color: #ebd9c8;
  }

  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    outline: 0;
    background-color: #ebd9c8;
    color: black;
  }

  .item {
      margin-top: 0px;
      margin-right: 10px;
      margin-bottom: 20px;
  }

  .el-submenu__title:hover {
    background-color: #ebd9c8;
  }

  .el-button{
    color: #FFF;
    border-color: #213159;
    background-color: #213159;
  }

  .el-button--primary {
    color: #FFF;
    background-color: #213159;
    border-color: #213159;
  }

  .el-button--primary:focus, .el-button--primary:hover {
    background: #4466BA;
    border-color: #4466BA;
    color: #FFF;
  }
</style>
