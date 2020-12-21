<template>
  <div class="Hot">
    <div class="hottopbarback">
      <div class="hottopbar"></div>
      <span class="updatadays">更新日期 ：{{ updateTime + "日" }}</span>
    </div>
    <MusicListItem
      @clickfn="clickfn"
      :curMusic_id="curMusic_id"
      class="newsong"
      :item="item"
      v-for="(item, index) in listArr"
      :idx="index"
      :key="item.id"
    >
    </MusicListItem>
  </div>
</template>

<script>
//   :curMusic_id="curMusic_id"
//       @clickfn="clickfn"
import MusicListItem from "@/components/MusicListItem";
export default {
  components: { MusicListItem },
  data: function () {
    return {
      beforeListStr: "",
      listArr: [],
      curMusic_id: "",
      updateTime: "",
    };
  },
  methods: {
    clickfn(target, index) {
      // console.log(target);
      this.curMusic_id = target.id;
      this.$emit("changdiurl", target, index, this.listArr);
    },
  },
  created() {
    this.axios.get("/top/list?idx=1").then((res) => {
      console.log(res);
      this.updateTime = new Date(res.data.playlist.updateTime)
        .toLocaleString()
        .slice(5, 10)
        .replace("/", "月");
      this.beforeListStr = res.data.playlist.trackIds
        .map((item) => {
          return item.id;
        })
        .join(",");

      this.$axios.get(`/song/detail?ids=${this.beforeListStr}`).then((res) => {
        //
        this.listArr = res.data.songs;
        // console.log(
        //   this.listArr.map((i) => {
        //     return i.al.name
        //   })
        // );

        //
      });

      //
    });
  },
};
</script>

<style lang="scss" scoped>
.Hot {
  width: 100vw;
  overflow: hidden;
  margin-bottom: 60px;
  .hottopbarback {
    width: 100vw;
    height: 18vh;
    background-image: url("../assets/hotback.jpg");

    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      background-color: rgba($color: #000000, $alpha: 0.2);
    }
    .hottopbar {
      position: absolute;
      left: 6px;
      top: 10%;
      background-image: url("../assets/hotsprite.png");
      background-repeat: no-repeat;
      background-size: cover;
      width: 165px;
      height: 73px;
      background-position: -9px -23px;
    }
    .updatadays {
      position: absolute;
      left: 20px;
      font-size: 12px;
      bottom: 16%;
      color: rgb(255, 255, 255);
    }
  }
}
</style>