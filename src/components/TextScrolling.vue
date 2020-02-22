<template>
  <div class="notice">
    <span class="rivamed-iconfont icon-speaker"></span>
    <div class="marquee-wrap">
      <!-- 滚动内容 -->
      <div class="scroll">
        <p class="marquee">{{text}}</p>
        <!-- <p class="marquee"></p> -->
        <!-- 文字副本 -->
        <p class="copy"></p>
      </div>
      <!-- 为了计算总文本宽度，通过css在页面中隐藏 -->
      <p class="getWidth">{{text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextScrolling",
  data() {
    return {
      time: null,
      timer: null,
      text: "",
      width: "",
      maxWidth: "",
      scroll: null,
      copy: '',
      distance: '',
      lists: [
        "101术间--张小杰,",
        "204术间--高于,",
        "103术间--李艳芳,",
        "206术间--高以翔,",
        "106术间--张三,",
        "203术间--汪宏伟,",
        "403术间--吴亦凡,",
        "205术间--张艺兴,",
        "305术间--陈伟霆,",
        "501术间--任荣,",
        "309术间--白非凡,",
        "706术间--王热热,",
        "302术间--许光汉,",
        "906术间--田园,",
        "402术间--李晓飞,",
        "307术间--谢霆锋,",
        "602术间--刘爽,",
        "302术间--刘甜甜,",
        "901术间--邓军的,"
      ]
    };
  },
  created() {
    // 进入页面等一秒才开始滑动
    let timer = setTimeout(() => {
      this.move();
      clearTimeout(timer);
      this.time = setInterval(() => {
        this.lists.shift();
          if (this.lists[0] === '') {
          console.log('fantasy')
          clearInterval(this.time);
        }
        this.text = "";
        for (let item of this.lists) {
          this.text += " " + item;
        }
      }, 20000);
    }, 1000);
  },
  // 把父组件传入的arr转化成字符串
  mounted() {
    // 这个地方需要写一个接口来得到播报内容
    for (let item of this.lists) {
      this.text += " " + item;
    }
  },
  methods: {
    acquireWidth() {
      this.scroll = document.querySelector(".scroll");
      // scroll.innerText = this.text;
      this.copy = document.querySelector(".copy");
      this.copy.innerText = this.text; // 文字副本填充
      this.maxWidth = document.querySelector(".marquee-wrap").clientWidth;
      this.width = document.querySelector(".getWidth").scrollWidth;
      if (this.width <= this.maxWidth && this.distance === 16) {
        // console.log(this.copy.innerText)
        this.copy.innerText = '';
        // console.log(this.copy.innerText);
        clearInterval(this.timer);
        this.copy.innerText = '';
      }
    },
    move() {
      // let scroll = document.querySelector(".scroll");
      // scroll.innerText = this.text;
      // let maxWidth = document.querySelector(".marquee-wrap").clientWidth;
      // // 获取文字text 的计算后宽度 （由于overflow的存在，直接获取不到，需要独立的node计算）
      // let width = document.querySelector(".getWidth").scrollWidth;
      // // let width = document.querySelector(".marquee").scrollWidth;
      // // 如果文本内容的宽度小于页面宽度，则表示文字小于等于一行，则不需要滚动
      // if (width <= maxWidth) return;
      // // let scroll = document.querySelector(".scroll");
      // let copy = document.querySelector(".copy");
      // copy.innerText = this.text; // 文字副本填充
      this.distance = 0; // 位移距离
      // 设置位移
      this.timer = setInterval(() => {
        this.acquireWidth();
        this.distance -= 1;
        // 如果位移超过文字宽度，则回到起点
        if (-this.distance >= this.width) {
          this.distance = 16; // 距离必须与marquee的margin宽度相同
        }
        this.scroll.style.transform = "translateX(" + this.distance + "px)";
      }, 30);
    }
  },
  beforeDestroy() {
    // 清除计时器
    clearInterval(this.timer);
  }
};
</script>
<style scoped lang='scss'>
.notice {
  font-size: 16px;
  .icon-speaker {
    float: left;
    height: 16px;
    line-height: 16px;
    margin-right: 30px;
  }
}
.marquee-wrap {
  overflow: hidden;
  position: relative;
  .scroll {
    display: flex;
    p {
      word-break: keep-all; // 不换行
      white-space: nowrap;
      /* 设置前后间隔 */
      &.marquee {
        margin-right: 16px;
        font-size: 16px;
        height: 16px;
        line-height: 16px;
      }
    }
  }
  /* 仅为了获取宽度，故隐藏掉 */
  .getWidth {
    word-break: keep-all; // 不换行
    white-space: nowrap;
    position: absolute;
    opacity: 0;
    top: 0;
  }
}
</style>
