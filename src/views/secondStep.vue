<template>
  <div class="second-container">
    <div class="form-item">
      <span class="form-item-label"> {{ $t('secondSetting.confirmName') }}</span>
      <yy-input :maxlength="50" v-model:value="currentTableName" :placeholder="$t('secondSetting.confirmNameTip')" @change="handleChangeTableName"></yy-input>
    </div>

    <signType class="sign-type-content" />
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
      <span class="form-item-label"> {{ $t('secondSetting.confirmSync') }}&nbsp;
        <yy-tooltip :overlayStyle="{'width': '200px'}" :content="$t('secondSetting.confirmSyncTip') "></yy-tooltip>
      </span>
      <yy-switch :disabled="isEditVisible" v-model:checked="fromData.isNewRecordConfirm"></yy-switch>
    </div>
    <div class="form-item" v-if="fromData.isNewRecordConfirm">
      <span class="form-item-labelTitle">{{ $t('secondSetting.tableAuthCode') }}
        <div class="link-btn" @click="handleGetAuth">{{ $t('secondSetting.tableAuthCodeTip2') }}</div>
      </span>
      <yy-input :maxlength="100" v-model:value="fromData.personalBaseToken" :placeholder="$t('secondSetting.tableAuthCodeTip')"></yy-input>
    </div>

    <div class="form-item form-item-row" style="justify-content: flex-start;" v-if="fromData.isNewRecordConfirm">
      <a-checkbox v-model:checked="fromData.formulaLink">{{ $t('secondSetting.addFormalField') }}</a-checkbox>
      <yy-tooltip :overlayStyle="{'width': '200px'}" :content="$t('secondSetting.addFormalField')"></yy-tooltip>
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

const { setTableInfo, tableInfo, tableName, sheetList, fieldList, tenantKey, userId, tableIdChangeFlag, confirmId } = useTableBase();
const { setFormData, formData:cacheFormData, getCacheAuthCode } = useConfirmInfo()
const getAuthCodeInstance = ref(null)
const fromData = ref({
  tableName: null,
  personalBaseToken: null, // 授权码
  isNewRecordConfirm: true, // 是否新增数据同步创建确认单
  currentStep: 1,
  formulaLink: true,
})

const currentTableName = ref('')
const personalBaseToken = ref('')

// 手机号列
const phoneFields = computed(() => {
  return fieldList.value.filter(item => item.type!=17) || []
})
const isEditVisible = computed(() => {
  return confirmId.value && cacheFormData.value.confirmId ? true : false
})

const handleEditToast = () => {
  message.error({
    content: '不可修改！如需修改，请重新创建确认单',
    class: 'yy-message-error',
  })
}
const handleGetAuth = () => {
  getAuthCodeInstance.value.open()
}

const handleChangeTableName = () => {
  fromData.value.tableName = currentTableName.value
}

watch(() => [fromData.value], () => {
  setFormData(fromData.value)
}, { deep: true })

watch(() => cacheFormData.value, (val) => {
  if(isEditVisible.value && confirmId.value){
    currentTableName.value = val.tableName || val.confirmName 
    fromData.value.formulaLink = val.formulaLink
  }
})

onMounted(async() => {
  currentTableName.value = cacheFormData.value.tableName || tableName.value
  const { personalBaseToken, isNewRecordConfirm = false } = cacheFormData.value
  fromData.value = Object.assign(fromData.value , {
    personalBaseToken, isNewRecordConfirm
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