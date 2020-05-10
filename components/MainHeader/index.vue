<template>
  <el-row tag="header"
          class="main-header"
          type="flex"
          align="middle">
    <el-col tag="nav"
            :span="24"
            class="links">
      <nuxt-link to="/">Article</nuxt-link>
      <nuxt-link to="/">About</nuxt-link>
      <nuxt-link to="/">Life</nuxt-link>
    </el-col>
  </el-row>
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
  @media screen and(min-width: 320px) and(max-width: 799px) {
    padding: 0 0.9375rem;
  }
  .links {
    text-align: right;
    user-select: none;
    a {
      margin: 0 0.625rem;
      letter-spacing: 0.21875rem;
      transition: color 0.3s;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      font-size: 18px;
      font-weight: 200;
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>