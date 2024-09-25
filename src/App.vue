<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue';
import { bitable } from '@lark-base-open/js-sdk'; 
import useTableBase from './hooks/useTableBase.js';
const { setTableInfo } = useTableBase();

// const ui = bitable.ui;
// await bitable.ui.switchToTable('table_id');
// 获取表格数据
const getTableBase = async () => {
    const selection = await bitable.base.getSelection();
    // console.log('selection', selection)
    setTableInfo(selection)  
}
getTableBase()
</script>

<style lang="scss" scoped>

</style>