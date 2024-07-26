<template>
  <div>
    <h1>webScoket</h1>
    <el-button
      type="primary"
      @click="goBack"
      >goBack</el-button
    >
    <div
      id="content"
      style="color: red"></div>
    <div>
      输入消息：
      <el-input
        v-model="message"
        placeholder="请输入消息"
        style="width: 120px; margin-right: 10px"></el-input>
    </div>
    <div>
      回应消息：
      <div
        id="response"
        style="display: inline-block"></div>
    </div>
    <el-button
      type="primary"
      @click="sendMessage"
      >sendMessage</el-button
    >
    <el-button
      type="primary"
      @click="restheartCheck"
      >restheartCheck</el-button
    >
    <el-button
      type="primary"
      @click="closews"
      >closeWs</el-button
    >
    <el-button
      type="primary"
      @click="stratWs"
      >stratWs</el-button
    >
  </div>
</template>

/* * @Author: Nigulasi * @Date: 2024-06-17 16:01:50 * @Last Modified by:
Nigulasi * @Describe: webScoket */
<script setup>
import { ref, getCurrentInstance, onMounted, onBeforeUnmount } from 'vue';
const { $alert, $confirm, $loading, $message, $route, $router } =
  getCurrentInstance().appContext.config.globalProperties;

const goBack = () => {
  $router.go(-1);
};
/**
 *ws.readyState
 *CONNECTING：值为0，表示正在连接。
 *PEN：值为1，表示连接成功，可以通信了。
 *LOSING：值为2，表示连接正在关闭。
 *CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
 **/
let ws = void 0;
let isconnect = ref(false);

let initws = () => {
  ws.onopen = function () {
    if (ws.readyState === 1) {
      document.getElementById('content').innerHTML = 'ws链接成功!';
      heartCheck.start();
    }
  };
  ws.onerror = function (e) {
    document.getElementById('content').innerHTML = `ws链接失败!`;
    reconnect();
  };
  ws.onclose = function () {
    // reconnect();
  };
  ws.onmessage = function (e) {
    heartCheck.reset();
    document.getElementById('response').innerHTML = e.data;
  };
};

// 心跳检测
let heartCheck = {
  timeout: 3000,
  timeoutObj: null,
  serverTimeoutObj: null,
  start() {
    this.timeoutObj = setTimeout(() => {
      ws.send('ping');
      this.serverTimeoutObj = setTimeout(() => {
        console.log('进入关闭');
        ws.close();
      }, this.timeout);
    }, this.timeout);
  },
  reset() {
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    this.start();
  },
};

// 重新连接
let reconnect = () => {
  if (isconnect.value) return;
  isconnect.value = true;
  setTimeout(() => {
    creatWs();
    console.log('重新连接');
    document.getElementById('content').innerHTML = 'ws链接失败!重新连接中...';
    isconnect.value = false;
  }, 2000);
};

let creatWs = () => {
  try {
    if (!!window.WebSocket && window.WebSocket.prototype.send) {
      ws = new WebSocket('ws://localhost:9527');
      initws();
    }
  } catch (error) {
    reconnect();
  }
};

let message = ref('');

let sendMessage = () => {
  ws.send(message.value);
};

let closews = () => {
  isconnect.value = true;
  ws.close();
  document.getElementById('content').innerHTML = `ws链接已断开！`;
};

let stratWs = () => {
  isconnect.value = false;
  reconnect();
};
let restheartCheck = () => {
  heartCheck.reset();
  ws.send('ping_rest');
};
onBeforeUnmount(() => {
  // 页面卸载销毁前关闭ws
  isconnect.value = true;
  ws.close();
});
</script>

<style scoped>
.main {
  width: 123;
}
</style>
