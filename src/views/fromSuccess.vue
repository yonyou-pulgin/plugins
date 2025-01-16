<template>
    <div class="success" :class="{'success-isVerifyIdentity': !confrimInfo.isVerifyIdentity}">
      <div class="success-head">
        <img src="@/assets/img/success.png" width="16px" alt="">
      创建完成</div>
      <div class="success-desc" v-if="confrimInfo.isVerifyIdentity">创建的是「有校验身份」确认单
        <br/>
        可将二维码/链接发给对方进行签字确认</div>
      <div class="success-desc" v-else>创建的是「无校验身份」确认单<br/>
       可将链接发给对方进行签字确认</div>
      <div class="success-qr" v-if="qrUrl && confrimInfo.isVerifyIdentity">
        <img :src="qrUrl" alt="" width="280px">
      </div>
    </div>
</template>

<script setup>
import { ref,onMounted, onBeforeMount, onBeforeUnmount } from 'vue';
import bus from '@/eventBus/bus.js'
import yyButton from '@/antDesignComponents/yyButton/yy-button.vue'
import useConfirmInfo from '../hooks/useConfirmInfo';
import { bitable } from '@lark-base-open/js-sdk';
import { message } from 'ant-design-vue';

const { formData, confrimInfo } = useConfirmInfo()

const qrUrl = ref(null)
onMounted(() => {
  if(confrimInfo.value){
    qrUrl.value = confrimInfo.value.qrUrl
  }
})


</script>

<style lang="scss" scoped>
.success{
  max-width: 375px;
  margin: 0 auto;
  &-head{
    font-weight: 600;
    font-size: 16px;
    color: #1F2329;
    line-height: 22px;
    text-align: left;
    font-style: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
    img{
      margin-right: 6px;
    }
  }

  &-desc{
    margin-top: 8px;
    text-align: center;
    font-size: 14px;
    color: #333333;
    line-height: 20px;
    font-style: normal;
    margin-bottom: 24px;
  }

  &-qr{
    width: 280px;
    height: auto;
    background: #FFFFFF;
    border-radius: 6px;
    border: 1px solid #E4E7ED;
    margin: 0 auto;
    overflow: hidden;
    img{
      width: 278px;
    }
  }

  &-btn{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;

    .ant-button{
      height: 32px!important;
    }
  }
}

.success-isVerifyIdentity{
  padding-top: 54px;
}
</style>