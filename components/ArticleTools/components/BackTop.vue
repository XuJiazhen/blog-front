<template>
  <div class="backtop"
       :class="[showIcon ? 'show' : 'hide']"
       @click="handleScroll">
    <i class="el-icon-caret-top"></i>
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  data () {
    return {
      showIcon: false
    }
  },
  methods: {
    handleScroll () {
      let timer = null
      cancelAnimationFrame(timer)
      timer = requestAnimationFrame(function frame () {
        let toTop = document.body.scrollTop || document.documentElement.scrollTop
        if (toTop > 0) {
          document.body.scrollTop = document.documentElement.scrollTop = toTop - 150
          timer = requestAnimationFrame(frame)
        } else {
          cancelAnimationFrame(timer)
        }
      })
    }
  },
  mounted () {
    window.addEventListener('scroll', (e) => {
      if (document.documentElement.scrollTop > window.innerHeight) {
        this.showIcon = true
      } else {
        this.showIcon = false
      }
    })
  },
}
</script>

<style lang="less" scoped>
.backtop {
  transition: all 0.2s;
  &.show {
    opacity: 0.5;
  }
  &.hide {
    opacity: 0;
  }
}
</style>