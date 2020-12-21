<template>
  <div class="playlist">
    <div class="toppic">

    </div>
    <MusicListItem
      @clickfn="clickfn"
      :curMusic_id="curMusic_id"
      :item="item"
      v-for="(item, index) in listArr"
      :idx="index"
      :key="item.id"
    >
    </MusicListItem>
  </div>
</template>

<script>
import MusicListItem from "../components/MusicListItem";

export default {
  components: { MusicListItem },
  data: function () {
    return {
      curMusic_id: "",
      listArr: [],
      duoarr: [],
      duoarrid: [],
      str: "",
    };
  },
  methods: {
    clickfn(target, index) {
      // console.log(target);
      this.curMusic_id = target.id;
      this.$emit("changdiurl", target, index, this.listArr);
    },
    //
  },
  created() {
    // console.log(this.$route.query.id);
    this.$axios
      .get(`/playlist/detail?id=${this.$route.query.id}`)
      .then((res) => {
        console.log(res);
        // console.log(res.data.playlist);
        // console.log(res.data.playlist.trackIds);
        this.duoarr = res.data.playlist.trackIds
          .map((item) => {
            return item.id;
          })
          .join(",");
      })
      .then(() => {
        console.log(this.duoarr);

        this.$axios.get(`/song/detail?ids=${this.duoarr}`).then((res) => {
          //
          this.listArr = res.data.songs;
          console.log(this.listArr);
        });
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
  margin-bottom: 60px;
}
.PlayCom {
  width: 100%;
  position: fixed;
  bottom: -5px;
}
</style>