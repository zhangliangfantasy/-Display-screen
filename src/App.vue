<template>
  <div id="app">
    <header>
      <div class="w-row v-align--center header-content">
        <div class="w-col">
          <img class="logo filter-gray" :src="logo" alt="logo" />
          <!-- <img class="logo" src="./assets/logo.png" alt="logo" style="background: black; "> -->
        </div>
        <div class="w-col-5 h-align--center header-title">{{sharedState.sysName}}</div>
        <div class="w-col h-align--right time-con">
          <date-time-view :dateStyle="dateStyle" :timeStyle="timeStyle"></date-time-view>
        </div>
      </div>
    </header>
    <nav>
      <router-view />
    </nav>
    <footer>
      <div class="w-row v-align--center footer-content">
        <div class="w-col h-align--center v-align--center">
          <!-- <div class="num-statistics">当前手术室总人数:{{sharedState.personNum}}</div> -->
          <div class="msg-info">
            <!-- <span class="rivamed-iconfont icon-speaker"></span> -->
            <!-- <span>{{sharedState.msgInfo}}</span> -->
            <text-scrolling class="text-scrolling"></text-scrolling>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import HTTP from "@/httpService";
import { pxToVh, pxToVw } from "@/util";
import Store from "@/store";
import DateTimeView from "@/components/com/DateTimeView";
import TextScrolling from "@/components/TextScrolling";

export default {
  name: "App",
  data() {
    return {
      sharedState: Store.state,
      sysName: "医护区大屏",
      msgInfo: "",
      logo: null,
      dateStyle: {
        fontSize: pxToVw(18),
        lineHeight: 1.4
      },
      timeStyle: {
        fontSize: pxToVw(30)
      }
    };
  },
  mounted: function() {
    let vm = this;
    HTTP.post("hospLogo", { bspHospital: {} })
      .then(function(res) {
        vm.logo = "data:image/jpg;base64," + res.data.pageModel.rows[0].bspHospitalFile.hospLogo
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  components: {
    DateTimeView,
    TextScrolling
  }
};
</script>

<style lang="scss">
@import "@/scss/app.scss";
@import "./assets/icon-font/iconfont.css";
.filter-gray {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
}
#app {
  position: relative;
  height: 100%;
  margin: 0 33px 0 33px;
  color: $color-black;
  > header {
    height: pxToVh(80px);
    background-color: $color-white;
    .header-content {
      height: 100%;
      .logo {
        // margin-left: 0.5em;
        height: pxToVh(56px);
      }
      .header-title {
        font-size: pxToVw(32px);
      }
      .time-con {
        padding-right: 2em;
      }
    }
  }

  > nav {
    height: 100vh - pxToVh(80px) - pxToVh(54px);
    box-sizing: border-box;
    background-color: $color-white;
  }

  > footer {
    // height: pxToVh(10px);
    background-color: #fff;
    .footer-content {
      height: 100%;
      margin: 0 33px 0 33px;
      font-size: pxToVw(20px);
      // .num-statistics {
      //   position: absolute;
      //   left: 1em;
      //   color: #f0f0f0;
      // }

      .msg-info {
        width: 100%;
        position: absolute;
        // left: 1em;
        color: #f04134;
        .text-scrolling {
          display: inline;
        }
        .icon-speaker {
          font-size: pxToVw(30px);
        }
        > span {
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
