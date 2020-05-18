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
    width: 1050px;
    margin: 4.6875rem auto 0 auto;

    @media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
      margin: 4.6875rem 0.9375rem 0 0.9375rem;
    }

    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
      margin: 4.6875rem 0.9375rem 0 0.9375rem;
    }
  }
  .main-footer {
    background-color: white;
  }
}
</style>
