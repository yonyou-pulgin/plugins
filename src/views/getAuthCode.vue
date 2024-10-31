<template>
  <yy-modal title="如何获取授权码？" :footer="null" :isHeaderBorderBottom="false" :width="360" v-model:open="visible">
    <div class="auth-container">
      <img src="@/assets/img/authTips.png" width="310px" alt="">
    </div>
  </yy-modal>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import yyModal from '@/antDesignComponents/yyModal/yy-modal.vue';
import { bitable } from '@lark-base-open/js-sdk';

const bridge = bitable.bridge;
const visible = ref(false)


onMounted(async() => {
  await bitable.bridge.setData('yy-authCode', 'hello world');
})
const open = async() => {
  visible.value = true
  await bitable.bridge.setData('yy-authCode', '获取授权码');
}

defineExpose({open})
</script>

<style lang="scss" scoped>
.auth-container{
  padding: 16px 0;
}
</style>