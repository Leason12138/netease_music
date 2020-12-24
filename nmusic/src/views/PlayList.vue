<template>
  <div class="box">
    <div v-if="isShow" class="playlist">
      <div class="topbar">
        <div
          class="topbarback"
          :style="{
            backgroundImage: `url(${listdetres.playlist.coverImgUrl})`,
          }"
        ></div>
        <div
          class="toppic"
          :style="{
            backgroundImage: `url(${listdetres.playlist.coverImgUrl})`,
          }"
        ></div>
        <div class="topmsg">
          <span>{{ listdetres.playlist.name }} </span>

          <div class="creator">
            <div
              class="creatorpic"
              :style="{
                backgroundImage: `url(${listdetres.playlist.creator.avatarUrl})`,
              }"
            ></div>
            <span>{{ listdetres.playlist.creator.nickname }} </span>
          </div>
        </div>
      </div>
      <div class="songlistinside">歌曲列表</div>
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
import MusicListItem from "../components/MusicListItem";

export default {
  components: { MusicListItem },
  data: function () {
    return {
      curMusic_id: "",
      listArr: [],
      duoarr: [],
      // duoarrid: [],
      // str: "",
      listdetres: "",
      ok: "asdaw",
      isShow: false,
      // q_id: "",
    };
  },
  methods: {
    clickfn(target, index) {
      this.curMusic_id = target.id;
      this.$emit("changdiurl", target, index, this.listArr);
    },
    //
  },
  mounted() {},
  activated() {
    console.log(this.$route.query.id);
    this.isShow = false;
    this.$axios
      .get(`/playlist/detail?id=${this.$route.query.id}`)
      .then((res) => {
        this.listdetres = res.data;
        this.duoarr = res.data.playlist.trackIds
          .map((item) => {
            return item.id;
          })
          .join(",");
      })
      .then(() => {
        this.$axios.get(`/song/detail?ids=${this.duoarr}`).then((res) => {
          //
          this.listArr = res.data.songs;
          this.isShow = true;
        });
      });
  },
  // updated(){
  //   console.log(1);
  //  this.q_id= this.$route.query.id
  // },
  // watch:{
  //   q_id:function(n){
  //     console.log(n);
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.playlist {
  margin-top: -50px;
  width: 100%;
  height: 100%;
  z-index: 10;
  overflow: hidden;
  background-color: #fff;
  margin-bottom: 60px;
  .topbar {
    overflow: hidden;
    width: 100vw;
    height: 48vw;
    position: relative;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-color: #666;
    z-index: 0;
    .topbarback {
      width: 100vw;
      height: 48vw;
      z-index: 1;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      filter: blur(10px) brightness(55%);
      width: 100%;
      height: 100%;
      content: "";
      position: absolute;
      display: block;
      left: 0;
      top: 0;
    }

    .toppic {
      z-index: 2;
      width: 32vw;
      height: 32vw;
      background-size: cover;

      background-color: #fff;
    }
    .topmsg {
      z-index: 2;
      font-size: 17px;
      width: 55vw;
      height: 32vw;
      color: #eee;
      .creator {
        width: 100%;
        margin: 3.5vh 0;
        position: relative;
        .creatorpic {
          display: inline-block;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-size: cover;
          break-after: 50%;
        }
        span {
          color: #ddd;
          font-size: 14px;
          position: absolute;
          left: 36px;
          top: 4px;
        }
      }
    }
  }
  .songlistinside {
    font-size: 12px;
    background-color: #eee;
    padding: 4px 10px;
  }
}
.loading {
  margin-top: -100px;
  width: 100vw;
  height: 100vh;
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
      animation: loadingmove 1s linear infinite ;
      &:nth-child(1){
        animation-delay: 0.7s;
      }
      &:nth-child(2){
        animation-delay: 0.1s;
      }
      &:nth-child(3){
        animation-delay: 0.5s;
      }
      &:nth-child(4){
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
.PlayCom {
  width: 100%;
  position: fixed;
  bottom: -5px;
}
</style>