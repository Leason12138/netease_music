<template>
  <div class="play">
    <audio
      class="mplayer"
      :src="
        'https://music.163.com/song/media/outer/url?id=' + mp3datail.id + '.mp3'
      "
      autoplay
      ref="audio"
    ></audio>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__slideInUp animate__slow	"
      leave-active-class="animate__animated animate__slideOutDown animate__faster "
    >
      <div v-show="isbarshow && mp3datail.al.picUrl" class="palybar">
        <div class="musicshow" @click="isbarshow = !isbarshow">
          <div class="pic" ref="pic">
            <div
              class="picinside"
              :style="{ backgroundImage: 'url(' + mp3datail.al.picUrl + ') ' }"
            ></div>
          </div>
          <span class="musicname"
            >{{ mp3datail.al.name }} --
            <span class="auther" v-for="it in mp3datail.ar" :key="it.id">
              {{ it.name }}
            </span>
          </span>
        </div>
        <div class="mplayer-control">
          <!-- <canvas id="canvas"></canvas> -->

          <span @click="changeStop" v-if="runool" class="ctrl"
            ><span class="cin"></span
          ></span>
          <span @click="changeStop" v-else class="runing"
            ><span class="rin"></span
          ></span>
        </div>
      </div>
    </transition>
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__slideInUp animate__faster 	"
      leave-active-class="animate__animated animate__slideOutDown animate__fast"
    >
      <div v-show="!isbarshow && mp3datail.al.picUrl" class="palyfull">
        <div
          class="palyfull-bgi"
          :style="{ backgroundImage: 'url(' + mp3datail.al.picUrl + ') ' }"
        ></div>
        <PlayFullTop
          class="PlayFullTop"
          :mp3datail="mp3datail"
          @resIsBarShow="isbarshow = !isbarshow"
        />
        <div class="midle-box">
          <transition
            name="custom-classes-transition"
            enter-active-class="animate__animated animate__fadeIn 	"
            leave-active-class="animate__animated animate__fadeOut   "
          >
            <PlayFullView
              :runool="runool"
              :mp3datail="mp3datail"
              class="PlayFullView"
              @ViewOrLyric="midleShow = !midleShow"
              v-show="midleShow"
            />
          </transition>

          <transition
            name="custom-classes-transition"
            enter-active-class="animate__animated animate__fadeIn  	 "
            leave-active-class="animate__animated animate__fadeOut   "
          >
            <PlayFullLyric
              :ctime="ctime"
              :mp3datail="mp3datail"
              class="PlayFullLyric"
              @ViewOrLyric="midleShow = !midleShow"
              v-show="!midleShow"
            />
          </transition>
        </div>
        <PlayFullBottom
          class="PlayFullBottom"
          :Songing="Songing"
          :ctime="ctime"
          :runool="runool"
          @changeTimeFn="changeTimeFn"
          @setctimefn="setctimefn"
          @nextSong="nextSong"
          @prevSong="prevSong"
          @changeStop="changeStop"
        />
      </div>
    </transition>
  </div>
  <!-- <div v-if="isShowBar"></div>
<div v-if="!isShowBar"></div> -->
</template>

<script>
import PlayFullView from "@/components/PlayFullView";
import PlayFullLyric from "@/components/PlayFullLyric";
import PlayFullTop from "@/components/PlayFullTop";
import PlayFullBottom from "@/components/PlayFullBottom";
export default {
  components: {
    PlayFullView,
    PlayFullLyric,
    PlayFullTop,
    PlayFullBottom,
  },
  props: ["songlist", "index"],
  data: function () {
    return {
      runool: false,
      isbarshow: true,
      Songing: "",
      ctime: "",
      mp3datail: {},
      canClacIndex: "",
      midleShow: true,
    };
  },

  methods: {
    setctimefn(time) {
      let audio = this.$refs.audio;
      let pic = this.$refs.pic;
      audio.currentTime = time;
      this.runSong(audio, pic);
    },
    changeTimeFn(tt) {
      tt;
    },
    changeStop() {
      let audio = this.$refs.audio;
      let pic = this.$refs.pic;

      if (this.runool) {
        this.runSong(audio, pic);
      } else {
        this.stopSong(audio, pic);
      }
    },
    stopSong(audio, pic) {
      audio.pause();
      pic.classList.add("picstop");
      this.runool = audio.paused;
    },
    runSong(audio, pic) {
      audio.play();
      this.runool = audio.paused;
      pic.classList.remove("picstop");
    },
    nextSong() {
      if (this.canClacIndex == this.songlist.length - 1) {
        this.canClacIndex = 0;
      } else {
        this.canClacIndex++;
      }
    },
    prevSong() {
      this.canClacIndex = this.canClacIndex > 0 ? --this.canClacIndex : 0;
    },
  },
  updated() {
    let that = this;
    // let pic = this.$refs.pic;
    let audio = this.$refs.audio;
    audio.ontimeupdate = function () {
      that.Songing = this;
      that.ctime = this.currentTime;
      if (this.ended) {
        that.nextSong();
      }
    };
  },
  watch: {
    index: function (n) {
      this.canClacIndex = n;
    },
    canClacIndex: function (n) {
      this.mp3datail = this.songlist[n];
    },
    mp3datail: function () {
      let audio = this.$refs.audio;
      let pic = this.$refs.pic;
      this.runSong(audio, pic);
      this.runool = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.animate__delay-0p8s {
  --animate-delay: 0.5s;
}
.play {
  z-index: 10;
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  position: relative;
  // background-color: #c2c2c2;
  .palybar {
    width: 100vw;
    background-color: darkgrey;
    height: 8vh;
    position: absolute;
    bottom: 0;
    .musicshow {
      position: absolute;
      left: 0;
      top: 42%;
      width: 68vw;
      // background-color: pink;
      transform: translateY(-50%);
      display: flex;
      justify-content: space-between;
      align-items: center;
      .pic {
        margin: 0 0 7px 7px;
        width: 13.5vw;
        height: 13.5vw;
        background: url("../assets/black_pad.png") no-repeat;
        background-size: contain;
        border-radius: 50%;
        animation: picTurnRound 3.5s linear infinite;
        display: flex;
        justify-content: center;
        align-items: center;
        .picinside {
          width: 8.2vw;
          height: 8.2vw;
          border-radius: 50%;
          background-size: cover;
          background-repeat: no-repeat;
        }
      }
      .picstop {
        animation-play-state: paused;
        -webkit-animation-play-state: paused;
      }
      .musicname {
        text-align: center;
        height: 8vw;
        font-size: 14px;
        line-height: 8vw;
        white-space: nowrap;
        width: 48vw;
        color: #fafafa;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        background-color: transparent;
        .auther {
          color: #fafafa;
          font-size: 12px;
          line-height: 8vw;

          &:last-of-type {
            &::after {
              content: "";
            }
          }
          &::after {
            content: "/";
          }
        }
      }
    }
    // .mplayer {
    //   width: 50vw;
    //   background-color: red;
    // }
    .mplayer-control {
      width: 28vw;
      line-height: 40px;
      position: absolute;
      right: -3vw;
      top: 42%;
      transform: translateY(-50%);
display: flex;
justify-content:space-between;
align-items: center;
      .runing {
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 22px;
        text-align: center;
        font-size: 12px;
        color: #fafafa;
        border: 2px solid #fafafa;
        position: relative;
        border-radius: 50%;
        .rin {
          display: block;
          width: 12px;
          height: 12px;
          background-image: url("../assets/stop.png");
          background-size: contain;
          position: absolute;
          left: 0;
          right: 0;
          margin: 0 auto;
          // transform: translate(-50% -50%);
          top: 20%;
        }
      }
      .ctrl {
        display: inline-block;
        width: 17px;
        height: 20px;
        padding-left: 3px;
        line-height: 23px;
        text-align: center;
        font-size: 12.5px;
        color: #fafafa;
        border: 2px solid #fafafa;
        border-radius: 50%;

        position: relative;
        .cin {
          display: block;
          width: 12px;
          height: 12px;
          background-image: url("../assets/run.png");
          background-size: contain;
          position: absolute;
          left: 0;
          right: 0;
          margin: 0 auto;
          // transform: translate(-50% -50%);
          top: 20%;
        }
      }
    }
  }
  .palyfull {
    z-index: 10;
    width: 100vw;
    height: 101vh;
    background-color: #757575;
    display: block;
    position: relative;
    .palyfull-bgi {
      z-index: -1;
      width: 100vw;
      height: 100vh;
      background-position: center center;
      background-size: cover;
      position: absolute;
      filter: blur(25px) brightness(55%);
    }
    // class="PlayFullTop"
    // class="midle-box PlayFullView"
    // class="midle-box PlayFullLyric
    // class="PlayFullBottom"

    .midle-box {
      width: 100vw;
      position: relative;
      .PlayFullView,
      .PlayFullLyric {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
    }
    .midle-box,
    .PlayFullTop,
    .PlayFullBottom {
      z-index: 2;
    }
    .PlayFullBottom {
      position: absolute;
      bottom: 0;
    }
  }
}
@keyframes picTurnRound {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>