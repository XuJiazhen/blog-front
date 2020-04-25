<template>
  <div class="reply-mode"
       :class="isOpen ? 'open' : ''">
    <template v-if="isOpen">
      <el-input :placeholder="`@${author}`"
                v-model="content"></el-input>
      <el-button plain
                 size="mini"
                 @click="handleReplyTo">Reply</el-button>
    </template>
    <template v-else>
      <template v-if="infoPanel">
        <div class="subFooter">
          <span class="name">{{ author }} @ {{ toAuthor }}</span>

          <template v-if="isOpen">
            <span class="date">{{ date | dateFormat('{y}.{m}.{d}') }}</span>
          </template>

          <template v-else>
            <a href=""
               class="reply"
               @click.stop.prevent="handleReply">
              <i class="iconfont icon-reply"></i>
            </a>
          </template>
        </div>
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
    id: {
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
    }
  },
  methods: {
    handleReply () {
      this.isOpen = !this.isOpen
    },
    handleReplyTo () {
      this.isOpen = false
      const replyForm = {
        content: this.content,
        author: this.author,
        id: this.id,
        date: this.date,
        selfId: (Date.now() * 1000 * 60) / 6
      }
      this.$emit('replyForm', replyForm)
      this.content = ''
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
  .subFooter {
    display: flex;
    justify-content: space-between;
    width: 100%;
    &:hover a.reply {
      opacity: 0.8;
    }
  }
}
</style>