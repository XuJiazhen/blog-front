<template>
  <div class="article-box">
    <div class="main">
      <div class="article-list">
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
      </div>

      <aside class="aside-box">
        <div class="notice">
          <p class="title">NOTICE</p>
          <p class="content">重构中...</p>
        </div>
        <div class="calendar">
          <el-calendar></el-calendar>
        </div>
        <div class="update-log">
          <p class="title">UPDATE LOG</p>
          <p class="content"></p>
        </div>
      </aside>
    </div>

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
<style lang="less">
.article-box {
  .main {
    display: flex;
    justify-content: space-between;
    .article-list {
      width: 75%;
    }
    .aside-box {
      width: 25%;
      margin-left: 0.9375rem;
      margin-bottom: 2.5rem;
      display: flex;
      flex-flow: column nowrap;

      .notice {
        background-color: white;
        box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2) !important;
        user-select: none;

        .title {
          font-weight: bold;
          user-select: none;
          padding: 0.625rem;
          &::before {
            content: '';
            border-left: 10px solid #409eff;
            margin-right: 0.625rem;
          }
        }
        .content {
          padding: 0.625rem;
          font-size: 14px;
          letter-spacing: 2px;
        }
      }

      .calendar {
        margin-top: 0.625rem;
        background-color: white;
        padding: 0.625rem;
        box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2) !important;

        .el-calendar {
          .el-calendar__header {
            padding: 0;
            font-size: 14px;
            border-bottom: none;
            .el-calendar__title {
              user-select: none;
            }
            .el-calendar__button-group {
              .el-button-group {
                display: flex;
                flex-flow: column nowrap;
                button {
                  &:nth-child(2) {
                    margin: 5px 0;
                  }
                }
              }
            }
          }

          .el-calendar__body {
            padding: 0;
            .el-calendar-table__row {
              .el-calendar-day {
                height: inherit;
              }
            }
          }
        }
      }
      .update-log {
        margin-top: 0.625rem;
        background-color: white;
        padding: 0.625rem;
        box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2) !important;
        .title {
          font-weight: bold;
          user-select: none;
          padding: 0.625rem;
          &::before {
            content: '';
            border-left: 10px solid #409eff;
            margin-right: 0.625rem;
          }
        }
      }
    }
  }
  .sidebar {
    position: fixed;
    bottom: 20%;
    right: 0.625rem;
  }
}
</style>
