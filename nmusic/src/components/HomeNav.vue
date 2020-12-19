<template>
  <div class="homenav">
    <div v-if="$route.meta.isShowNav" id="nav">
      <router-link to="/">推荐音乐</router-link>
      <router-link to="/Hot">热歌榜</router-link>
      <router-link to="/Search">搜索</router-link>
    </div>
    <div style="height: 50px"></div>

<keep-alive>

    <router-view @changdiurl="changdiurl" />

</keep-alive>

    <PlayCom class="PlayCom" 
    :songlist='songlist'
    :index='index'
    
    ></PlayCom>
  </div>
</template>

<script>
import PlayCom from "../components/PlayCom";

export default {
  components: { PlayCom },
  data: function () {
    return {
      mp3datail: {},
      songlist: [],
      index: ''
    };
  },
  methods: {
    changdiurl(target, index, songlist) {
      this.mp3datail = target;
      this.index = index;
      this.songlist = songlist;
    },
  },
  // name: "HomeNav",
  // created() {
  //  this.axios.get('personalized').then(function(res){
  //    console.log(res.data.result);
  //  })
  // },
};
</script>

<style lang="scss" scoped>
.homenav {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  #nav {
    z-index: 9;
    position: fixed;
    width: 100%;
    padding: 0px;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    border: 1px #eee solid;
  }

  #nav a {
    color: #000;
    text-decoration: 0;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
  }

  #nav a.router-link-exact-active {
    color: #dd001b;
    border-bottom: 3px red solid;
  }
  .PlayCom {
    width: 100%;
    position: fixed;
    bottom: -5px;
  }
}
</style>
