<template>
  <a-modal
    ref="modalInstance"
    v-bind="$attrs"
    :open="localOpen"
    :wrapClassName="classObj"
    :width="width"
    :centered="centered"
    :maskClosable="maskClosable"
    class="yy-modal-entity"
    :cancelText="props.cancelText"
    @ok="(e) => emit('ok', e)"
    @cancel="localOpen = false;emit('update:open', false);emit('cancel')"
    :class="{'is-footer-top-border':isFooterTopBorder,'is-header-bottom-border':isHeaderBottomBorder}"
  >
    <template
      #title
      v-if="$slots.title"
    >
      <slot name="title" />
    </template>
    <template #default>
      <slot />
    </template>
    <template
      #footer
      v-if="$slots.footer"
    >
      <slot name="footer"  />
    </template>
  </a-modal>
</template>

<script setup>
import { watch, ref, computed, onMounted, onUnmounted } from 'vue'

const resizeFlag = ref(false)
let emit = defineEmits(['ok', 'update:open', 'cancel'])
defineOptions({
  inheritAttrs: true,
})
const props = defineProps({
  confirmText: {
    type: String,
    default: '确认',
  },
  cancelText: {
    type: String,
    default: '取消',
  },
  loadingText: {
    type: String,
    default: '提交中',
  },
  customClass: {
    type: String,
    default: '',
  },
  open: {
    type: Boolean,
    default: false,
  },
  isFooterTopBorder: {
    type: Boolean,
    default: true,
  },
  isHeaderBottomBorder: {
    type: Boolean,
    default: true,
  },
  width: {
    type: [String, Number],
    default: '853px',
  },
  centered: {
    type: Boolean,
    default: true,
  },
  maskClosable: {
    type: Boolean,
    default: false,
  },
})
const classObj = computed(() => 'yy-modal ' + props.customClass)
let localOpen = ref(props.open)
watch(() => props.open, (val) => {
  localOpen.value = val
})
</script>

<style lang="scss">
@use "./index.scss" as *;
</style>
