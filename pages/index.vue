<template>
  <div class="article-box">
    <template v-for="(item, index) in articleList">
      <nuxt-link :to="`/article/${item._id}`"
                 :key="index">
        <article-item :coverUrl="item.coverUrl"
                      :title="item.title"
                      :summary="item.summary"
                      :date="item.releasedAt"
                      :likes="item.likes"
                      :cmts="item.cmts" />
      </nuxt-link>
    </template>
    <aside class="sidebar">
      <back-top />
    </aside>
  </div>
</template>

<script>
import ArticleItem from '../components/ArticleItem/index'
import { getAllArticles } from '../api/article'
import BackTop from '~/components/ArticleTools/BackTop.vue'
export default {
  name: 'Index',
  components: {
    ArticleItem,
    BackTop
  },
  asyncData ({ error }) {
    return getAllArticles()
      .then(res => {
        const { data } = res
        return { articleList: data }
      })
      .catch(err => {
        error('Error')
      })
  },
  data () {
    return {
      articleList: [],
    }
  },
  head () {
    return {
      title: 'HOME'
    }
  }
}
</script>
<style lang="less" scoped>
.article-box {
  .sidebar {
    position: fixed;
    bottom: 20%;
    right: 0.625rem;
  }
}
</style>
