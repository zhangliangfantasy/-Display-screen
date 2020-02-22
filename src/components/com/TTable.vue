<template>
  <div>
    <table border="0" cellpadding="10" cellspacing="0" width="100%">
      <thead style="background:rgba(27,101,115,1);">
        <tr height="56px" v-if="this.deviceId === '1'">
          <th>术间</th>
          <th>姓名</th>
          <th>性别</th>
          <th>病区</th>
          <th>床号</th>
          <th>手术名称</th>
          <th v-if="this.deviceId==='1'">手术医生</th>
          <th v-if="this.deviceId==='1'">手术助手</th>
          <th v-if="this.deviceId==='1'">麻醉医生</th>
          <th v-if="this.deviceId==='1'">麻醉助手</th>
          <th>状态</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item,index) in this.lists"
          :key="index"
          :style="{background: '#' + item.color}"
          height="56px"
        >
          <th>{{item.roomName}}</th>
          <th>{{item.patientName}}</th>
          <th>{{item.patientSex === 2 ? '男':'女'}}</th>
          <th>{{item.patientLocation}}</th>
          <th>{{item.bedNo}}</th>
          <th>{{item.operationName}}</th>
          <th>{{item.surgeonName}}</th>
          <th>{{item.surgeonAssistant}}</th>
          <th>{{item.anesthetist}}</th>
          <th>{{item.anesthetistAssistant}}</th>
          <th>{{item.customStatus}}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import HTTP from "@/httpService";
import io from "socket.io-client";
export default {
  name: "Test",
  data() {
    return {
      deviceId: "1",
      current: "0",
      size: "1",
      pages: "",
      backgroundColor: "red",
      lists: "",
      customStatus: "",
      scheduleId: "",
      timer: ""
    };
  },
  props: {},
  computed: {},
  methods: {
    pageData() {
      var that = this;
      that.current++;
      HTTP.post("findScreenByDeviceId", {
        deviceId: that.deviceId,
        page: {
          current: this.current,
          size: this.size
        }
      })
        .then(function(res) {
          if (res) {
            console.log(res);
            that.pages = res.data.page.pages;
            that.lists = "";
            that.lists = res.data.page.records;
            for (let i = 0; i < that.lists.length; i++) {
              if (that.lists[i].scheduleId === that.scheduleId) {
                that.lists[i].customStatus = that.customStatus;
              }
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  watch: {},
  mounted: function() {
    var vm = this;
    this.pageData();
    this.timer = setInterval(() => {
      if (vm.current === vm.pages) {
        vm.current = 0;
      }
      if (vm.pages === 0) {
        clearInterval(this.timer);
        return;
      }
      this.pageData();
    }, 5000);
    // socket获取后台推送的数据
    var socket = io.connect("http://192.168.111.59:18020?deviceId=1");
    socket.on("connect", function() {
      console.log("连接上了");
    });
    socket.emit("chatevent", "1111");
    socket.on("notificaEvent", function(data, ackCallback) {
      vm.scheduleId = JSON.parse(data).scheduleId;
      vm.customStatus = JSON.parse(data).customStatus;
      if (ackCallback) {
        ackCallback("client had recivied msg");
      }
    });
    socket.on("chatevent", function(data) {});
  },
  beforeDestroy: function() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.row-color {
  background-color: pink;
}
</style>
