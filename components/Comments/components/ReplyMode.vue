<template>
  <div class="reply-mode"
       :class="isOpen ? 'open' : ''">
    <template v-if="isOpen">
      <el-input :placeholder="`@${toAuthor}`"
                v-model="content"
                @keyup.native.enter="handleReplyTo"></el-input>
      <el-button plain
                 size="mini"
                 @click="handleReplyTo">Reply</el-button>
    </template>
    <template v-else>
      <a href=""
         class="zan"
         @click.stop.prevent="handleLikes"
         :class="isClicked ? 'changed-color' : ''">
        <i class="iconfont icon-zan"></i>
        <span class="zan-count">({{ like }})</span>
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
    id: String,
    sId: String,
    replyMode: {
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
    },
    toAuthor: {
      type: String,
      default: ''
    },
    date: {
      type: [Date, Number],
      default: Date.now()
    },
    isSub: Boolean,
  },
  data () {
    return {
      isOpen: this.replyMode,
      content: '',
      isClicked: false,
      like: this.likes,
      userLikes: []
    }
  },
  methods: {
    handleReply () {
      this.isOpen = !this.isOpen
    },
    handleReplyTo () {
      if (!this.content) {
        this.isOpen = false
        return false
      }
      const replyForm = {
        id: this.id,
        data: {
          author: this.author,
          toAuthor: this.toAuthor,
          content: this.content,
          queryId: Date.now() * 1000 / 60
        }
      }
      this.$emit('replyForm', replyForm)
      this.content = ''
      this.isOpen = false
    },
    handleEnter () {
      this.showDate = false
    },
    handleLeave () {
      this.showDate = true
    },
    handleLikes () {
      if (this.isClicked) {
        return false
      }
      this.like += 1

      const data = {
        id: this.id,
        sId: this.isSub ? this.sId : '',
        type: this.isSub ? 0 : 1
      }
      this.$store.dispatch('comment/submitLike', data)
      this.isClicked = true
    },
  }
}
</script>

<style lang='less'>
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
    &.changed-color {
      color: #409eff;
    }
    &:hover {
      color: #409eff;
    }
    &.reply {
      opacity: 0;
    }
  }
}
</style>