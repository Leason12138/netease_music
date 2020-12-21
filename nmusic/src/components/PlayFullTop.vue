<template>
  <div class="top">
    <span class="hindbtn" @click="$emit('resIsBarShow')"></span>
    <span class="musicname">
      <span :class="{ musicnamen: 1,namemove:bool }">{{ mp3datail.name }}</span>
      <br />
      <span class="auther" v-for="it in mp3datail.ar" :key="it.id">
        {{ it.name }}
      </span>
    </span>
    <span class="share"> </span>
  </div>
</template>

<script>
export default {
  props: ["mp3datail"],
  computed: {
    bool() {
    return  (this.mp3datail.name.length > 21);
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  height: 16.18vw;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  .hindbtn {
    // background-color: rgb(233, 39, 39);
    border: 2px solid #fff;
    height: 14px;
    width: 14px;
    display: block;
    transform: rotateZ(-45deg);
    border-top-color: transparent;
    border-right-color: transparent;
  }
  .musicname {
    // background-color: rgb(25, 178, 216);
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    line-height: 3vh;
    width: 56vw;
    height: 6vh;
    display: block;
    margin-top: 3vh;
    .musicnamen {
      white-space: nowrap;
      line-height: 3vh;
      width: auto;
      display: inline-block;
      height: 3vh;
      font-size: 4.2vw;
    }
    .namemove {
      animation: 6s musicnamenturn linear infinite;
    }
    .auther {
      padding-top: 4px;
      display: block;
      text-align: center;
      font-size: 10px;
      color: #bbb;
    }
  }
  .share {
    // background-color: rgb(216, 213, 25);
    width: 32px;
    height: 32px;
    background: url("../assets/share.png") no-repeat;
    background-size: contain;
    display: block;
    margin-top: 14px;
  }
  @keyframes musicnamenturn {
    0% {
      transform: translateX(20%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
}
</style>