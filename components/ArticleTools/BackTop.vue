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
  getScrollTop () {
    let scrollTop = 0
    let documentScrollTop = 0
    let bodyScrollTop = 0

    if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop
    }
    if (document.body) {
      bodyScrollTop = document.body.scrollTop
    }
    scrollTop = documentScrollTop ? documentScrollTop : bodyScrollTop
    return scrollTop
  },
  mounted () {
    function getScrollTop () {
      let scrollTop = 0
      let documentScrollTop = 0
      let bodyScrollTop = 0

      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop
      }
      if (document.body) {
        bodyScrollTop = document.body.scrollTop
      }
      scrollTop = documentScrollTop ? documentScrollTop : bodyScrollTop
      return scrollTop
    }
    window.addEventListener('scroll', (e) => {
      if (getScrollTop() > window.innerHeight) {
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