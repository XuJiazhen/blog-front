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
    <comments></comments>
  </div>
</template>

<script>
import marked from '~/plugins/marked'
import { getArticleById } from '~/api/article'
import Comments from '~/Components/Comments'
export default {
  components: {
    Comments
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
  margin-bottom: 0.625rem;
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
}
</style>
<style lang="less">
.article-content {
  main.content {
    color: #24292e;
    cursor: default;
    p {
      margin: 1.5rem 0;
    }
    a {
      color: #409eff;
      &:hover {
        text-decoration: underline;
      }
    }
    pre {
      background-color: #f7f7f7;
      border: 1px solid #e6e6e6;
      margin: 1.5rem 0;
      overflow: auto;
      font-size: 14px;
      code {
        margin: 0;
        padding: 1rem;
        width: 100%;
        height: 100%;
        float: left;
        line-height: 1.8;
      }
    }
    ul {
      margin: 1.5rem 0;
      li {
        line-height: 1.5;
        padding: 0.3125rem;
      }
    }
  }
}
</style>