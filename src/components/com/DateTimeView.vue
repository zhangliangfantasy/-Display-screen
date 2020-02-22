<template>
  <div class="date-time-view" :style="rootStyle">
    <span class="date-weekday align-right" :style="dateStyle">
      <p class="date">{{date}}</p>
      <p class="weekday">{{cWeekday}}</p>
    </span>
    <span class="time" :style="timeStyle">{{time}}</span>
  </div>
</template>

<script>
export default {
  name: "DateTimeView",
  data() {
    let _default = "--";
    return {
      year: _default,
      month: _default,
      day: _default,
      hour: _default,
      minutes: _default,
      seconds: _default,
      weekday: _default,
      timerId: _default
    };
  },
  props: {
    rootStyle: {
      type: Object,
      default: () => {
        return {
          height: "6vh"
        };
      }
    },
    dateStyle: {
      type: Object,
      default: () => {
        return {};
      }
    },
    timeStyle: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    date: function() {
      return `${this.year}年${this.toTen(this.month)}月${this.toTen(
        this.day
      )}日`;
    },
    time: function() {
      return `${this.toTen(this.hour)}:${this.toTen(this.minutes)}:${this.toTen(
        this.seconds
      )}`;
    },
    cWeekday: function() {
      let map = {
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六",
        7: "日"
      };
      return "星期" + (map[this.weekday] ? map[this.weekday] : "--");
    }
  },
  methods: {
    toTen: function(one) {
      return one < 10 ? "0" + one : one;
    },
    updateDateTime: function() {
      let now = new Date();
      this.year = now.getFullYear();
      this.month = now.getMonth() + 1;
      this.day = now.getDate();
      this.hour = now.getHours();
      this.minutes = now.getMinutes();
      this.seconds = now.getSeconds();
      this.weekday = now.getDay();
    }
  },
  mounted: function() {
    this.timerId = setInterval(this.updateDateTime, 1000);
  },
  beforeDestroy: function() {
    clearInterval(this.timerId);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.date-time-view {
  display: flex;
  align-items: center;
  align-content: center;
  > span {
    display: inline-block;
    &.date-weekday {
      padding-right: 0.5em;
      margin-right: 0.4em;
      border-right: 1px solid #aaa;
    }
  }
}
</style>
