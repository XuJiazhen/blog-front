<template>
  <div class="app">
    <main-header />

    <div class="main-container">
      <nuxt />
    </div>

    <main-footer />
  </div>
</template>

<script>
import MainHeader from '../components/MainHeader/index'
import MainFooter from '../components/MainFooter/index'
export default {
  components: {
    MainHeader,
    MainFooter
  }
}
</script>

<style lang="less" scoped>
.app {
  .main-container {
    margin: 4.6875rem 18.5rem 0 18.5rem;
  }
}
</style>
