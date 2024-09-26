<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue';
import { bitable } from '@lark-base-open/js-sdk'; 
import useTableBase from './hooks/useTableBase.js';
import { urltoBlob } from 'image-conversion'
const { setTableInfo } = useTableBase();

// 获取表格数据
const getTableBase = async () => {
    const selection = await bitable.base.getSelection();
    setTableInfo(selection)  
}
getTableBase()
</script>

<style lang="scss" scoped>

</style>

<style>
#app {
  height: 100%;
  overflow: hidden;
}
</style>