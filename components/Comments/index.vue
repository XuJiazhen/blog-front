<template>
  <div class="comments-container">
    <el-form :model="commentForm"
             :rules="rules"
             ref="commentForm"
             class="comments-form">

      <el-row>
        <el-col :span="12">
          <el-form-item prop="author">
            <el-input maxlength="12"
                      placeholder="Your Nickname"
                      v-model="commentForm.author" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="email">
            <el-input maxlength="40"
                      placeholder="Your Email Address"
                      v-model="commentForm.email" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item prop="content">
        <el-input placeholder="Try to say something here?"
                  v-model="commentForm.content"
                  type="textarea"
                  resize="none" />
      </el-form-item>

      <el-form-item class="btns">
        <el-button plain
                   size="mini"
                   @click="submitComment">Publish</el-button>
      </el-form-item>
    </el-form>
    <div class="comments-list-box">
      <ul class="list">
        <li class="item"
            v-for="item in commentList"
            :key="item.id">
          <div class="item-header">
            <span class="name">{{ item.author }}</span>
            <span class="date">{{ item.published_at | dateFormat('{y}.{m}.{d}') }}</span>
          </div>

          <div class="item-body">{{ item.content }}</div>

          <div class="item-footer"
               :class="isReplay? 'replayMode' : ''">
            <template v-if="isReplay">
              <el-input :placeholder="`@${item.author}`"
                        v-model="commentReplayList"></el-input>
              <el-button plain
                         size="mini"
                         @click="handleReplaySomeone">Replay</el-button>
            </template>
            <template v-else>
              <a href=""
                 class="zan">
                <i class="iconfont icon-zan"></i>
                <span class="zan-count">({{ item.likes }})</span>
              </a>
              <a href=""
                 class="replay"
                 @click.stop.prevent="handleReplay">
                <i class="iconfont icon-replay"></i>
              </a>
            </template>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comments',
  props: {
    articleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    const validateEmail = (rule, val, callback) => {
      const reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
      if (val && !reg.test(val)) {
        return callback(new Error('请输入正确的邮箱地址'))
      }
    }
    return {
      commentForm: {
        author: 'XuJiazhen',
        email: 'jzxu.159623@163.com',
        content: 'Hello World!'
      },
      rules: {
        email: [{ validator: validateEmail }],
      },
      commentList: [],
      likes: [],
      isReplay: false,
      commentReplayList: ''
    }
  },
  methods: {
    submitComment () {
      const commentInfo = {
        userId: Date.now() * 1000 * 60,
        articleId: this.articleId,
        author: this.commentForm.author,
        email: this.commentForm.email,
        content: this.commentForm.content,
        likes: this.likes.length || 0,
        published_at: Date.now()
      }

      this.commentList.unshift(commentInfo)
    },
    handleReplay () {
      this.isReplay = !this.isReplay
    },
    handleReplaySomeone () {
      this.isReplay = false
    }
  },
  filters: {
    dateFormat (val, dateFormat) {
      const date = new Date(val)
      const dateInfoObj = {
        y: date.getFullYear(),
        m: date.getMonth(),
        d: date.getDate()
      }
      const dateStr = dateFormat.replace(/{([ymd])+}/g, (ret, key) => {
        const val = dateInfoObj[key]
        return val.toString()
      })
      return dateStr
    }
  }
}
</script>

<style lang="less">
.comments-container {
  margin: 1.875rem 0;
  .el-form {
    padding: 0 3rem;
    .el-form-item {
      margin: 0;
      input {
        border-top: none;
        border-left: none;
        border-right: none;
        border-radius: 0;
      }
      .el-textarea {
        margin-top: 1.25rem;
        textarea {
          border-radius: 0;
          min-height: 6rem !important;
          max-height: 10rem !important;
        }
      }
      &.btns {
        text-align: right;
        button {
          border-radius: 0;
          transition: all 0.2s;
        }
      }
    }
  }
  .comments-list-box {
    margin-top: 1.875rem;
    padding: 0 3rem;
    .list {
      padding: 0;
      .item {
        border: 1px solid #dcdfe6;

        margin-top: 0.9375rem;
        &:hover .item-footer a.replay {
          opacity: 1;
        }
        .item-header {
          display: flex;
          justify-content: space-between;
          background-color: #f7f7f7;
          border-bottom: 1px solid #dcdfe6;
          padding: 0.625rem 0.9375rem;
          span {
            user-select: none;
          }
        }
        .item-body {
          padding: 1.25rem 0.9375rem;
        }
        .item-footer {
          border-top: 1px solid #dcdfe6;
          padding: 0.3125rem 0.9375rem;
          font-size: 0.875rem;
          display: flex;
          justify-content: space-between;
          &.replayMode {
            padding: 0;
            input,
            button {
              border: none;
              border-radius: 0;
            }
          }
          a {
            opacity: 0.8;
            color: #606266;
            transition: all 0.2s;
            &:hover {
              color: #409eff;
            }
            &.replay {
              opacity: 0;
            }
          }
        }
      }
    }
  }
}
</style>