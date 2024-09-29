<template>
  <a-select
    class="yy-select"
    ref="yySelectInstance"
    :class="props.customClass"
    :style="{width: props.customWidth + 'px'}"
    v-bind="$attrs"
    @dropdownVisibleChange="dropdownVisibleChangeHandle"
    :dropdownClassName="yyDropdownClassName"
    :field-names="fieldNames"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <template #tagRender="data">
      <slot name="tagRender" :data="data">
      </slot>
    </template>
    <template #maxTagPlaceholder="data">
      <slot name="maxTagPlaceholder" :data="data">
      </slot>
    </template>
    <template #suffixIcon>
      <icon-draw :class="{'rotateIcon':isFocus}" :color="colorVal"></icon-draw>
    </template>
    <template #dropdownRender="{ menuNode: menu }">
      <slot name="selectSearch" :data="data">
      </slot>
      <v-nodes :vnodes="menu" />
    </template>
    <template #option="data">
      <slot name="option" :data="data">
        {{ data.label || data.title || data[fieldNames.label]}}
      </slot>
    </template>
  </a-select>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  components: {
    VNodes: (_, { attrs }) => attrs.vnodes,
  },
})
</script>
<script setup>
defineOptions({
  inheritAttrs: true,
})

const emit = defineEmits(['focus', 'blur', 'dropdownVisibleChange'])

const props = defineProps({
  customClass: {
    type: String,
    default: '',
  },
  customWidth: {
    type: Number,
    default: 200,
  },
  dropdownClassName: {
    type: String,
    default: '',
  },
  fieldNames: {
    type: Object,
  },
})
const isFocus = ref(false)
const colorVal = ref('#BCC2CC')
const yySelectInstance = ref(null)

const dropdownVisibleChangeHandle = (visible) => {
  if (visible) {
    isFocus.value = true
    colorVal.value = '#3A75FF'
  } else {
    isFocus.value = false
    colorVal.value = '#BCC2CC'
  }
  emit('dropdownVisibleChange', visible)
}

const handleFocus = () => {
  emit('focus')
}
const handleBlur = () => {
  emit('blur')
}
const yyDropdownClassName = computed(() => props.dropdownClassName + ' yy-select-dropdown-custom')

defineExpose({ yySelectInstance })

</script>

<style lang="scss" scoped>
.yy-select{
  height: 32px;
}
.rotateIcon{
  transform: rotate(180deg);
}
</style>
<style lang="scss">
.yy-select-dropdown-custom{
  padding: 4px 0!important;
  .ant-select-item-option-active:not(.ant-select-item-option-disabled){
    background-color: #EBF1FF!important;
  }
  .ant-select-item-option-selected:not(.ant-select-item-option-disabled){
    color: #3A75FF!important;
    background-color: transparent!important;
  }
  .ant-select-item-empty{
    text-align: center
  }
}
</style>
