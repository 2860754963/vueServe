<template>
  <div class="main">
    <h1>home</h1>
    <div><router-link to="/webScoket">webScoket</router-link></div>
    <div><router-link to="/stopAxios">stopAxios</router-link></div>
    <div><router-link to="/virtualList">virtualList</router-link></div>
    <div>123
      <a-button type="primary" @click="handleClick">按钮</a-button>
      <StepBackwardOutlined />
      <StarOutlined />
    </div>
  </div>
</template>

/*
* @Author: Nigulasi
* @Date: 2024-06-17 16:40:56
* @Last Modified by: Nigulasi
* @Describe: home
*/
<script setup>
import { StarOutlined, StarFilled, StarTwoTone, StepBackwardOutlined } from '@ant-design/icons-vue';
</script>

<style scoped>
div {
  margin: 10px;
}
</style>