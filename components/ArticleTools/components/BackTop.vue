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
      const el = document.querySelector('html')

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
    },

  },
  mounted () {
    window.addEventListener('scroll', (e) => {
      if (document.documentElement.scrollTop > window.innerHeight) {
        this.showIcon = true
      } else {
        this.showIcon = false
      }
    }, { passive: false })
  },
}
</script>

<style lang="less" scoped>
.backtop {
  transition: all 0.2s;
  &.show {
    opacity: 0.5;
  }
  &.show:hover {
    opacity: 1;
  }
  &.hide {
    opacity: 0;
  }
}
</style>