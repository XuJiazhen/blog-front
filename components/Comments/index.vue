<template>
  <div class="comments-container"
       id="comments-container">
    <el-form :model="commentForm"
             ref="commentForm"
             class="comments-form">

      <el-row>
        <template v-if="userInfoCacheMode">
          <div class="userMode">
            <template v-if="isEdit">

              <el-input v-model="commentForm.author" />

              <el-input v-model="commentForm.email" />

              <el-button class="save"
                         plain
                         size="mini"
                         @click="saveUserInfo">Save</el-button>

            </template>
            <template v-else>
              <div class="user">
                Hello, <span class="author">{{ commentForm.author }}</span>
              </div>
              <div class="btns">
                <el-button class="edit"
                           plain
                           size="mini"
                           @click="editUserInfo">
                  Edit
                </el-button>
                <el-button class="logout"
                           plain
                           size="mini"
                           @click="logout">
                  Logout
                </el-button>

              </div>
            </template>
          </div>
        </template>
        <template v-else>
          <el-col :span="12">
            <el-form-item prop="author">
              <el-input maxlength="12"
                        placeholder="Name"
                        v-model="commentForm.author" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item prop="email">
              <el-input maxlength="40"
                        placeholder="Email"
                        v-model="commentForm.email" />
            </el-form-item>
          </el-col>
        </template>
      </el-row>

      <el-form-item prop="content">
        <el-input placeholder="Your comments goes here."
                  v-model="commentForm.content"
                  type="textarea"
                  resize="none" />
      </el-form-item>

      <el-form-item class="btns">
        <el-button plain
                   size="mini"
                   @click="submitComment"
                   :loading="loading">Publish</el-button>
      </el-form-item>
    </el-form>
    <div class="comments-list-box">
      <ul class="list">
        <li class="item"
            v-for="item in comment"
            :id="`comment-${item._id}`"
            :key="item._id">

          <div class="item-header">
            <span class="name">{{ item.author }}</span>
            <span class="date">{{ item.publishedAt | dateFormat('{y}.{m}.{d}') }}</span>
          </div>

          <div class="item-body">
            <p>{{ item.content }}</p>
            <template v-for="replyItem in item.replyList.data">
              <div class="replyList"
                   :key="replyItem.selfId">
                <div class="reply-header">
                  <span class="name">{{ replyItem.author }} @ {{ replyItem.toAuthor }}</span>
                  <span class="date">{{ replyItem.commentAt | dateFormat('{y}.{m}.{d}') }}</span>
                </div>
                <p class="reply-content">{{ replyItem.content }}</p>
                <div class="reply-footer">
                  <reply-mode :replyMode='openReplyMode'
                              :isSub="true"
                              :sId="item._id"
                              :id="replyItem._id"
                              :author="commentForm.author"
                              :toAuthor="replyItem.author"
                              :likes="replyItem.likes"
                              @replyForm="handleReplyForm"
                              @cacheLikes="handleCacheLike"
                              :likeComments="likeComments" />
                </div>
              </div>
            </template>

          </div>
          <div class="item-footer">
            <reply-mode :replyMode='openReplyMode'
                        :isSub="false"
                        :id="item._id"
                        :author="commentForm.author"
                        :toAuthor="item.author"
                        :likes="item.likes"
                        @replyForm="handleReplyForm"
                        @cacheLikes="handleCacheLike"
                        :likeComments="likeComments" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ReplyMode from './components/ReplyMode'
import { updateComment } from '~/api/comment'
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
    return {
      commentForm: {
        author: '',
        email: 'xu.159623@gmail.com',
        content: ''
      },
      likes: [],
      openReplyMode: false,
      regexp: {
        email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
      },
      userInfoCacheMode: false,
      cacheUserInfo: false,
      isEdit: false,
      loading: false,
      likeComments: []
    }
  },
  mounted () {
    this.initUser()

    this.$store.dispatch('comment/getCommentsByArticleID', this.articleId)
  },
  computed: {
    comment () {
      return this.$store.state.comment.data
    },
  },
  methods: {
    async submitComment () {
      const comment = {
        articleId: this.articleId,
        author: this.commentForm.author,
        email: this.commentForm.email,
        content: this.commentForm.content,
        publishedAt: Date.now(),
        replyList: {
          id: '',
          data: []
        }
      }

      if (this.checkForm()) {
        this.loading = true
        await this.$store.dispatch('comment/createComment', comment)
        this.commentForm.content = ''
        this.loading = false
      }
    },
    async handleReplyForm (replyForm) {
      await this.$store.dispatch('comment/updateComment', replyForm)
    },
    checkForm () {
      if (!this.commentForm.author) {
        this.$message({
          message: 'Name should not be empty.',
          type: 'warning'
        })
        return false
      }

      if (!this.regexp.email.test(this.commentForm.email)) {
        this.$message({
          message: 'Email is incorrect.',
          type: 'warning'
        })
        return false
      }

      if (!this.commentForm.content) {
        this.$message({
          message: 'Say something.',
          type: 'warning'
        })
        return false
      }

      this.saveUserInfo()
      this.userInfoCacheMode = true
      return true
    },
    initUser () {
      const userInfo = localStorage.getItem('UserInfo')
      const UserLikes = localStorage.getItem('UserLikes')
      if (userInfo) {
        this.userInfoCacheMode = true
        this.commentForm = JSON.parse(localStorage.getItem('UserInfo'))
      }
      if (UserLikes) {
        this.likeComments = JSON.parse(localStorage.getItem('UserLikes'))
      }
    },
    handleCacheLike (id) {
      if (this.likeComments.includes(id)) return false
      this.likeComments.push(id)
      localStorage.setItem('UserLikes', JSON.stringify(this.likeComments))
    },
    editUserInfo () {
      this.isEdit = true
    },
    saveUserInfo () {
      const userInfo = {
        author: this.commentForm.author,
        email: this.commentForm.email
      }
      localStorage.clear('UserInfo')
      localStorage.setItem('UserInfo', JSON.stringify(userInfo))
      this.isEdit = false
    },
    logout () {
      this.userInfoCacheMode = false
      localStorage.clear('UserInfo')
      localStorage.clear('UserLikes')
      this.commentForm.author = ''
      this.commentForm.email = ''
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
    @media screen and(min-width: 320px) and(max-width: 750px) {
      padding: 0;
    }
    @media screen and(min-width: 768px) and(max-width: 768px) {
      padding: 0 2rem;
    }
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
          padding: 0.625rem 0.9375rem;
        }
      }
      &.btns {
        text-align: right;
        button {
          border-radius: 0;
          transition: all 0.2s;
          &:hover {
            border-color: #409eff;
            color: #409eff;
          }
        }
      }
    }
    .userMode {
      height: 30px;
      box-sizing: content-box;
      display: flex;
      align-items: center;
      background-color: #f7f7f7;
      padding: 0.3125rem 1rem;
      justify-content: space-between;
      @media screen and(min-width: 320px) and(max-width: 414px) {
        padding-left: 0.625rem;
        padding-right: 0.625rem;
      }
      .user {
        user-select: none;
        .author {
          color: #3a8ee6;
          font-weight: bold;
        }
      }
      .btns {
        display: table;
        button {
          margin: 0;
          border-radius: 0;
          transition: all 0.2s;
          border: none;
          &:hover {
            color: #409eff;
          }
          @media screen and(min-width: 320px) and(max-width: 414px) {
            padding-left: 0.625rem;
            padding-right: 0.625rem;
          }
        }
        .edit {
          border-right: 1px solid #dcdfe6;
        }
      }
      input {
        border: none;
        border-radius: 0;
        background-color: #f7f7f7;
        padding: 0;
        height: 30px;
      }
      .save {
        border: none;
        border-radius: 0;
      }
    }
  }
  .comments-list-box {
    margin-top: 1.875rem;
    padding: 0 3rem;
    @media screen and(min-width: 320px) and(max-width: 750px) {
      padding: 0;
    }
    @media screen and(min-width: 768px) and(max-width: 768px) {
      padding: 0 2rem;
    }

    .list {
      padding: 0;
      .item {
        border: 1px solid #dcdfe6;

        margin-top: 0.9375rem;
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
          background-color: white;

          .replyList {
            margin: 1.5625rem 0 0 1.5625rem;
            border: 1px solid #dcdfe6;
            &:hover a.reply {
              opacity: 0.8;
            }
            .reply-header {
              display: flex;
              justify-content: space-between;
              opacity: 0.8;
              color: #606266;
              font-size: 12px;
              user-select: none;
              padding: 0.3125rem 0.625rem;
            }
            .reply-content {
              padding: 0.9375rem 0.625rem;
            }
            .reply-footer {
              padding: 0.3125rem 0.625rem;
              font-size: 0.875rem;
              opacity: 0.8;
              color: #606266;
              font-size: 12px;
            }
          }
        }
        .item-footer {
          background-color: white;
          padding: 0.3125rem 0.9375rem;
          font-size: 0.875rem;
          &:hover a.reply {
            opacity: 0.8;
          }
        }
      }
    }
  }
}
</style>