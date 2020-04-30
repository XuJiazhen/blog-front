<template>
  <div class="tools-container">
    <like-article />
    <go-comment />
    <back-top />
  </div>
</template>

<script>
import BackTop from './components/BackTop'
import LikeArticle from './components/LikeArticle'
import GoComment from './components/GoComment'
export default {
  name: 'ArticleTools',
  components: {
    BackTop,
    LikeArticle,
    GoComment
  }
}
</script>

<style lang="less">
.tools-container {
  position: fixed;
  top: 70%;
  right: 0;
}
</style>