<template>
  <footer class="main-footer">
    <p>
      <span>&copy;{{ new Date().getFullYear() }}</span>
      <span>XuJiazhen</span>
    </p>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter'
}
</script>

<style lang="less" scoped>
.main-footer {
  border-top: 1px solid #e6e6e6;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 0.625rem;
  p {
    height: 1.5625rem;
    line-height: 1.5625rem;
    user-select: none;
  }
}
</style>