<template>
  <a-button
    class="yy-custom-btn yy-button"
    :class="customClass"
    v-bind="$attrs"
  >
    <template #icon>
      <slot name="prefixIcon"></slot>
    </template>
    <slot>{{props.loadingText}}</slot>
    <slot name="suffixIcon"></slot>
  </a-button>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'custom-button',
  inheritAttrs: true,
})
const props = defineProps({
  customClass: { // 自定义类名
    type: String,
    default: '',
  },
})

</script>

<style lang="scss" scoped>
.yy-custom-btn{
  height: 32px;
  border-radius: 6px;
  width: min-content;
  cursor: pointer;
  box-shadow: none !important;
  font-size: 14px;
  padding: 0 12px;
  min-width: 80px;
  &.ant-btn-primary[disabled]{
    background: #9CBAFF;
    color: #FFFFFF;
    border: none;
  }
}
.yy-button + .yy-button{
  margin-left: 12px;
}

:global(.ant-wave){
  display: none!important;
}
// ui 操作按钮默认灰色， active 蓝色的样式
.yy-custom-btn-operate{
  color: #606266!important;
  &:hover{
    border-color: #3A75FF!important;
    background: #fff!important;
    color: #3A75FF!important;
  }
}
.yy-custom-btn-operate:disabled{
  border-color: #D6DAE4!important;
  color: #BCC2CC!important;
  background: #F2F4F7!important;
}
</style>
