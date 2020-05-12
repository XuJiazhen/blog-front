<template>
  <div class="gocmt"
       @click="handleScroll">
    <i class="iconfont icon-cmt"></i>
    <div class="count">{{ this.$store.state.comment.data.length }}</div>
  </div>
</template>

<script>
export default {
  name: 'GoComment',
  methods: {
    handleScroll () {
      const ele = document.querySelector('#comments-container')
      const scrollY = window.pageYOffset
      const eleY = ele.getBoundingClientRect().top
      const endPosition = scrollY + eleY

      // +new Date() 隐式类型转换，日期 => 数字（时间戳）
      const startTime = +new Date()
      const duration = 150

      function run () {
        // 每一帧的时间
        const time = +new Date() - startTime

        // time / duration 表示滚动 150ms 需要多少帧
        // 以及每一帧在 Y 轴上滚动多少距离
        window.scrollTo(0, scrollY + eleY * (time / duration))
        run.timer = requestAnimationFrame(run)

        // 时间到了则表示滚动到了目标位置，取消动画
        if (time >= duration) {
          window.scrollTo(0, endPosition)
          cancelAnimationFrame(run.timer)
        }
      }

      requestAnimationFrame(run)
    }
  },
}
</script>