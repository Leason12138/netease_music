<template>
  <div class="playfullbottom">
    <div class="time-range">
      <div v-if="ctime" class="ctime">{{ nowtime }}</div>
      <div v-else>00:00</div>
      <input
        class="ranger"
        type="range"
        min="0"
        ref="range"
        :max="Songing.duration"
        @input="sentctimefn"
        :value="ctime"
      />
      <div v-if="Songing.duration" class="etime">{{ endtime }}</div>
      <div v-else>00:00</div>
    </div>
    <div class="btnLsit">
      <div class="btn playModel"></div>
      <div class="btn prevSong" @click="$emit('prevSong')"></div>
      <div class="btn pauseSong" @click="$emit('changeStop')">
        <span v-if="runool" class="ctrl"> </span>
        <span v-else class="runing"></span>
      </div>
      <div class="btn nextSong" @click="$emit('nextSong')"></div>
      <div class="btn songList"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["Songing", "ctime", "runool"],
  data: function () {
    return {
      changeTime: "",
      // @input="$emit('changeTimeFn',)
    };
  },
  watch: {
Songing:function(n){
  console.log(n);
}

  },
  computed: {
    nowtime() {
      return `${
        this.ctime / 60 < 10
          ? `0${Math.floor(this.ctime / 60)}`
          : Math.floor(this.ctime / 60)
      }:${
        this.ctime % 60 < 10
          ? `0${Math.floor(this.ctime % 60)}`
          : Math.floor(this.ctime % 60)
      }`;
    },
    endtime() {
    //  this.mp3datail
     this.ctime
      return  `${
        this.Songing.duration / 60 < 10
          ? `0${Math.floor(this.Songing.duration / 60)}`
          : Math.floor(this.Songing.duration / 60)
      }:${
        this.Songing.duration % 60 < 10
          ? `0${Math.floor(this.Songing.duration % 60)}`
          : Math.floor(this.Songing.duration % 60)
      }`
    },
  },
  methods: {
    sentctimefn(e) {
      //   console.log(e.target.value);
      this.$emit("setctimefn", e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.playfullbottom {
  width: 100vw;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  .time-range {
    width: 90vw;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    color: #ffffff;
    font-size: 12px;
    .ranger {
      background-color: #999;
      width: 68vw;
      -webkit-appearance: none;
      border-radius: 10px;
      -webkit-appearance: none;
      // 给滑动轨道(track)添加样式
      &::-webkit-slider-runnable-track {
        height: 0.5vw;
        color: #999;
        background-color: #999;
        border-radius: 50%; /*将轨道设为圆角的*/
        // box-shadow: 0 1px 1px #def3f8, inset 0 0.125em 0.125em #0d1112; /*轨道内置阴影效果*/
      }
      &:input[type="range" i] {
        appearance: slider-horizontal;
        color: #777;
        cursor: default;
        padding: initial;
        border: initial;
        margin: 2px;
      }
      &:focus {
        outline: none;
        color: #777;
      }
      //  给滑块(thumb)添加样式
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 2vw;
        width: 2vw;
        margin-top: -0.75vw; /*使滑块超出轨道部分的偏移量相等*/
        background: #ffffff;
        color: #777;
        border-radius: 50%; /*外观设置为圆形*/
        // border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
        // box-shadow: 0 0.125em 0.125em #3b4547; /*添加底部阴影*/
      }
    }
  }
  .btnLsit {
    width: 85vw;
    height: 20vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .btn {
      background-color: transparent;
      text-align: center;
      //playModel"
      // prevSong">
      // pauseSong"
      // nextSong">
      // songList">
      &.songList,
      &.playModel {
        width: 7.5vw;
        height: 7.5vw;
        border-radius: 50%;

        position: relative;
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateY(-50%) translateX(-50%);
          display: block;
          background: url("../assets/radom.png");
          background-size: cover;
          width: 6vw;
          height: 6vw;
        }
      }
      &.songList {
        &::before {
          background: url("../assets/lists.png");
          background-size: cover;
        }
      }
      &.prevSong,
      &.nextSong {
        width: 10vw;
        height: 10vw;
        border-radius: 50%;

        position: relative;
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateY(-50%) translateX(-50%);
          display: block;
          background: url("../assets/nextbtn.png");
          background-size: cover;
          width: 7vw;
          height: 7vw;
        }
      }
      &.prevSong {
        &::before {
          background: url("../assets/prevbtn.png");
          background-size: cover;
        }
      }
      &.pauseSong {
        width: 12vw;
        height: 12vw;
        background-color: transparent;
        border-radius: 50%;
        line-height: 13.5vw;
        border: 1px solid #fff;
        position: relative;
        //  ctrl">
        // runing"
        .ctrl {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateY(-55%) translateX(-50%);
          width: 6vw;
          height: 7.1vw;
          display: block;
          background: url("../assets/run.png");
          background-size: cover;
          padding-left: 2vw;
        }
        .runing {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateY(-50%) translateX(-50%);
          width: 6vw;
          height: 6vw;
          display: block;
          background: url("../assets/stop.png");
          background-size: cover;
        }
      }
    }
  }
}
</style>