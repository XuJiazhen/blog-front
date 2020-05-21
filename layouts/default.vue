<template>
  <div class="app">
    <main-header />
    <div class="main-container">
      <aside class="aside-left">
        <div class="card-me">
          <div class="card-bg"></div>
          <img src="https://static.xujiazhen.website/image/large/Avatar_2.jpg"
               alt="avatar"
               class="avatar">
          <div class="info-me">
            <h3 class="name">临Lin</h3>
            <p class="bb">be Simple</p>
          </div>
          <div class="site-sta"></div>
        </div>
      </aside>
      <nuxt class="article" />
      <aside class="aside-right">
        <div class="notice">
          <p class="title">NOTICE</p>
          <p class="content">重构中...</p>
        </div>
        <div class="update-log">
          <p class="title">UPDATE LOG</p>
          <p class="content"></p>
        </div>
      </aside>
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

<style lang="less">
.app {
  overflow: hidden;
  .main-container {
    width: 1140px;
    margin: 4.6875rem auto 4.6875rem auto;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    position: relative;

    @media only screen and (min-device-width: 320px) and (max-device-width: 568px) {
      margin: 4.6875rem 0.9375rem 0 0.9375rem;
      width: initial;
    }

    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
      margin: 4.6875rem 0.9375rem 0 0.9375rem;
      width: initial;
    }

    .aside-left {
      border: 1px solid #e6e6e6;
      width: 200px;
      position: fixed;
      height: auto;

      .card-me {
        position: relative;
        overflow: hidden;
        user-select: none;
        &:hover .avatar {
          transform: rotate(360deg);
        }

        .card-bg {
          height: 6.25rem;
          width: 100%;
          background-color: #e6e6e6;
        }
        .avatar {
          width: 6rem;
          height: 6rem;
          border-radius: 50%;
          border: 4px solid hsla(0, 0%, 100%, 0.4);
          margin: -2.5rem auto 0 auto;
          object-fit: cover;
          display: block;
          transition: all 0.3s;
        }
        .info-me {
          margin: 0.625rem 0;
          text-align: center;
          .bb {
            padding: 0.625rem;
            font-size: 18px;
            letter-spacing: 0.21875rem;
            font-weight: 200;
          }
        }
      }
    }
    .article {
      margin-left: 215px;
      margin-right: 15px;
      width: 770px;
    }
    .aside-right {
      width: 270px;
      margin-bottom: 2.5rem;
      display: flex;
      flex-flow: column nowrap;

      @media screen and(min-width: 320px) and(max-width: 799px) {
        display: none;
      }

      .notice {
        background-color: white;
        border: 1px solid #e6e6e6;

        user-select: none;

        .title {
          font-weight: bold;
          user-select: none;
          padding: 0.625rem;
          &::before {
            content: '';
            border-left: 10px solid #409eff;
            margin-right: 0.625rem;
          }
        }
        .content {
          padding: 0.625rem;
          font-size: 14px;
          letter-spacing: 2px;
        }
      }
      .update-log {
        margin-top: 0.625rem;
        background-color: white;
        padding: 0.625rem;
        // box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2) !important;
        border: 1px solid #e6e6e6;
        .title {
          font-weight: bold;
          user-select: none;
          padding: 0.625rem;
          &::before {
            content: '';
            border-left: 10px solid #409eff;
            margin-right: 0.625rem;
          }
        }
      }
    }
  }
  .main-footer {
    background-color: white;
  }
}
</style>
