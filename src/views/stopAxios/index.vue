<template>
  <div>
    <h1>stopAxios</h1>
    <el-button
      type="primary"
      @click="goBack"
      >goBack</el-button
    >
    <div>
      <el-button
        type="primary"
        @click="startAxios"
        >startAxios</el-button
      >
      <el-button
        type="primary"
        @click="stopAxios"
        >stopAxios</el-button
      >
    </div>
    <div style="width: 50%"><el-progress :percentage="percentage" /></div>
  </div>
</template>

/* * @Author: Nigulasi * @Date: 2024-06-17 16:57:01 * @Last Modified by:
Nigulasi * @Describe: stopAxios */
<script setup>
import { ref, getCurrentInstance } from 'vue';
const { $alert, $confirm, $loading, $message, $route, $router } =
  getCurrentInstance().appContext.config.globalProperties;

const goBack = () => {
  $router.go(-1);
};
import axios from 'axios';

let abort = new AbortController();
let signal = abort.signal;
let percentage = ref(0);
let startAxios = () => {
  console.log('开始请求');
  try {
    axios({
      method: 'get',
      url: 'http://localhost:9528/video',
      signal: signal,
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        console.log(progressEvent, 'progressEvent');
        percentage.value = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
      },
    }).then((res) => {
      console.log(res, 'res');
    });
  } catch (error) {
    console.log(error);
  }
};

let stopAxios = () => {
  abort.abort();
  console.log('停止请求');
};
</script>

<style scoped></style>
