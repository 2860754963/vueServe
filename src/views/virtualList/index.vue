<template>
  <div>
    <h1>vertual List</h1>
    <el-button
      type="primary"
      @click="goBack"
      >goBack</el-button
    >
    <el-button
      type="primary"
      @click="gatData"
      >load virtualList</el-button
    >

    <div
      class="viewPort"
      ref="viewPort"
      @scroll="handelScroll">
      <div
        :style="{ height: allHeight + 'px', top: itemPosition + 'px' }"
        class="plasehoder">
        <div
          class="item"
          :style="{ height: itemHeight + 'px' }"
          v-for="item in showList"
          :key="item.id">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

/* * @Author: Nigulasi * @Date: 2024-06-25 10:02:27 * @Last Modified by:Nigulasi
* @Describe: 虚拟列表 */
<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import EmojiPicker from 'vue3-emoji-picker';
import request from '@/utils/request.js';
const { $alert, $confirm, $loading, $message, $route, $router } =
  getCurrentInstance().appContext.config.globalProperties;

const goBack = () => {
  $router.go(-1);
};
const viewPort = ref(null);

let resultList = ref([]);
let allHeight = ref(0);
let itemHeight = ref(40);
let itemPosition = ref(0);
let startIndex = ref(0);
let endIndex = ref(10);

const gatData = async () => {
  let res = await request.get('http://localhost:9528/virtualList');
  if (res.result === 'success') {
    resultList.value = res.data;
    allHeight.value = res.data.length * itemHeight.value;
  }
};
let showList = computed(() => {
  return resultList.value.slice(startIndex.value, endIndex.value);
});

let showCount = computed(() => {
  return Math.floor(viewPort.value.clientHeight / itemHeight.value);
});

onMounted(() => {
  endIndex.value = showCount.value;
});
const handelScroll = (e) => {
  let { scrollTop } = e.target;
  itemPosition.value = scrollTop;
  startIndex.value = Math.floor(scrollTop / itemHeight.value);
  endIndex.value = startIndex.value + showCount.value;
};

let onSelectEmoji = (e) => {
  console.log(e, 'emj');
};
</script>

<style lang="scss" scoped>
.item {
  background-color: pink;
  text-align: center;
  line-height: 40px;

  &:nth-child(2n) {
    background-color: green;
  }
}

.plasehoder {
  position: absolute;
  width: 90%;
}

.viewPort {
  height: 60vh;
  width: 50%;
  margin-top: 20px;
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
  position: relative;
  border: 1px solid #21252b;
}
</style>
