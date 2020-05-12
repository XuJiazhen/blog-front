<template>
  <div class="article-content">
    <header>
      <h1>{{ article.title }}</h1>
      <div class="subheader">
        <span>{{ article.releasedAt | dateFromat('{y}.{m}.{d}') }}</span>
        <span>BY {{ article.author.toUpperCase() }} - </span>
        <span>LENGTH {{ article.content.length }}</span>
      </div>
      <img :src="article.coverUrl" />
    </header>
    <main class="content"
          v-html="articleContent" />
    <div class="info">
      版权信息：非商用-署名-自由转载
    </div>
    <comments :article-id="article._id" />
    <aside class="sidebar">
      <like-article :article-id="article._id"
                    :likes="article.likes"
                    ref="likeArticle" />
      <go-comment />
      <back-top />
    </aside>
  </div>
</template>

<script>
import marked from '~/plugins/marked'
import { getArticleById } from '~/api/article'
import Comments from '~/components/Comments'
import BackTop from '~/components/ArticleTools/BackTop.vue'
import LikeArticle from '~/components/ArticleTools/LikeArticle.vue'
import GoComment from '~/components/ArticleTools/GoComment.vue'
export default {
  components: {
    Comments,
    BackTop,
    GoComment,
    LikeArticle
  },
  asyncData ({ params, error }) {
    return getArticleById(params.id)
      .then(res => {
        return { article: res.data }
      })
      .catch(err => {
        error('Error')
      })
  },
  data () {
    return {
      article: {},
    }
  },
  mounted () {
    this.$refs.likeArticle.initCachedLikes(this.article._id)
  },
  filters: {
    dateFromat (val, dateFormat) {
      const date = new Date(val)
      const dateInfoObj = {
        y: date.getFullYear(),
        m: date.getMonth(),
        d: date.getDate()
      }
      const dateStr = dateFormat.replace(/{([ymd])+}/g, (ret, key) => {
        const val = dateInfoObj[key]
        return val.toString()
      })
      return dateStr
    }
  },
  computed: {
    articleContent () {
      return marked(this.article.content)
    }
  },
}
</script>

<style lang="less" scoped>
.article-content {
  header {
    text-align: center;
    h1 {
      margin: 1.25rem 0;
    }
    .subheader {
      user-select: none;
    }
    img {
      width: 100%;
      margin: 1.25rem 0;
    }
  }
  .info {
    text-align: right;
    // border-bottom: 1px solid #e6e6e6;
    padding: 0.625rem 0;
    user-select: none;
  }
  .sidebar {
    position: fixed;
    bottom: 20%;
    right: 0.625rem;
  }
}
</style>
<style lang="less">
.article-content {
  font-family: Helvetica, Tahoma, Arial, sans-serif;
  main.content {
    color: #24292e;
    cursor: default;
    .hljs-comment {
      color: #b3b3b3;
      font-style: normal;
      font-size: 12.5px;
    }
    p {
      // margin: 1.5rem 0;
      margin: 1rem 0;
      line-height: 1.8;
      code {
        color: #d19a66;
      }
    }
    a {
      color: #409eff;
      &:hover {
        text-decoration: underline;
      }
    }
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0.67em 0;
    }
    pre {
      font-size: 14px;
      overflow: hidden;
      // margin: 0.625rem 0;
      code {
        background-color: #f7f7f7;
        border: 1px solid #e6e6e6;
        padding: 1rem;
        width: 100%;
        height: 100%;
        float: left;
        line-height: 1.8;
        // overflow: scroll;
        overflow: auto;
      }
    }
    ul {
      margin: 1rem 0;
      list-style: inherit;
      li {
        line-height: 1.8;
        code {
          color: #d19a66;
        }
        p {
          margin: 0;
        }
      }
    }
  }
}
</style>