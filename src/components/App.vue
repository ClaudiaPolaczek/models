<template>
  <router-view></router-view>
</template>

<script>
//import WelcomePage from "@/components/WelcomePage";
import AccountSettings from "@/components/AccountSettings";
export default {
  name: "App",
  components: {
    AccountSettings
  }
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
