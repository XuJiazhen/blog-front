<template>
  <div class="article-item"
       @mouseenter="handleMouseEnter"
       @mouseleave="handleMouseLeave">
    <el-row class="header">
      <span class="title">{{ title }}</span>
    </el-row>
    <el-row class="main">
      <img :src="coverUrl"
           :class="{ contrast: showInfo }" />
      <p class="summary"
         v-if="showInfo">{{ summary }}</p>
    </el-row>
    <el-row class="footer">

      <div class="info"
           key="info">
        <span class="date">
          <i class="iconfont icon-clock"></i>
          <span>{{ date | dateFormat('{y}/{m}/{d} {h}') }}</span>
        </span>
        <span class="likes">
          <i class="iconfont icon-like-1"></i>
          <span class="count">{{ likes }}</span>
        </span>
        <span class="cmts">
          <i class="iconfont icon-cmt-1"></i>
          <span class="count">{{ cmts }}</span>
        </span>

      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    coverUrl: String,
    title: String,
    summary: String,
    date: String,
    likes: Number,
    cmts: Number
  },
  data () {
    return {
      showInfo: false
    }
  },
  methods: {
    handleMouseEnter () {
      this.showInfo = true
    },
    handleMouseLeave () {
      this.showInfo = false
    }
  },
  filters: {
    dateFormat (val, dateFormat) {
      const date = new Date(val)
      const dateInfoObj = {
        y: date.getFullYear(),
        m: date.getMonth(),
        d: date.getDate(),
        h: date.getHours()
      }
      const dateStr = dateFormat.replace(/{([ymdh])+}/g, (ret, key) => {
        const val = dateInfoObj[key]

        if (key === 'h') {
          const num = dateInfoObj[key]
          if (num <= 6) {
            return '凌晨'
          }

          if (num > 6 && num <= 12) {
            return '上午'
          }

          if (num > 12 && num <= 18) {
            return '下午'
          }

          if (num > 18 && num <= 24) {
            return '晚上'
          }
        }

        return val.toString()
      })
      return dateStr
    }
  }
}
</script>

<style lang="less" scoped>
// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 0.3s;
// }
// .fade-enter,
// .fade-leave-to {
//   opacity: 0;
// }
.article-item {
  box-sizing: border-box;
  margin-bottom: 2.5rem;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2) !important;
  .header {
    text-align: left;
    font-weight: bold;
    user-select: none;
    padding: 0.625rem;
  }
  .main {
    img {
      width: 100%;
      height: 20rem;
      object-fit: cover;
      width: 100%;
      transition: filter 0.3s;
    }
  }

  .contrast {
    filter: contrast(30%);
    cursor: pointer;
  }
  .summary {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    user-select: none;
    cursor: pointer;
  }
  .footer {
    display: flex;
    user-select: none;
    padding: 0.3125rem 0;
    flex-flow: row nowrap;
    justify-content: space-between;
    color: #555;
    font-size: 0.875rem;
    .info {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      span {
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
