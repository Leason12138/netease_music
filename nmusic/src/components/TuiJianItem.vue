<template>
  <div @click="clickFn(item.id)" class="tuijianitem">
    <!-- <routerLink class="rote" to="/playlist"> -->
      <div class="imga">
        <span class="pp"> 🎧{{ (item.playCount / 10000).toFixed(1) }}万 </span>
        <img :src="item.picUrl" alt="" />
      </div>
      <span class="txt"> {{ item.name }}</span>
    <!-- </routerLink>
    <router-view /> -->
  </div>
</template>

<script>
// import PlayList from '../views/PlayList'
export default {
  // components:{PlayList},
  props: ["item"],
  created() {
    // console.log(this.item);
  },
  methods: {
    clickFn:function(id){
     this.$router.push({
        path: "/playlist",
        query: {
          id,
        },
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.tuijianitem {
  .rote {
    text-decoration: 0;
  }
  padding: 0;
  margin: 0;
  .imga {
    width: 33vw;
    height: 32vw;
    position: relative;
    .pp {
      font-size: 12px;
      position: absolute;
      right: 6px;
      top: 2px;
      color: #fff;
    }
    img {
      width: 100%;
    }
  }
  .txt {
    color: #000;

    font-size: 13.5px;
    padding: 6px 4px 1px 6px;
    text-align: left;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
</style>