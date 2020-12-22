<template>
  <div  class="Hot">
    <div class="hottopbarback">
      <div class="hottopbar"></div>
      <span class="updatadays">更新日期 ：{{ updateTime }}日</span>
    </div>


    <div v-if="listArr[0]">
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
 <div v-else class="loading">
      <div class="icon">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
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
        .toISOString()
        .slice(5, 10)
      .replace("-", "月");
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
    .loading {
    margin-top: -100px;
    width: 100vw;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      width: 16vw;
      height: 12vw;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      div {
        height: 0;
        width: 16%;
        background-color: #d32929;
        animation: loadingmove 1s linear infinite;
        &:nth-child(1) {
          animation-delay: 0.7s;
        }
        &:nth-child(2) {
          animation-delay: 0.1s;
        }
        &:nth-child(3) {
          animation-delay: 0.5s;
        }
        &:nth-child(4) {
          animation-delay: 0.3s;
        }
      }
    }
  }
  @keyframes loadingmove {
    0% {
      height: 0;
    }
    50% {
      height: 100%;
    }
    100% {
      height: 0;
    }
  }
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
      width: 35vw;
      height: 21vw;
      background-position: -9px -23px;
    }
    .updatadays {
      position: absolute;
      left: 4vw;
      font-size: 12px;
      bottom: 16%;
      color: rgb(255, 255, 255);
    }
  }
}
</style>