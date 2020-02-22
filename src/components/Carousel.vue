<template>
  <div>
    <div>
      <input type="text" id="ttsText" />
      <input type="button" id="tts_btn" @click="myplay()" value="播放" />
    </div>
    <div id="bdtts_div_id">
      <audio id="tts_autio_id" autoplay="autoplay">
        <source
          id="tts_source_id"
          src="http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=9&text= "
          type="audio/mpeg"
        />
        <embed id="tts_embed_id" height="0" width="0" src />
      </audio>
    </div>
  </div>
</template>

<script>
// import io from "socket.io-client";
export default {
  name: "Carousel",
  data() {
    return {
    };
  },
  props: {},
  computed: {},
  methods: {
    myplay() {
      var ttsDiv = document.getElementById("bdtts_div_id");
      var ttsAudio = document.getElementById("tts_autio_id");
      var ttsText = document.getElementById("ttsText").value;
      ttsDiv.removeChild(ttsAudio);
      var au1 = '<audio id="tts_autio_id" autoplay="autoplay">';
      var sss =
        '<source id="tts_source_id" src="http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text=' +
        ttsText +
        '" type="audio/mpeg">';
      var eee = '<embed id="tts_embed_id" height="0" width="0" src="">';
      var au2 = "</audio>";
      ttsDiv.innerHTML = au1 + sss + eee + au2;
      ttsAudio = document.getElementById("tts_autio_id");
      ttsAudio.play();
    }
  },
  watch: {},
  mounted: function() {
    // console.log('fantasy')
    // var socket = io.connect("http://192.168.111.59:18020?deviceId=1");
    // socket.on("connect", function() {
    //   console.log("连接上了");
    // });
    // socket.emit("chatevent", "1111");
    // socket.on("notificaEvent", function(data, ackCallback) {
    //   console.log("from server data=" + data);
    //   if (ackCallback) {
    //     ackCallback("client had recivied msg");
    //   }
    // });
    // socket.on("chatevent", function(data) {});
    // var time = setInterval(() => {
    //   socket.emit("fantasy", "jjjj")
    // }, 50000);
  },
  beforeDestroy: function() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
