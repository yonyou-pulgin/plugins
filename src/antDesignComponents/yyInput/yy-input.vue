<template>
  <a-input
    class="yy-input"
    ref="yyInput"
    v-bind="$attrs"
    :value="value"
    :class="customClass" :style="styleObj"
    @change="handleChange"
    @keypress.enter.prevent="search"
    :allowClear="clearStatus"
    autocomplete="off"
  >
    <template v-if="props.isPrefix" #prefix>
      <slot name="prefix"></slot>
    </template>
    <template v-if="props.isSearch" #suffix>
      <div class="search-wrap">
        <icon-search class="icon-search" @click="search"></icon-search>
      </div>
    </template>
    <template #suffix v-else>
      <slot name="suffix"></slot>
    </template>
  </a-input>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'

defineOptions({
  inheritAttrs: true,
})
const yyInput = ref(null)
const emit = defineEmits(['search', 'change', 'input'])
const props = defineProps({
  customClass: {
    type: String,
    default: '',
  },
  customWidth: {
    type: Number,
    default: 0,
  },
  isSearch: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [String, Number, Symbol],
    default: undefined,
  },
  allowClear: {
    type: Boolean,
    default: false,
  },
  isPrefix: {
    default: false,
  },
  isAutoFocus: {
    default: false,
  },
})
const handleChange = () => {
  emit('change', yyInput.value.value)
  emit('input', yyInput.value.value)
}
const search = () => {
  emit('search', yyInput.value.value)
}
const styleObj = computed(() => {
  if (!props.customWidth || props.customWidth == null) return {}
  return { width: props.customWidth + 'px' }
})
const clearStatus = computed(() => {
  if (props.allowClear || props.isSearch) return true
  return false
})
const customClass = computed(() => {
  if (props.allowClear) return 'yy-input-padding ' + props.customClass
  return props.customClass
})

onMounted(() => {
  if (props.isAutoFocus) {
    nextTick(() => {
      yyInput.value.focus()
    })
  }
})
</script>

<style>
.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
  box-shadow: none!important;
}
.ant-input-affix-wrapper-focused {
  box-shadow: none!important;
}
:focus-visible {
  outline: none!important;
}
</style>

<style lang="scss" scoped>
.yy-input{
  width: 100%;
  height:  32px;
  padding: 0 12px!important;
  position: relative;
  border-color: #D6DAE4;
  ::placeholder {
    font-size: 14px;
    color: #BCC2CC;
    line-height: 20px;
  }

  &:hover{
    border-color: #3A75FF;
  }
  &:focus,&:focus-visible{
    border-color: #3A75FF;
    box-shadow: none;
    outline: none!important;
  }
  .anticon-close-circle{
    color: #BCC2CC;
    &:hover{
      color: #909399;
    }
  }
  .search{
    cursor: pointer;
    font-size: 12px;
    &:hover{
      color: #3A75FF;
    }
  }
  .search-wrap{
    height: 32px;
    display: flex;
    padding-left: 10px;
    align-items: center;
    justify-content: center;
    border-left: 1px solid #BCC2CC;
  }
  .icon-search{
    cursor: pointer;
    margin-top: 2px;
    fill: #BCC2CC;
    &:hover{
      fill: #3A75FF;
    }
  }
}
.yy-input-padding{
  padding-right: 0!important;
}
.yy-error-title{
  margin-top: 8px;
  font-size: 12px;
  font-weight: 400;
  color: #fd3b3a;
  line-height: 16px;
}

</style>
