<template>
  <div class="gocmt"
       @click="handleScroll">
    <i class="iconfont icon-cmt"></i>
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
        const time = +new Date() - startTime
        console.log(time);

        window.scrollTo(0, scrollY + eleY * (time / duration))
        run.timer = requestAnimationFrame(run)

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