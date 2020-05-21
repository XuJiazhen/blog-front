<template>
  <div class="main-header">
    <img src="https://static.xujiazhen.website/image/large/site-logo.jpg"
         class="logo">
  </div>
</template>

<script>
export default {
  name: 'MainHeader'
}
</script>

<style lang="less" scoped>
.main-header {
  width: 100%;
  height: 3.75rem;
  position: fixed;
  top: 0;
  box-sizing: border-box;
  border-bottom: 1px solid #e6e6e6;
  padding: 0 2.5rem;
  z-index: 999;
  background-color: #fff;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  @media screen and(min-width: 320px) and(max-width: 799px) {
    padding: 0 0.9375rem;
  }
  .logo {
    height: 100%;
  }
}
</style>