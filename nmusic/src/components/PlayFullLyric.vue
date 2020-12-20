<template>
  <div @click="$emit('ViewOrLyric')">
    <div class="lrc" :style="{ marginTop: `${-i * 37}px` }">
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
    };
  },
  methods: {
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
      this.i = this.lrc.findIndex((element) => {
        return element.time > n;
      });
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

  .lrc {
    transition: all 0.4s linear;
    padding-top: 50%;
    color: #aaa;
    text-align: center;position: relative;
  
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