<template>
  <div class="reply-mode"
       :class="isOpen ? 'open' : ''">
    <template v-if="isOpen">
      <el-input :placeholder="`@${author}`"></el-input>
      <el-button plain
                 size="mini"
                 @click="handleReplyTo">Reply</el-button>
    </template>
    <template v-else>
      <a href=""
         class="zan">
        <i class="iconfont icon-zan"></i>
        <span class="zan-count">({{ likes }})</span>
      </a>
      <a href=""
         class="reply"
         @click.stop.prevent="handleReply">
        <i class="iconfont icon-reply"></i>
      </a>
    </template>
  </div>
</template>

<script>
export default {
  name: 'replyMode',
  props: {
    openreplyMode: {
      type: Boolean,
      default: false
    },
    author: {
      type: String,
      default: ''
    },
    likes: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isOpen: this.openreplyMode
    }
  },
  methods: {
    handleReply () {
      this.isOpen = !this.isOpen
    },
    handleReplyTo () {
      this.isOpen = false
    }
  },
}
</script>

<style lang='less'>
@keyframes test {
  form {
    opacity: 0;
  }
  to {
    opacity: 0.8;
  }
}
.reply-mode {
  display: flex;
  justify-content: space-between;
  &.open {
    padding: 0;
    input,
    button {
      border: none;
      border-radius: 0;
    }
    input {
      padding: 0;
    }
    button {
      padding: 0;
    }
  }
  a {
    opacity: 0.8;
    color: #606266;
    transition: all 0.2s;
    &:hover {
      color: #409eff;
    }
    &.reply {
      opacity: 0;
    }
  }
}
</style>