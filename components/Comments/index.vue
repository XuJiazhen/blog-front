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
            :id="`comment-${item.id}`"
            :key="item.id">

          <div class="item-header">
            <span class="name">{{ item.author }}</span>
            <span class="date">{{ item.published_at | dateFormat('{y}.{m}.{d}') }}</span>
          </div>

          <div class="item-body">
            <p>{{ item.content }}</p>
            <template v-for="replyItem in item.replyList">
              <div class="replyMsgBox"
                   :key="replyItem.date">
                <p class="r-msg">{{ replyItem.content }}</p>
                <div class="r-footer">
                  <span class="name">{{ replyItem.author }} @ {{ replyItem.to }}</span>
                  <span class="date">{{ replyItem.date | dateFormat('{y}.{m}.{d}') }}</span>
                </div>
              </div>
            </template>

          </div>

          <div class="item-footer">
            <reply-mode :replyMode='openReplyMode'
                        :author="item.author"
                        :likes="item.likes"
                        :id="item.id"
                        @replyForm="handleReplyForm" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ReplyMode from './components/ReplyMode'
export default {
  name: 'Comments',
  components: {
    ReplyMode
  },
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
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat nihil tempora porro eveniet! Tempora iste dolore neque repellendus, quis quod sint excepturi cum repellat placeat atque vero minus voluptates praesentium.'
      },
      rules: {
        email: [{ validator: validateEmail }],
      },
      commentList: [],
      likes: [],
      openReplyMode: false,
    }
  },
  methods: {
    submitComment () {
      const commentInfo = {
        id: Date.now() * 1000 * 60,
        articleId: this.articleId,
        author: this.commentForm.author,
        email: this.commentForm.email,
        content: this.commentForm.content,
        likes: this.likes.length || 0,
        published_at: Date.now(),
        replyList: []
      }

      this.commentList.unshift(commentInfo)
    },
    handleReplyForm (replyForm) {
      this.commentList.map(item => {
        if (replyForm.toId === item.id) {
          item.replyList.push(replyForm)
        }
      })
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
        &:hover .item-footer a.reply {
          opacity: 0.8;
        }
        .item-header {
          display: flex;
          justify-content: space-between;
          background-color: #f7f7f7;
          border-bottom: 1px solid #dcdfe6;
          padding: 0.3125rem 0.9375rem;
          span {
            user-select: none;
          }
        }
        .item-body {
          padding: 1.25rem 0.9375rem;
          .replyMsgBox {
            margin: 1.25rem 0 0 1.25rem;
            border: 1px solid #dcdfe6;
            .r-msg {
              padding: 0.9375rem 0.625rem;
            }
            .r-footer {
              display: flex;
              justify-content: space-between;
              opacity: 0.8;
              color: #606266;
              font-size: 12px;
              user-select: none;
              padding: 0.1875rem 0.625rem;
              border-top: 1px solid #dcdfe6;
            }
          }
        }
        .item-footer {
          border-top: 1px solid #dcdfe6;
          padding: 0.3125rem 0.9375rem;
          font-size: 0.875rem;
        }
      }
    }
  }
}
</style>