<template>
  <div class="playlist">
    <h1 @click="fn">asdfasdf</h1>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      duoarr: [],
      duoarrid: [],
      str: "",
    };
  },
  methods: {
    fn() {
      this.duoarr.forEach((element) => {
        this.duoarrid.push(element.id);
      });
      console.log(this.duoarrid);
      this.str = this.duoarrid.join(",");
      console.log(this.str);
      this.$axios.get(`/song/detail?ids=${this.str}`).then((qqq) => {
          qqq
        console.log(qqq);
      });
    },
  },
  created() {
    // console.log(this.$route.query.id);
    this.$axios
      .get(`/playlist/detail?id=${this.$route.query.id}`)
      .then((res) => {
          console.log(res);
        // console.log(res.data.playlist);
        // console.log(res.data.playlist.trackIds);
        this.duoarr = res.data.playlist.trackIds;
        // console.log("标签", res.data.playlist.tags);
        // console.log("标题", res.data.playlist.name);
        // console.log("歌单作者名字", res.data.playlist.creator.nickname);
        // console.log("头像", res.data.playlist.creator.avatarUrl);
      });
  },
};
</script>

<style lang="scss" scoped>
.playlist {
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: #fff;
  
}
  .PlayCom {
    width: 100%;
    position: fixed;
    bottom: -5px;
  }
</style>