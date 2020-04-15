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
                      placeholder="昵称"
                      v-model="commentsForm.nickname" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="email">
            <el-input maxlength="40"
                      placeholder="邮箱"
                      v-model="commentsForm.email" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
        nickname: '',
        email: '',
        content: ''
      },
      rules: {
        email: [{ validator: validateEmail }],
      }
    }
  },
}
</script>

<style lang="less">
.comments-container {
  margin: 1.875rem 0;
  .el-form {
    .el-form-item {
      margin: 0;
      input {
        border-top: none;
        border-left: none;
        border-right: none;
        border-radius: 0;
      }
    }
  }
}
</style>