<template>
  <a-tooltip
    v-bind="$attrs"
    :color="toolTipBg"
    :class="props.customClass"
    :overlayInnerStyle="innerColor"
    @openChange="handleVisible"
  >
    <template #title>
      {{props.content}}
      <slot name="title" v-if="!props.content"></slot>
    </template>
    <slot>
      <icon-tooltip class="icon-tooltip" :color="svgColor"></icon-tooltip>
    </slot>
  </a-tooltip>
</template>

<script setup>
import { ref, computed } from 'vue'
import iconTooltip from './icon-tooltip.vue'

defineOptions({
  inheritAttrs: true,
})
const props = defineProps({
  customClass: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  isWhite: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: '',
  },
  overlayInnerStyle: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['visibleChange'])
const svgColor = ref('#BCC2CC')
const toolTipBg = computed(() => {
  if (props.isWhite) return '#fff'
  if (props.color) return props.color
  return 'rgba(51, 51, 51, 0.85)'
})
const innerColor = computed(() => {
  let styleObj = { color: '#fff' }
  if (props.isWhite) {
    return Object.assign(styleObj, props.overlayInnerStyle, {
      color: '#333 !important',
    })
  }
  return Object.assign(styleObj, props.overlayInnerStyle)
})
const handleVisible = (val) => {
  if (val) {
    svgColor.value = '#3A75FF'
  } else {
    svgColor.value = '#BCC2CC'
  }
  emit('visibleChange', val)
}
</script>

<style lang="scss" scoped>
.icon-tooltip{
  cursor: pointer;
  outline: initial;
}
</style>
