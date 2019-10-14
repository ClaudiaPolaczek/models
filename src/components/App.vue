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
</style>
