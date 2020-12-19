<template>
  <div class="top" >
    <span @click="$emit('resIsBarShow')">Ⅴ</span>
    <span>
    PlayFullTop
    </span>
    <span>
      分享
    </span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.top{
  height: 14.14vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding:  0 4.2vw;
}
</style>