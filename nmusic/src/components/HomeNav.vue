<template>
  <div class="homenav">
    <div v-if="$route.meta.isShowNav" id="nav">
      <router-link to="/">推荐音乐</router-link>
      <router-link to="/Hot">热歌榜</router-link>
      <router-link to="/Search">搜索</router-link>
    </div>

    <keep-alive>
      <router-view :cid='cid' class="rouview" @changdiurl="changdiurl" />
    </keep-alive>

    <PlayCom
      class="PlayCom"
      :songlist="songlist"
      :index="index"
      @changdiurl="changdiurl"
      @changecid="changecid"
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
      index: "",
      cid:''
    };
  },
  methods: {
    changecid(id){
      this.cid=id
    },
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
  overflow: hidden;
  color: #2c3e50;
  .rouview {
    padding-top: 50px;
  }
  #nav {
    z-index: 9;
    position: fixed;
    width: 100%;
    padding: 0px;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #eee;
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
