<template>
  <a-switch
    class="yy-switch"
    :size="size"
    v-bind="$attrs"
    :class="switchCustomClass"
  ></a-switch>
</template>

<script setup>
defineOptions({
  inheritAttrs: true,
})

import { ref, computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'default',
  }
})
const switchCustomClass = computed(()=> `yy-switch-${props.size}`)

</script>

<style lang="scss" scoped>
  .yy-switch-small.ant-switch.ant-switch-small{
    width: 32px;
    height: 18px;
    :deep(.ant-switch-handle){
      width: 14px;
      height: 14px;
    }
  }
  :deep(.yy-switch-small.ant-switch.ant-switch-small.ant-switch-checked .ant-switch-handle){
    left: calc(100% - 16px);
  }
</style>
