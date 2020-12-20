
<template>
  <div class="PlayFullView" @click="$emit('ViewOrLyric')">
    <div class="singingNeedles">
      <div ref="singingNeedlespic" class="singingNeedlespic"></div>
    </div>
    <div class="picbgc">
      <div class="pic" ref="pic">
        <div
          class="picinsilde"
          :style="{ backgroundImage: 'url(' + mp3datail.al.picUrl + ') ' }"
        ></div>
      </div>
    </div>
    <div>
      <!-- <span class="musicname"
        >{{ mp3datail.name }} --
        <span class="auther" v-for="it in mp3datail.ar" :key="it.id">
          {{ it.name }}
        </span>
      </span> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["mp3datail", "runool"],
  mounted() {
    // console.log(this.mp3datail.al.picUrl);
  },
  watch: {
    runool: function (n) {
      // console.log(n);
      if (n) {
        this.$refs.pic.classList.add("picstop");
        this.$refs.singingNeedlespic.classList.add("singingNeedlespicout");
        this.$refs.singingNeedlespic.classList.remove("singingNeedlespicin");
      } else {
        this.$refs.pic.classList.remove("picstop");
        this.$refs.singingNeedlespic.classList.remove("singingNeedlespicout");
        this.$refs.singingNeedlespic.classList.add("singingNeedlespicin");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.PlayFullView {
  width: 100vw;
  height: 73vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .singingNeedles {
    width: 100vw;
    position: relative;
    .singingNeedlespic {
      z-index: 10;
      width: 10vw;
      height: 20vh;
      position: absolute;
      left: 50%;
      background-image: url("../assets/singingNeedles.png");
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      transform-origin: top center;
      transform: rotate(-25deg);
    }
    .singingNeedlespicin {
      animation: 0.25s singingNeedlesTurnRound ease-in-out forwards ;
    }
    .singingNeedlespicout {
      animation: 0.25s singingNeedlesTurnRoundOut ease-in-out forwards ;
    }
  }
  .picbgc {
    width: 82vw;
    height: 82vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: rgba(235, 235, 235, 0.137);
    .pic {
      background: url("../assets/black_pad.png") no-repeat;
      animation: picTurnRound 10s linear infinite;
      background-size: contain;
      width: 76vw;
      height: 76vw;
      display: flex;
      justify-content: center;
      align-items: center;
      .picinsilde {
        z-index: 6;
        background-repeat: no-repeat;
        background-size: cover;
        width: 52.5vw;
        height: 52.5vw;
        border-radius: 50%;
        background-color: transparent;
      }
    }
    .picstop {
      animation-play-state: paused;
      -webkit-animation-play-state: paused;
    }
  }
  .musicname {
    color: #fff;
  }

  @keyframes picTurnRound {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes singingNeedlesTurnRound {
    from {
      transform: rotate(-60deg);
    }
    to {
      transform: rotate(-25deg);
    }
  }
  @keyframes singingNeedlesTurnRoundOut {
    from {
      transform: rotate(-25deg);
    }
    to {
      transform: rotate(-60deg);
    }
  }
}
</style>