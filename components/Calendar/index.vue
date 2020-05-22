<template>
  <div class="calendar">
    <!-- Date -->
    <div class="currentDate">
      <el-button size="mini"
                 type="plain"
                 icon="el-icon-arrow-left"
                 @click="handlePrevMonth" />
      <div class="date">
        {{currentYear}} - {{month}} - {{currentDay}}
      </div>
      <el-button size="mini"
                 type="plain"
                 icon="el-icon-arrow-right"
                 @click="handleNextMonth" />
    </div>

    <!-- Week -->
    <ul class="weeks">
      <li class="week"
          v-for="week in weeksText"
          :key="week">
        {{week}}
      </li>
    </ul>

    <!-- Day -->
    <ul class="days">
      <li class="day"
          :class="`${date.type} ${date.day == currentDay ? 'currentDay' : ''}`"
          v-for="(date,index) in initDate(currentYear,currentMonth)"
          :key="index">
        <span>{{date.day}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data () {
    return {
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      currentDay: new Date().getDate(),
      weeksText: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    }
  },
  computed: {
    month () {
      const month = this.currentMonth + 1
      return month < 10 ? `0${month}` : month
    }
  },
  methods: {
    initDate (year, month) {
      const daysOfPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      let days = []

      // 判断是否为闰年，闰年二月有29天
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        daysOfPerMonth[1] = 29;
      }

      // 获取本月第一天
      const firstDayOfCurrentMonth = new Date(year, month, 1).getDay()
      const preDays = firstDayOfCurrentMonth

      // fill pre days
      if (preDays > 0) {
        for (let i = 0; i < preDays; i++) {
          const day = {
            type: 'pre',
            year: year,
            month: month,
            day: ''
          }
          days.push(day)
        }
      }

      // fill current days
      for (let i = 0; i < daysOfPerMonth[month]; i++) {
        const day = {
          type: 'cur',
          year: year,
          month: month,
          day: i + 1
        }
        days.push(day)
      }

      // 获取本月的最后一天
      const lastDayOfCurrentMonth = new Date(year, month + 1, 0).getDay()
      const nextDays = 6 - lastDayOfCurrentMonth

      for (let i = 0; i < nextDays; i++) {
        const day = {
          type: 'next',
          year: year,
          month: month,
          day: ''
        }
        days.push(day)
      }

      return days
    },
    handlePrevMonth () {
      // 判断是否为一月
      if (this.currentMonth === 0) {
        this.currentYear = this.currentYear - 1
        this.currentMonth = 11
        this.currentDay = 1
      } else {
        this.currentMonth = this.currentMonth - 1
        this.currentDay = 1
      }

    },
    handleNextMonth () {
      // 判断是否为12月
      if (this.currentMonth === 11) {
        this.currentYear = this.currentYear + 1
        this.currentMonth = 0
        this.currentDay = 1
      } else {
        this.currentMonth = this.currentMonth + 1
        this.currentDay = 1
      }
    }
  }
}
</script>

<style lang="less">
.calendar {
  margin-top: 0.625rem;
  padding: 0.625rem;
  ul {
    padding: 0;
  }
  .currentDate {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    button {
      border-radius: 0;
      padding: 5px 5px;
      border: none;

      &:hover {
        color: white;
        background-color: #409eff;
      }
    }
  }

  .weeks,
  .days {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
  }
  .weeks {
    margin-top: 0.625rem;
    flex-flow: row nowrap;
  }
  .days {
    flex-flow: row wrap;
  }
  .week,
  .day {
    display: inline-block;
    width: calc(100% / 7);
  }
  .week {
    width: 2rem;
    height: 1.75rem;
    line-height: 1.75rem;
  }
  .day {
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    transition: all 0.3s;
    &.cur:hover {
      cursor: pointer;
      color: white;
      background-color: #409eff;
    }
    &.currentDay {
      color: white;
      background-color: #409eff;
      &:hover {
        opacity: 0.5;
      }
    }
  }
}
</style>