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
         @click.stop.prevent="handleLikes(id)"
         :class="{actived: checkCachedLike(id)}">
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
    likeComments: null
  },
  data () {
    return {
      isOpen: this.replyMode,
      content: '',
      isClicked: false,
      like: this.likes,
      cacheLikeComments: []
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
        id: this.isSub ? this.sId : this.id,
        data: {
          author: this.author,
          toAuthor: this.toAuthor,
          content: this.content,
          queryId: Math.floor(Date.now() * 1000 / 60),
          type: this.isSub ? 0 : 1,
          commentAt: Date.now()
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
    handleLikes (id) {
      if (this.isClicked) return false
      if (this.checkCachedLike(id)) return false

      this.like += 1

      const data = {
        id: this.id,
        sId: this.isSub ? this.sId : '',
        type: this.isSub ? 0 : 1
      }
      this.$store.dispatch('comment/submitLike', data).then(res => {
        this.$emit('cacheLikes', id)
      }).catch(err => {
        throw new Error(err)
      })
      this.isClicked = true
    },

    checkCachedLike (id) {
      return this.likeComments.includes(id)
    }
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
    &.actived {
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