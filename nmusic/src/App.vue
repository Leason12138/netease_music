<template>
  <div id="app">
    <HomeNav></HomeNav>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/Hot">Hot</router-link>
    </div>
    <router-view/> -->
  
  </div>
</template>
<script>
import HomeNav from "./components/HomeNav.vue";

export default {
  components: {
    HomeNav,
  },
  created() {},
};
</script>
<style lang="scss" scoped>
#app {
  width: 100%;
  padding: 0;
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .musicplayer {
    width: 100%;
    position: fixed;
    bottom: 0;
  }
}
</style>
