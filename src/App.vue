<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import "./assets/css/common.css";
export default {
  name: "App",
  mounted: function() {
    window.ondragover=function(e) { e.preventDefault(); returnfalse }; // 防止拖拽进来文件
    window.ondrop=function(e) { e.preventDefault(); returnfalse }; // 防止拖拽进来文件
    window.document.oncontextmenu = function() {
      //屏蔽右键事件
      return false;
    };
  },
  created () {
    // 此举是防止浏览器刷新造成vuex数据丢失
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    } 
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  },
  methods: {
  }
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
