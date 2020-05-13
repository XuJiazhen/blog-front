<template>
  <div class="about-container">
    <div class="header">
      <div class="about">
        <div class="title">
          <span class="text">ABOUT BLOG</span>
        </div>
        <div class="about-blog">
          <p>
            <span>
              这里写了点欢迎词
              <img class="small"
                   src="https://static.xujiazhen.website/dog.webp">
            </span>
          </p>

          <p>
            <span>
              本博客系统还在开发中，并不是最终版本，目前完成了第一阶段，欢迎有缘人提交BUG哦 =>
              <a class="mail"
                 href="mailto:xu.159623@gmail.com">
                <i class="iconfont icon-mail"></i>
              </a>
            </span>
          </p>

          <p>
            简单介绍下搭建本博客使用的技术吧：
          </p>

          <dl>
            <dt>博客前端：</dt>
            <dd>
              <p><span class="bold">UI:</span> SRR(Nuxt.js) + Vue.js + ElementUI + Axios + Less</p>
            </dd>
            <dt>博客后端：</dt>
            <dd>
              <p><span class="bold">UI:</span> Vue CLI + Vue.js + Axios + ElementUI + Less</p>
              <p><span class="bold">SERVICE:</span> Nest.js + Node.js + MongoDB + Mongoose + JWT</p>
            </dd>
          </dl>

        </div>
        <div class="title">
          <span class="text">ABOUT ME</span>
        </div>
        <div class="about-me">
          <div class="info-list">
            <div class="info-title">be Simple</div>
            <div class="info-item"
                 v-for="(item, index) in infoList"
                 :key="index">
              <i class="icon iconfont"
                 :class="item.icon"></i>
              <span class="text"
                    v-if="item.text">{{ item.text }}</span>
              <template v-if="item.linkList">
                <span class="link">
                  <a href="/"
                     v-for="(link, index) in item.linkList"
                     :key="index">
                    <i class="iconfont"
                       :class="link"></i>
                  </a>
                </span>
              </template>

            </div>
          </div>
          <div class="gravatar">
            <img src="https://static.xujiazhen.website/Avatar_2.jpg"
                 alt="Gravatar">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      infoList: [
        {
          icon: 'icon-user',
          text: '临Lin | 胥佳桢 | 90后'
        },
        {
          icon: 'icon-like-2',
          text: 'Code & Read & Music & JoJo & Cook?'
        },
        {
          icon: 'icon-music',
          text: 'たまき こうじ, Rock, Popular'
        },
        {
          icon: 'icon-talk',
          text: '我绝对不换行'
        },
        {
          icon: 'icon-social',
          linkList: ['icon-github', 'icon-zhihu', 'icon-bilibili', 'icon-mail']
        },
      ]
    }
  },
}
</script>

<style lang="less" scoped>
.about-container {
  height: 100%;

  .about {
    margin-bottom: 2.5rem;
    .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 0.9375rem 0;
      position: relative;

      .text {
        color: #409eff;
        &::before,
        &::after {
          content: '';
          border-bottom: 1px solid #409eff;
          position: absolute;
          top: 50%;
          width: 40%;
        }
        &::before {
          left: 0;
        }
        &::after {
          right: 0;
        }
      }
    }

    .about-blog {
      padding: 1.875rem;
      line-height: 1.25rem;
      user-select: none;
      background-color: white;
      box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2) !important;
      p {
        margin: 0.625rem 0;
        .small {
          width: 1.25rem;
          height: 1.25rem;
          vertical-align: text-bottom;
        }
        .mail {
          vertical-align: text-bottom;
        }
        a {
          transition: all 0.2s;
          &:hover {
            color: #409eff;
          }
        }
      }
      dl {
        dd {
          margin: 0.625rem 0 0.625rem 1.875rem;
          .bold {
            font-weight: bold;
          }
        }
      }
    }
    .about-me {
      display: flex;
      justify-content: space-between;
      background-color: white;
      box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2) !important;
      @media screen and(min-width: 320px) and(max-width: 750px) {
        padding: 1.875rem;
      }

      .info-list {
        user-select: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 6.25rem;
        @media screen and(min-width: 320px) and(max-width: 750px) {
          margin: 0;
        }
        .info-title {
          font-weight: bold;
          font-size: 2.25rem;
          margin: 1.25rem 0 1.25rem 0;
          letter-spacing: 0.21875rem;
        }
        .info-item {
          margin: 0.5rem 0 0.5rem 1.25rem;
          height: 1.25rem;
          display: flex;
          align-items: center;
          font-size: 0.875rem;
          .icon {
            opacity: 0.5;
          }
          .text {
            margin-left: 0.9375rem;
          }
          .link {
            margin-left: 0.9375rem;
            display: flex;
            flex-direction: row;
            a {
              margin-right: 0.625rem;
              transition: all 0.2s;
              &:hover {
                color: #409eff;
              }
            }
          }
        }
      }
      .gravatar {
        width: 18.75rem;
        height: 18.75rem;
        @media screen and(min-width: 320px) and(max-width: 750px) {
          display: none;
        }
        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>