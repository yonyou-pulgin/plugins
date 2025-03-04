<template>
  <yy-modal :title="$t('secondSetting.tableAuthCodeTip2')" :footer="null" :isHeaderBorderBottom="false" :width="360" v-model:open="visible">
    <div class="auth-container">
      <img :src="tipUrl" width="302px" alt="">
    </div>
  </yy-modal>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import yyModal from '@/antDesignComponents/yyModal/yy-modal.vue';
import { bitable } from '@lark-base-open/js-sdk';
import useTableBase from '@/hooks/useTableBase.js';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { tableInfo } = useTableBase()

const bridge = bitable.bridge;
const visible = ref(false)
const tipUrl = ref('')


onMounted(async() => {
  await bitable.bridge.setData('yy-authCode', 'hello world');
   tipUrl.value = require(`@/assets/img/authTips-${tableInfo.value.lang}.png`)
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