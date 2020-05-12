<template>
  <div class="like-article"
       :class="{actived:isExist}"
       @click="handleLike(articleId)">
    <i class="iconfont icon-like"></i>
    <div class="count">{{like}}</div>
  </div>
</template>

<script>
export default {
  name: 'LikeArticle',
  props: {
    articleId: {
      type: [String, Number],
      required: true
    },
    likes: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      articleLikes: [],
      like: this.likes,
      isClicked: false,
      isExist: false
    }
  },
  methods: {
    handleLike (id) {
      if (this.isClicked) return false
      if (this.checkCachedLikes(id)) return false
      this.$store.dispatch('article/submitLike', id).then(res => {
        this.like += 1
        this.isExist = true
      })
      this.isClicked = true
    },
    initCachedLikes (id) {
      const articleLikes = JSON.parse(localStorage.getItem('ArticleLikes'))

      if (articleLikes) {
        if (articleLikes.includes(id)) {
          this.isExist = true
          this.articleLikes = articleLikes
        }
      }
    },
    checkCachedLikes (id) {
      return this.articleLikes.includes(id)
    }
  },
}
</script>

<style lang="less">
.like-article {
  &.actived {
    color: rgb(211, 56, 28);
    border-color: rgb(211, 56, 28);
    opacity: 1;
  }
  &.clicked {
    color: rgb(211, 56, 28);
    border-color: rgb(211, 56, 28);
    opacity: 1;
  }
}
</style>