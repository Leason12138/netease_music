<template>
  <div class="search">
    <div class="inputbox">
      <span class="searchicon"></span>
      <input
        class="input"
        v-model="keywords"
        type="text"
        placeholder="搜索歌曲、歌手、专辑"
      />
      <span class="searchdel" @click="keywords = ''">✖</span>
    </div>
    <div>
      <div class="hotsearch" v-show="!keywords && !listArr[0]">
        <p class="hottext">热门搜索</p>
        <ul>
          <li
            @click="
              keywords = item.searchWord;
              getSearchList(item.searchWord);
            "
            v-for="(item, index) in hotsearchlist"
            :key="index"
            :idx="index"
          >
            {{ item.searchWord }}
          </li>
        </ul>
        <div class="hissearch">
          <!-- 历史搜索（暂缓 -->
        </div>
        <!-- hotsearch -->
      </div>
      <div v-show="keywords && !listArr[0]">
        <span class="atsearch" @click="getSearchList(keywords)"
          >搜索“{{ keywords }}”</span
        >
        <ul>
          <li
            class="sugtext"
            @click="sugClickFn(item.keyword)"
            v-for="item in searchSug"
            :key="item.id"
          >
            <div class="searchicon"></div>
            {{ item.keyword }}
          </li>
        </ul>
        <!-- inputsearch -->
      </div>
      <div v-if="listArr[0]">
        <MusicListItem
          @clickfn="clickfn"
          :curMusic_id="curMusic_id"
          :item="item"
          v-for="(item, index) in listArr"
          :idx="index"
          :key="item.id"
        >
        </MusicListItem>
      </div>
      <div v-if='!listArr[0]&&keywords&&!searchSug[0]' class="loading">
      <div class="icon">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
      <!-- main -->
    </div>
    <!-- search -->
  </div>
</template>

<script>
import MusicListItem from "@/components/MusicListItem";

export default {
  components: { MusicListItem },

  data: function () {
    return {
      keywords: "",
      hotsearchlist: [],
      timer: "",
      curMusic_id: "",
      returnSongList: [],
      returnSongids: "",
      searchSug: [],
      searchkeywords: "",
      listArr: [],
    };
  },
  methods: {
    sugClickFn(str) {
      this.searchSug=[]
      this.getSearchList(str);
    },
    clickfn(target, index) {
      // console.log(target);
      this.curMusic_id = target.id;
      this.$emit("changdiurl", target, index, this.listArr);
    },
    getSearchList(str) {
      this.axios
        .get(`/search?keywords=${str}`)
        .then((res) => {
          // res
          console.log(res.data.result);

          this.returnSongids = res.data.result.songs
            .map((item) => {
              return item.id;
            })
            .join(",");
          // console.log(  this.returnSongList);
          // console.log(   this.returnSongids);√
        })
        .then(() => {
          this.$axios
            .get(`/song/detail?ids=${this.returnSongids}`)
            .then((res) => {
              //
              this.listArr = res.data.songs;
              console.log(this.listArr);
            });
        });
    },
  },
  created() {
    this.axios.get("/search/hot/detail").then((res) => {
      this.hotsearchlist = res.data.data.slice(0, 10);
    });
  },
  watch: {
    keywords: function (n) {
      this.listArr = [];

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.axios
          .get(`/search/suggest?keywords=${n}&type=mobile`)
          .then((res) => {
            // console.log(res.data.result.allMatch);

            this.searchSug = res.data.result.allMatch;
          });
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  margin-bottom: 60px;
    .loading {
    margin-top: -100px;
    width: 100vw;
    height: 80vh;
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
  .inputbox {
    margin: 12.5px 0;

    margin-left: 3vw;
    width: 94vw;
    height: 36px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #ebebeb;
    border-radius: 18vh;
    span {
      display: block;
      position: relative;
    }
    .searchicon {
      width: 20px;
      height: 20px;
      // background-color: red;
      margin: 0 3%;
      border-radius: 50%;
      &::before {
        content: "";
        width: 50%;
        height: 50%;
        display: block;
        border-radius: 50%;
        position: absolute;
        border: 2px solid #c9c9ca;
      }
      &::after {
        content: "";
        width: 3px;
        height: 38%;
        background-color: #c9c9ca;
        display: block;
        position: absolute;
        transform: rotateZ(-45deg);
        right: 23%;
        bottom: 12%;
      }
    }
    .searchdel {
      margin: 0 3%;
      width: 17.5px;
      height: 17.5px;
      border-radius: 50%;
      text-align: center;
      line-height: 17.5px;
      font-size: 13px;
      background-color: #bcbdbd;
      color: #ebebeb;
    }
    .input {
      outline: none;
      border: none;
      color: #555555;
      background-color: #ebebeb;
      width: 80%;
      height: 80%;
      &::placeholder {
        color: #bcbdbd;
      }
    }
  }
  .hotsearch {
    width: 94vw;
    margin-left: 3vw;
    .hottext {
      font-size: 14px;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        height: 20px;
        font-size: 14px;
        display: inline-block;
        margin: 5px;
        padding: 3px 10px;
        border-radius: 20px;
        color: #666;
        border: 1px solid #ddd;
      }
    }
  }
  .atsearch {
    margin-left: 3vw;
    display: block;
    color: #3e7cc3;
    border-bottom: 1px solid #eee;
    padding: 8px 0;
  }
  .sugtext {
    position: relative;
    .searchicon {
      width: 20px;
      height: 20px;
      // background-color: red;
      margin: 0 3%;
      border-radius: 50%;
      position: absolute;
      left: -35px;
      &::before {
        content: "";
        width: 50%;
        height: 50%;
        display: block;
        border-radius: 50%;
        position: absolute;
        border: 2px solid #c9c9ca;
      }
      &::after {
        content: "";
        width: 3px;
        height: 38%;
        background-color: #c9c9ca;
        display: block;
        position: absolute;
        transform: rotateZ(-45deg);
        right: 23%;
        bottom: 12%;
      }
    }

    padding: 0;
    margin: 0;
    height: 16px;
    line-height: 16px;
    font-size: 16px;
    padding: 16px 0;
    border-bottom: 1px solid #eee;
    list-style: none;
  }
}
</style>