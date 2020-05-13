<template>
  <div class="progressive">
    <img :src="loadSmall"
         class="small placeholder"
         @load="loadingLarge = true"
         :class="{loaded:loadingLarge}">
    <img :src="loadLarge"
         class="large"
         :class="{loaded:loadingLarge}"
         v-if="loadingLarge">
  </div>
</template>

<script>
// https://static.xujiazhen.website/image/small/1033762.jpg
// https://static.xujiazhen.website/image/large/1033762.jpg
export default {
  name: 'Progressive',
  props: {
    imgName: String
  },
  data () {
    return {
      loadingLarge: false
    }
  },
  computed: {
    loadSmall () {
      return `https://static.xujiazhen.website/image/small/${this.imgName}.jpg`
    },
    loadLarge () {
      return `https://static.xujiazhen.website/image/large/${this.imgName}.jpg`
    }
  }
}
</script>

<style lang="less">
.progressive {
  transition: filter 0.3s;
  position: relative;
  overflow: hidden;
  background-color: white;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &.large {
      z-index: 1;
    }
    &.placeholder {
      filter: blur(8px);
      transform: scale(1);
    }
  }
}
</style>