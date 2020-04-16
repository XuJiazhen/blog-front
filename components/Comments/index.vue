<template>
  <div class="comments-container">
    <el-form :model="commentsForm"
             :rules="rules"
             ref="commentsForm"
             class="comments-form">

      <el-row>
        <el-col :span="12">
          <el-form-item prop="nickname">
            <el-input maxlength="12"
                      placeholder="Your Nickname"
                      v-model="commentsForm.nickname" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="email">
            <el-input maxlength="40"
                      placeholder="Your Email Address"
                      v-model="commentsForm.email" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item prop="content">
        <el-input maxlength="100"
                  placeholder="Try to say something here?"
                  v-model="commentsForm.content"
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
            v-for="item in data"
            :key="item.id">
          <div class="item-header">
            <span class="name">{{ item.nickname }}</span>
            <span class="date">{{ item.date | dateFormat('{y}.{m}.{d}') }}</span>
          </div>
          <div class="item-body">{{ item.content }}}</div>
          <div class="item-footer">
            <a href=""
               class="zan">
              <i class="iconfont icon-zan"></i>
              <span class="zan-count">(1)</span>
            </a>
            <a href=""
               class="replay">
              <i class="iconfont icon-replay"></i>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comments',
  data () {
    const validateEmail = (rule, val, callback) => {
      const reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
      if (val && !reg.test(val)) {
        return callback(new Error('请输入正确的邮箱地址'))
      }
    }
    return {
      commentsForm: {
        nickname: 'XuJiazhen',
        email: 'jzxu@163.com',
        content: 'Hello World!'
      },
      rules: {
        email: [{ validator: validateEmail }],
      },
      data: []
    }
  },
  methods: {
    submitComment () {
      const comment = {
        nickname: this.commentsForm.nickname,
        email: this.commentsForm.email,
        content: this.commentsForm.content,
        date: Date.now(),
        id: Date.now() * 1000 * 60
      }
      this.data.push(comment)
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
          padding: 1.875rem 0.9375rem;
        }
        .item-footer {
          border-top: 1px solid #dcdfe6;
          padding: 0.3125rem 0.9375rem;
          font-size: 0.875rem;
          display: flex;
          justify-content: space-between;
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