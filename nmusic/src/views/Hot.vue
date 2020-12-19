<template>
  <div class="Hot">
    <div class="hottopbar"></div>
    <hr />
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
  .hottopbar{
      height: 30vh;
      background-color: #dd2e26;
  }
}
</style>