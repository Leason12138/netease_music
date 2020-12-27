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
        <div class="palybarbackgbox">
          <div
            class="palybarbackg"
            :style="{ backgroundImage: 'url(' + mp3datail.al.picUrl + ') ' }"
          ></div>
        </div>
        <div class="musicshow" @click="isbarshow = !isbarshow">
          <div class="pic" ref="pic">
            <div
              class="picinside"
              :style="{ backgroundImage: 'url(' + mp3datail.al.picUrl + ') ' }"
            ></div>
          </div>
          <span class="musicname"
            >{{ mp3datail.name }} --
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

          <div class="songList" @click="modalboxshow = !modalboxshow">
            <transition
              name="custom-classes-transition"
              enter-active-class="animate__animated animate__slideInUp animate__faster 	"
              leave-active-class="animate__animated animate__slideOutDown animate__faster"
            >
              <div class="list" v-if="modalboxshow">
                <div class="modalbox" ref="modalbox" v-if="modalboxshow">
                  <div
                    class="modalin"
                    ref="modalin"
                    @click.stop
                    @touchstart="touchstartFn"
                    @touchmove.prevent="touchmoveFn"
                    @touchend="touchendFn"
                  >
                    <ModalItem
                      @clickfn="clickfn"
                      :curMusic_id="curMusic_id"
                      class="newsong"
                      :item="item"
                      v-for="(item, index) in songlist"
                      :idx="index"
                      :key="item.id"
                    >
                    </ModalItem>
                  </div>
                </div>
              </div>
            </transition>

            <!-- <ModalItem></ModalItem> -->
          </div>
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
              @changectimefn="changectimefn"
              :ctime="ctime"
              :mp3datail="mp3datail"
              class="PlayFullLyric"
              @ViewOrLyric="midleShow = !midleShow"
              v-show="!midleShow"
            />
          </transition>
        </div>
        <PlayFullBottom
          @clickfn="clickfn"
          class="PlayFullBottom"
          :Songing="Songing"
          :ctime="ctime"
          :runool="runool"
          :songlist="songlist"
          :curMusic_id="curMusic_id"
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
import ModalItem from "@/components/ModalItem";
export default {
  components: {
    PlayFullView,
    PlayFullLyric,
    PlayFullTop,
    PlayFullBottom,
    ModalItem,
  },
  props: ["songlist", "index"],
  data: function () {
    return {
      modalboxshow: false,
      runool: false,
      isbarshow: true,
      Songing: "",
      ctime: "",
      curMusic_id: "",
      mp3datail: {},
      canClacIndex: "",
      midleShow: true,
      beginMove: "",
      ny: 0,
      cy: 0,
      listArr: [],
    };
  },

  methods: {
 
    changectimefn(t) {
      let audio = this.$refs.audio;
      audio.currentTime = t;
    },
    clickfn(target, index) {
      console.log(111, target, index, this.listArr);
      // console.log(target);
      this.curMusic_id = target.id;
      this.canClacIndex = index;
    },
    touchstartFn(e) {
      // console.log(e.touches[0].clientY);
      this.beginMove = e.touches[0].clientY;
      this.$refs.modalin.classList.remove("mdlmove");
    },
    touchmoveFn(e) {
      // console.log(e.touches[0].clientY);
      this.cy = e.touches[0].clientY - this.beginMove + this.ny;
      this.$refs.modalin.style.marginTop = this.cy + "px";
    },
    touchendFn() {
      // console.log(
      //   this.cy,
      //   this.beginMove,
      //   this.ny,
      //   "gd",
      //   this.$refs.modalin.offsetHeight
      // );
      if (this.cy >= 0) {
        this.$refs.modalin.classList.add("mdlmove");
        this.cy = 0;
        this.$refs.modalin.style.marginTop = this.cy + "px";
      } else if (
        this.cy <=
        -this.$refs.modalin.offsetHeight + this.$refs.modalbox.offsetHeight
      ) {
        this.$refs.modalin.classList.add("mdlmove");
        this.cy =
          -this.$refs.modalin.offsetHeight + this.$refs.modalbox.offsetHeight;
        this.$refs.modalin.style.marginTop = this.cy + "px";
        // this.$refs.modalin.classList.remove("mdlmove");
      }
      this.ny = this.cy;
    },
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
        this.$emit('changecid',this.songlist[this.canClacIndex].id)
        console.log(1);
      }
    },
    prevSong() {
      this.canClacIndex = this.canClacIndex > 0 ? --this.canClacIndex : 0;
    },
  },
  updated() {
    // mp3datail.id
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
    mp3datail: function (n) {
      let audio = this.$refs.audio;
      let pic = this.$refs.pic;
      this.runSong(audio, pic);
      this.runool = false;
      this.curMusic_id = n.id;
      // console.log(this.curMusic_id);
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
    // background-color: #a9a9a9;
    height: 8vh;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    // overflow: hidden;
    .palybarbackgbox {
      position: absolute;
      width: 100vw;
      height: 8vh;
      overflow: hidden;
      background: darkgrey;
      z-index: -2;

      .palybarbackg {
        position: absolute;
        width: 100vw;
        height: 8vh;
        z-index: -1;
        filter: blur(10px) brightness(40%);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
    }

    .musicshow {
      width: 68vw;
      // background-color: pink;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
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
      margin: 0 2vw 2vw 0;
      width: 18vw;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
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
      .songList {
        color: #333;
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
          width: 6vw;
          height: 6vw;
          background: url("../assets/lists.png");
          background-size: cover;
        }
        .list {
          width: 100vw;
          height: 100vh;
          position: absolute;
          top: -94vh;
          left: -90.5vw;
          background-color: rgba($color: #000000, $alpha: 0.6);
          .modalbox {
            position: absolute;
            top: 20%;
            left: 15%;
            border-radius: 10px;
            box-shadow: 0 0 22px 0 #ffffff;
            overflow: hidden;
            width: 80vw;
            height: 65vh;
            background-color: rgba($color: #eaeaea, $alpha: 0.9);
          }
          .mdlmove {
            transition: all 0.3s cubic-bezier(0.5, -0.8, 0, 1.5);
          }
        }
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

@keyframes picTurnRound {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>