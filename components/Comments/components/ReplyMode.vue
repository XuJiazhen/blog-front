<template>
  <div class="reply-mode"
       :class="isOpen ? 'open' : ''">
    <template v-if="isOpen">
      <el-input :placeholder="`@${author}`"
                v-model="content"
                @keyup.native.enter="handleReplyTo"></el-input>
      <el-button plain
                 size="mini"
                 @click="handleReplyTo">Reply</el-button>
    </template>
    <template v-else>
      <template v-if="infoPanel">
        <div class="subFooter"
             @mouseenter="handleEnter"
             @mouseleave="handleLeave">
          <span class="name">{{ author }} @ {{ toAuthor }}</span>

          <transition mode="out-in"
                      name="fade">
            <span v-if="showDate"
                  class="date"
                  key="date">{{ date | dateFormat('{y}.{m}.{d}') }}</span>
            <a v-else
               href=""
               class="reply"
               @click.stop.prevent="handleReply"
               key="reply">
              <i class="iconfont icon-reply"></i>
            </a>
          </transition>

        </div>
      </template>
      <template v-else>
        <a href=""
           class="zan"
           @click.stop.prevent="handleLikes"
           :class="isClicked ? 'changed-color' : ''">
          <i class="iconfont icon-zan"></i>
          <span class="zan-count">({{ likes }})</span>
        </a>
        <a href=""
           class="reply"
           @click.stop.prevent="handleReply">
          <i class="iconfont icon-reply"></i>
        </a>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'replyMode',
  props: {
    replyMode: {
      type: Boolean,
      default: false
    },
    author: {
      type: String,
      default: ''
    },
    toAuthor: {
      type: String,
      default: ''
    },
    userId: {
      type: [String, Number]
    },
    likes: {
      type: [Number, Boolean],
      default: 0
    },
    infoPanel: {
      type: Boolean,
      default: false
    },
    noLikes: {
      type: Boolean,
      default: true
    },
    date: {
      type: [Date, Number],
      default: Date.now()
    }
  },
  data () {
    return {
      isOpen: this.replyMode,
      content: '',
      showDate: true,
      isClicked: false
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
        content: this.content,
        author: this.author,
        userId: this.userId,
        date: this.date,
        selfId: (Date.now() * 1000 * 60) / 6,
      }
      this.$emit('replyForm', replyForm)
      this.content = ''
    },
    handleEnter () {
      this.showDate = false
    },
    handleLeave () {
      this.showDate = true
    },
    handleLikes () {
      this.isClicked = !this.isClicked
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

<style lang='less'>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
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
  .subFooter {
    display: flex;
    justify-content: space-between;
    width: 100%;
    a.reply {
      opacity: 0.8;
    }
  }
}
</style>