<template>
  <div class="home">
    <p class="sidetext">推荐歌单</p>
    <div class="TuiJianbox" v-if="tuijianlist[0] ">
      <TuiJianItem
        class="tji"
        :item="item"
        v-for="item in tuijianlist.slice(0, 6)"
        :key="item.id"
      >
      </TuiJianItem>
    </div>
    <div v-else class="gujiatu">
      <div class="item">
        <div class="pic"></div>
        <div class="txt"></div>
      </div>
      <div class="item">
        <div class="pic"></div>
        <div class="txt"></div>
      </div>
      <div class="item">
        <div class="pic"></div>
        <div class="txt"></div>
      </div>
      <div class="item">
        <div class="pic"></div>
        <div class="txt"></div>
      </div>
      <div class="item">
        <div class="pic"></div>
        <div class="txt"></div>
      </div>
      <div class="item">
        <div class="pic"></div>
        <div class="txt"></div>
      </div>
    </div>
    <p class="sidetext">最新音乐</p>
    <div v-if="listArr[0]">
      <MusicListItem
        :curMusic_id="curMusic_id"
        @clickfn="clickfn"
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
    <br />
    <br />
    <br />
  </div>
</template>
<script>
import TuiJianItem from "@/components/TuiJianItem.vue";
import MusicListItem from "@/components/MusicListItem.vue";

export default {
  components: { TuiJianItem, MusicListItem },
  data: function () {
    return {
      tuijianlist: [],
      newsonglist: [],
      curMusic_id: "",
      Astr: "",
      listArr: [],
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
    this.axios.get("personalized").then((res) => {
      this.tuijianlist = res.data.result;
    });
    this.axios
      .get("/personalized/newsong")
      .then((res) => {
        // console.log(res);
        this.newsonglist = res.data.result;
        this.Astr = res.data.result
          .map((item) => {
            return item.id;
          })
          .join(",");
        // console.log(res.data.result);
      })
      .then(() => {
        this.$axios.get(`/song/detail?ids=${this.Astr}`).then((res) => {
          this.listArr = res.data.songs;
        });
      });
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.home {
  .loading {
    margin-top: -100px;
    width: 100vw;
    height: 50vh;
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
  margin-bottom: 60px;
  .sidetext {
    text-align: left;
    font-size: 16px;
    display: block;
    flex: 1 1 100vw;
    position: relative;
    margin-left: 15px;
  }
  .sidetext::before {
    content: "";
    display: block;
    position: absolute;
    left: -15px;
    width: 5px;
    height: 100%;
    background-color: #dd001b;
  }
  overflow: hidden;
  width: 100%;

  .TuiJianbox {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    width: 100vw;

    .tji {
      width: 32vw;
      padding-bottom: 10px;
      margin: 0;
    }
    .tji:nth-child(3n + 2) {
      width: 32vw;
      padding: 0;
      margin: 0;
    }
  }
  .gujiatu {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    width: 100vw;
    .item {
      width: 32vw;
      height: 43.5vw;
      padding-bottom: 10px;
      margin: 0;
      .pic {
        width: 32vw;
        height: 33vw;
        background-color: #eee;
        margin-bottom:1vw ;
      }
      .txt {
        width: 32vw;
        height: 9vw;
        background-color: #eee;
      }
    }
    .item:nth-child(3n + 2) {
      width: 32vw;
      height: 43.5vw;

      padding: 0;
      margin: 0;
    }
  }
  .newsong {
    display: block;
    width: 100%;
    height: 50px;
    text-align: left;
  }
}
</style>