<template>
  <div class="article-box">
    <template v-for="(item, index) in articleList">
      <nuxt-link :to="`/article/${item._id}`"
                 :key="index">
        <article-item :coverUrl="item.coverUrl"
                      :title="item.title"
                      :summary="item.summary"
                      :date="item.releasedAt" />
      </nuxt-link>
    </template>
  </div>
</template>

<script>
import ArticleItem from '../components/ArticleItem/index'
import { getAllArticles } from '../api/article'
export default {
  name: 'Index',
  components: {
    ArticleItem
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
      articleList: []
    }
  }
}
</script>
<style lang="less" scoped></style>
