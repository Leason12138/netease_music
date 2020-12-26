<template>
  <div
    @click.prevent="$emit('ViewOrLyric')"
    @touchstart.prevent="lrctouchstartFn"
    @touchmove.prevent="lrctouchmoveFn"
    @touchend.prevent="lrctouchendFn"
  >
    <div
      v-if="lrctext"
      class="lrc lrctransition"
      ref="lrc"
      :style="{ marginTop: `${-i * 37}px` }"
    >
      <div
        class="lrctext"
        v-for="(item, index) in lrctext"
        :idx="index"
        :key="index"
        :class="{ light: i - 1 == index }"
      >
        {{ item }}
      </div>
    </div>
    <div class="lrc" v-else>cyyatbt</div>
  </div>
</template>

<script>
export default {
  props: ["mp3datail", "ctime"],
  data: function () {
    return {
      lrc: "",
      lrctext: [],
      i: "",
      begintouch: "",
      istouch: false,
      isgoon: "",
    };
  },
  methods: {
    lrctouchstartFn(e) {
      this.istouch = true;
      // console.log(e.touches[0].clientY);
      this.begintouch = e.touches[0].clientY;
      // console.log(this.$refs.lrc.classList);
      this.$refs.lrc.classList.remove("lrctransition");
    },
    lrctouchmoveFn(e) {
      this.isgoon = Math.floor((e.touches[0].clientY - this.begintouch) / 37);
  
    },
    lrctouchendFn() {
      // console.log();
      this.$emit("changectimefn", this.lrc[this.i].time);
      this.istouch = false;
      this.$refs.lrc.classList.add("lrctransition");
    },
    getLrc() {
      this.lrctext = [];
      this.axios.get(`/lyric?id=${this.mp3datail.id}`).then((res) => {
        function paresLyric(lyric) {
          var patt = /\[\d{2}:\d{2}\.\d{2,3}\]/gi;
          var arr = lyric
            .split("\n")
            .filter((e) => e)
            .map((str) => {
              var time = str.match(patt)[0].replace(/(\[|\])/gi, "");
              var timeArr = time.split(":");
              time = Number(timeArr[0]) * 60 + Number(timeArr[1]);
              var text = str.replace(patt, "");
              return {
                time,
                text,
              };
            });
          return arr;
        }
        this.lrc = paresLyric(res.data.lrc.lyric);
        this.lrc.map((item) => {
          this.lrctext.push(item.text);
        });
      });
    },
  },
  created() {
    this.getLrc();
  },
  watch: {
    mp3datail: function () {
      this.getLrc();
    },
   
    ctime: function (n) {
      /**
 * if (this.lrc) {
        this.i = this.lrc.findIndex((element) => {
          return element.time > n;
        });
      }
 */
      if (!this.istouch) {
        if (this.lrc) {
          this.i = this.lrc.findIndex((element) => {
            return element.time > n;
          });
            if(this.i<0){
              this.i=this.lrc.length
            }
        }
      }
    },
    isgoon:  function(n, o) {
      if(n<o){
        
         this.i++;
         
      }else{
         this.i--
      }
      if(this.i<0){
        console.log(1);
        this.i=0
      }
      if(this.i>this.lrctext.length){
        console.log(this.lrctext.length);
        this.i=this.lrctext.length-2
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.PlayFullLyric {
  width: 100vw;
  height: 52vh;
  overflow: hidden;
  margin-top: 10vh;
  .lrctransition {
    transition: all 0.4s linear;
  }
  .lrc {
    padding-top: 50%;
    color: #aaa;
    text-align: center;
    position: relative;

    .lrctext {
      width: 100vw;
      white-space: pre-wrap;
      margin: 1rem 0;
      padding: 0;
    }
    .light {
      font-size: 16.5px;
      color: #fff;
    }
  }
}
</style>