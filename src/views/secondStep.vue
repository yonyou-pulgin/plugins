<template>
  <div class="second-container">
    <div class="form-item">
      <span class="form-item-label">确认单名称</span>
      <yy-input :maxlength="50" v-model:value="currentTableName" placeholder="请输入确认单名称" @change="handleChangeTableName"></yy-input>
    </div>

    <signType :isVerifyIdentity="fromData.isVerifyIdentity" class="sign-type-content" />
    <!-- <div class="form-item form-item-row">
      <span class="form-item-label">签字确认是否验证身份&nbsp;
        <yy-tooltip :overlayStyle="{'width': '200px'}" content="开启后，成员需要手机号验证才能签字。"></yy-tooltip>
      </span>
      <yy-switch v-model:checked="fromData.isVerifyIdentity"></yy-switch>
    </div>
    <div class="form-item" v-if="fromData.isVerifyIdentity">
      <span class="form-item-labelTitle required">手机号（用于成员身份校验）</span>
      <yy-select class="yy-fs-from-item" :class="{'yy-fs-from-item-error': checkPhoneFieldFlag }" placeholder="请选择手机号列" :showArrow="true" :options="phoneFields" v-model:value="fromData.mdnFieldId" ></yy-select>
    </div> -->
    <div class="form-item form-item-row">
      <span class="form-item-label">表中新增数据是否同步创建确认单&nbsp;
        <yy-tooltip :overlayStyle="{'width': '200px'}" content="开启后，当数据表新增一行记录时，自动创建一个确认单。"></yy-tooltip>
      </span>
      <yy-switch v-model:checked="fromData.isNewRecordConfirm"></yy-switch>
    </div>
    <div class="form-item" v-if="fromData.isNewRecordConfirm">
      <span class="form-item-labelTitle">多维表授权码
        <div class="link-btn" @click="handleGetAuth">如何获得授权码？</div>
      </span>
      <yy-input :maxlength="100" v-model:value="fromData.personalBaseToken" placeholder="请填写授权码"></yy-input>
    </div>

    <div class="form-item form-item-row" style="justify-content: flex-start;" v-if="fromData.isNewRecordConfirm">
      <a-checkbox v-model:checked="fromData.formulaLink">增加自动化签字链接列</a-checkbox>
      <yy-tooltip :overlayStyle="{'width': '200px'}" content="勾选后创建多维表自动化流程，可以实现飞书推送签字消息"></yy-tooltip>
    </div>

    <getAuthCode ref="getAuthCodeInstance" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed, watchEffect } from 'vue'
import yySelect from '@/antDesignComponents/yySelect/yy-select.vue'
import yyInput from '@/antDesignComponents/yyInput/yy-input.vue'
import yySwitch from '@/antDesignComponents/yySwitch/yy-switch.vue'
import yyTooltip from '@/antDesignComponents/yyTooltip/yy-tooltip.vue'
import yyButton from '@/antDesignComponents/yyButton/yy-button.vue'
import signType from './signType/index.vue'
import getAuthCode from './getAuthCode.vue'
import useTableBase from '@/hooks/useTableBase.js';
import useConfirmInfo from '@/hooks/useConfirmInfo'

const { setTableInfo, tableInfo, tableName, sheetList, fieldList, tenantKey, userId, } = useTableBase();
const { setFormData, formData:cacheFormData, getCacheAuthCode } = useConfirmInfo()
const getAuthCodeInstance = ref(null)
const fromData = ref({
  tableName: null,
  mdnFieldId: null,
  personalBaseToken: null, // 授权码
  isVerifyIdentity: true, // 是否验证身份
  isNewRecordConfirm: true, // 是否新增数据同步创建确认单
  currentStep: 1,
  formulaLink: true,
  signType: 0, //  0 单人签字、1 多人签字
  configFields: []
})

const currentTableName = ref('')
const personalBaseToken = ref('')

// 手机号列
const phoneFields = computed(() => {
  return fieldList.value.filter(item => item.type!=17) || []
})

const handleGetAuth = () => {
  getAuthCodeInstance.value.open()
}

const handleChangeTableName = () => {
  fromData.value.tableName = currentTableName.value
}

watch(() => [fromData.value, currentTableName.value], () => {
  setFormData(fromData.value)
}, { deep: true })

onMounted(async() => {
  currentTableName.value = cacheFormData.value.tableName || tableName.value
  const { personalBaseToken, mdnFieldId, isVerifyIdentity = false, isNewRecordConfirm = false } = cacheFormData.value
  fromData.value = Object.assign(fromData.value , {
    personalBaseToken, mdnFieldId, isVerifyIdentity, isNewRecordConfirm
  })
  fromData.value.tableName = currentTableName.value
  if(cacheFormData.value.hasOwnProperty('formulaLink'))fromData.value.formulaLink = cacheFormData.value.formulaLink
  //  获取授权码
  const authCode = await getCacheAuthCode()
  if(authCode){
    fromData.value.personalBaseToken = authCode
  }

})
</script>

<style lang="scss" scoped>
.second{
  &-container {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    font-size: 30px;
    font-weight: 600;
  }
}

.form{
  &-container{
    max-width: 525px;
    margin: 0 auto;
    padding: 0 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  &-item{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 16px;
    padding: 0 20px;

    &-row{
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 9px;
      .form-item-label{
       margin-bottom: 0;
      }
    }

    &-label{
      font-size: 14px;
      color: #1F2329;
      line-height: 20px;
      text-align: left;
      font-style: normal;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      .icon-tooltip{
        margin-left: 6px!important;
      }
    }

    &-labelTitle{
      font-size: 14px;
      color: #1F2329;
      line-height: 20px;
      text-align: left;
      font-style: normal;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      font-weight: 400;
      .icon-tooltip{
        margin-left: 6px!important;
      }

      .link-btn{
        font-weight: 400;
        font-size: 14px;
        color: #3A75FF;
        line-height: 20px;
        text-align: left;
        font-style: normal;
        cursor: pointer;
        margin-left: 6px;
        &:hover{
          color: #6191FF;
        }
      }
    }

    &-empty{
      font-size: 12px;
      color: #8F959E;
      line-height: 18px;
      text-align: left;
      font-style: normal;
    }

    .form-item-checkbox-group{
      align-self: flex-start;
      margin-bottom: 12px;
    }

    .yy-fs-from-item{
      width: 100%!important;
    }
    .yy-fs-from-item-error{
      width: 100%!important;
      position: relative;
      margin-bottom: 16px;
      .ant-select-selector{
        border-color: #FD3B3A!important;
      }
      &::after{
        content: '请选择正确的手机号列';
        position: absolute;
        left: 1px;
        top: 36px;
        font-size: 12px;
        color: #FD3B3A;
      }
    }
  }
}
.sign-type-content{
  margin-bottom: 16px;
}
</style>

<style>
.ant-checkbox+span {
  padding-left: 8px!important;
  padding-right: 6px!important;
}
</style>