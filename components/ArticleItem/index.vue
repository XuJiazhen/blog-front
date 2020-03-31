<template>
  <div
    class="article-item"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <el-row>
      <img :src="coverUrl" :class="{ contrast: showInfo }" />
      <p class="summary" v-if="showInfo">{{ summary }}</p>
    </el-row>
    <el-row>
      <transition mode="out-in" name="fade">
        <div v-if="showInfo" class="info" key="info">
          <span>{{ date | dateFormat('{y}.{m}.{d}') }}</span>
        </div>
        <div v-else class="title" key="title">{{ title }}</div>
      </transition>
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
    date: String
  },
  data() {
    return {
      showInfo: false
    }
  },
  methods: {
    handleMouseEnter() {
      this.showInfo = true
    },
    handleMouseLeave() {
      this.showInfo = false
    }
  },
  filters: {
    dateFormat(val, dateFormat) {
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
  }
}
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.article-item {
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  margin-bottom: 2.5rem;

  img {
    width: 100%;
    height: 20rem;
    object-fit: cover;
    transition: filter 0.3s;
  }
  .contrast {
    filter: contrast(50%);
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
  .title,
  .info {
    user-select: none;
    padding: 0.625rem;
  }
}
</style>
