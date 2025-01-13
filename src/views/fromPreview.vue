<template>
  <yy-modal
    v-model:open="visilbe"
    class="form-preview-yy-modal"
    :footer="null">
    <div class="modal-container">
      <div class="modal-head">
        <div class="modal-head-title">{{ data && data.confirmName }}</div>
        <span>未确认</span>
      </div>
      <div class="flex-1">
        <div class="modal-cotent" v-if='data.confirmType == 1'>
          <div class="modal-content-item" :class="{'modal-content-item-row': (item.value && item.value.length > hasTitleLen) || item.name.length > hasTitleLen}" v-for="item in previewInfo" :key="item.id">
            <template v-if="item.fieldType != 17">
              <div class="modal-content-item-label">{{ item.name }}</div>
              <div class="modal-content-item-content"  :class="{ 'modal-content-item-text' : item.fieldType == 1}"  v-html="item.value || '-' "></div>
            </template>
            <template v-else>
              <div class="attachment-field" v-if="item.propertyData && item.propertyData.attachmentUrls && item.propertyData.attachmentUrls.length">
                <div class="modal-content-item-label item-name">{{ item.name }} <span>（图片点击放大）</span></div>
                <div class="modal-content-item-content item-value">
                  <a-image-preview-group>
                    <a-image :width="80" :height="80" v-for="(itemUrl, index) in item.propertyData.attachmentUrls" :key="index" :src="itemUrl" />
                  </a-image-preview-group>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="sign-content">
          <div class="sign-content-head">签字确认</div>
          <div class="sign-content-desc">请在下方灰色区域内签字</div>
          <div class="sign-content-box"></div>
          <div class="sign-content-btn">
            <div class="btn-reset">清除重写</div>
            <div class="btn-sign">签好了，提交</div>
          </div>
        </div>
        </div>
    </div>
  </yy-modal>
</template>

<script setup>
import { ref, watchEffect, onMounted, nextTick, watch } from 'vue';
import yyModal from '@/antDesignComponents/yyModal/yy-modal.vue';
import { image, imagePreviewGroup } from 'ant-design-vue'

const hasTitleLen = ref(10) // 标题最大长度
const props = defineProps({
  data: {
    default: () => ({ }),
  },
})

const previewInfo = ref([])
const visilbe = ref(false);

watch(() => props.data, (val) => {
  if(props.data && props.data.fields){
    previewInfo.value = props.data.fields || []
  }
}, {deep: true, immediate: true})
const open = () =>{
  visilbe.value = true
  nextTick(() => {  
    const boxWidth = document.querySelector('.modal-container').getBoundingClientRect().width;
    hasTitleLen.value = parseInt(boxWidth/ 30) || 10

    const clientHeight = document.querySelector('body').clientHeight
    const clientWidth = document.querySelector('body').clientWidth
    const ele = document.querySelector('.modal-container')
    if(ele){
      document.querySelector('.modal-container').style.maxHeight = clientHeight - 80 + 'px'
      document.querySelector('.modal-container').style.maxWidth = clientWidth - 40 + 'px'
    }
  })
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
.modal {
  &-container {
    max-width: 375px;
    min-height: 300px;
    height: 80%;
    overflow-y: scroll;
    background: #fff;
    display: flex;
    flex-direction: column;
    &::-webkit-scrollbar {
      width: 0!important;
      height: 0!important;
    }
    .flex-1{
      flex: 1;
      overflow-y: scroll;
      &::-webkit-scrollbar{
        width: 0!important;
      }
    }
  }

  &-head {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 18px 15px 10px;
    font-weight: 600;
    font-size: 15px;
    color: #333333;
    position: relative;
    &::before {
      content: '';
      display: block;
      width: 4px;
      height: 14px;
      background: #3a75ff;
      position: absolute;
      left: 0px;
    }
    span {
      display: inline-block;
      width: 48px;
      height: 20px;
      background: #ff8b00;
      font-weight: initial!important;
      border-radius: 4px;
      margin-left: 10px;
      font-size: 12px;
      color: #fff;
      text-align: center;
      line-height: 20px;
    }

    &-title{
      font-size: 14px;
      line-height: 16px;
      max-width: 50%;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
  }



  &-content{
    &:last-child{
      border-bottom: none!important;
    }
    &-item {
      border-bottom: none;
        &:last-child{
            border-bottom: none!important;
        }
    }
  }

  &-content-item {
    display: flex;
    flex-direction: row;
    border-bottom: 1px dashed #f2f4f7;
    &-label {
      max-width: 40%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 45px;
      margin-right: 8px;
      min-height: 45px;
    }
    &-content {
      flex: 1;
      line-height: 45px;
      text-align: right;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &-text{
       white-space: pre-wrap; 
    }
  }
  &-content-item-row {
    flex-direction: column;
    justify-content: flex-start;
    .modal-content-item-content{
      line-height: 20px;
      text-align: left;
      margin-bottom: 10px;
    }
  }
}

.sign-content {
  position: relative;
  padding-bottom: 15px;
  &::before {
    content: '';
    display: block;
    height: 10px;
    background: #f2f4f7;
    position: absolute;
    left: -15px;
    right: -15px;
    top: -15px;
  }
  &-head {
    font-weight: 600;
    font-size: 15px;
    color: #333333;
    line-height: 19px;
    text-align: left;
    font-style: normal;
    margin-bottom: 6px;
    margin-top: 15px;
  }
  &-desc {
    font-size: 14px;
    color: #8f959e;
    line-height: 19px;
    text-align: left;
    font-style: normal;
    margin-bottom: 15px;
  }
  &-box {
    height: 275px;
    width: 100%;
    background: #f5f6f7;
    border-radius: 6px;
    border: 1px solid #dee0e3;
  }

  &-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    .btn-reset {
      width: 40%;
      height: 44px;
      border-radius: 4px;
      font-size: 14px;
      color: #1f2329;
      text-align: center !important;
      font-size: 15px;
      line-height: 44px;
      color: #909399;
      text-align: left;
      font-style: normal;
      border: 1px solid #bcc2cc;
      margin-right: 10px;
    }
    .btn-sign {
      width: calc(60% - 10px);
      height: 44px;
      border-radius: 4px;
      font-size: 14px;
      background: #9cbaff;
      text-align: center !important;
      font-size: 15px;
      line-height: 44px;
      color: #fff;
      text-align: left;
      font-style: normal;
      border: 1px solid #bcc2cc;
    }
  }
}
</style>

<style lang="scss">
.form-preview-yy-modal{
  max-width: 375px;
}

.attachment-field {
  display: flex;
  flex-direction: column;

  .item-name {
    max-width: initial;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    span {
      color: #909399;
    }
  }

  .item-value {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .ant-image {
      width: 80px;
      height: 80px;
      border-radius: 3px;
      margin-right: 9px;
      margin-bottom: 9px;
    }
  }
}
</style>
