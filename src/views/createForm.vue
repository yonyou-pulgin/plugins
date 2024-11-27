<template>
  <div class="loading-container" v-if="loading">
    <div class="loading-gif"></div>
    <span>创建中，请稍等</span>
  </div>
  <div class="create-container">
    <div class="create-container-title">
      <span>对多维表中数据进行签字确认</span>
    </div>
    <yySteps class="plugins-steps" :class="{'plugins-steps-isVerifyIdentity': isVerifyIdentityCheck}" :steps="stepList" :indes="current" @next="handleNext" @prev="handlePrev">
      <yy-button v-if="current && current < stepList.length -1 && current != stepList.length -1 " class="steps-action-button yy-custom-btn-operate" @click="handlePrev">上一步</yy-button>
      <yy-button v-if="current == 0 && current != stepList.length -1" class="steps-action-button yy-custom-btn-operate" @click="handlePreview">在线预览</yy-button>
      <yy-button :disabled="nextStepDisabled" v-if="current< stepList.length - 1" type="primary" @click="handleNext">下一步</yy-button>
      <template v-if="current == 2">
        <template v-if="confirmResult.isVerifyIdentity">
          <yy-button class="steps-action-button yy-custom-btn-operate" @click="handleCopyLink">复制链接</yy-button>
          <yy-button type="primary" @click="handleDownQr">下载二维码</yy-button>
        </template>
        <!-- <yy-button v-else type="primary" @click="closePlugin">完成</yy-button> -->
      </template>
    </yySteps>
  </div>
</template>

<script setup>
import { bitable } from '@lark-base-open/js-sdk';
import { ref, reactive, onMounted, watch, computed, nextTick } from 'vue'
import { message } from 'ant-design-vue';
import useClipboard from 'vue-clipboard3'
import { createConfirm, confirmUpdate } from '@/api/api.js';
import yySteps from '@/antDesignComponents/business-components/yySteps/yy-steps.vue'
import yyButton from '@/antDesignComponents/yyButton/yy-button.vue';
import firstStep from './home.vue'
import secondStep from './secondStep.vue'
import threeStep from './fromSuccess.vue'
import bus from '@/eventBus/bus.js'
import yyInput from '@/antDesignComponents/yyInput/yy-input.vue';
import useConfirmInfo from '@/hooks/useConfirmInfo'
import useTableBase from '@/hooks/useTableBase.js';

const { toClipboard } = useClipboard()
const { tableInfo, tenantKey, addField, userId, fieldList, tableData, tableName, addImgField, getCellUrlResult, checkHasAttachment,
 addFormulaField, addSingleSelectField, closePlugin, addFormulaLinkField, setUserField } = useTableBase();
const { formData, setFormData, getCacheFormData, resetFormData, setConfrimInfo } = useConfirmInfo()

const loading = ref(false)
const current = ref(0)
const confirmResult = ref(null)
const errorMessages = ref('')
const insertFieldParams = ref({}) // 插入字段需要参数
const stepList = ref([
  { key: 0, title: '选择数据', content: firstStep },
  { key: 1, title: '设置确认单', content: secondStep },
  { key: 2, title: '创建完成', content: threeStep },
])
// 下一步校验
const nextStepDisabled = computed(() => {
  const { signType, configFields = [], isVerifyIdentity } = formData.value
  if(current.value){
    if(isVerifyIdentity && !configFields.length ) return true
    // 权限校验
    if(isVerifyIdentity) return configFields.filter(item => !item.mdnFieldId).length
    // 签字字段校验
    if(signType){
      return configFields.filter(item => !item.signPeopleFieldId).length
    }
  }
  return loading.value || (current.value == 0 && !selectFieldFlag.value)
})

const isVerifyIdentityCheck = computed( () => {
  return current.value == 2 && confirmResult.value && !confirmResult.value.isVerifyIdentity
})
// 选中的字段id
const selectFieldFlag = computed(() => {
  const fieldSort = formData.value.fieldSort || []
  return fieldSort.filter(item => item.checked).length || 0
})

const handleNext = () => {
  //current.value++
  if(current.value == stepList.value.length - 2){
    // 提交
    handleSubmit()
  } else {
    if(current.value == 0 && !selectFieldFlag.value){
      return false
    }
    current.value++
  }
}

const handlePrev = () => {
  --current.value
}

const handlePreview = () => {
  bus.emit('preview')
}
const getParams = () => {
  errorMessages.value = ''
  const params = Object.assign({}, formData.value)
  params.baseId = tableInfo.value.baseId
  params.tableId = tableInfo.value.tableId
  params.tenantId = tableInfo.value.tenantId || tenantKey.value
  params.userId = tableInfo.value.userId || userId.value
  params.confirmName = params.tableName || tableName.value || '签字确认单'
  // 全部字段
  params.fields = fieldList.value
  // 表格数据
  params.records = tableData.value
  params.isHiddenEmpty = +params.isHiddenEmpty
  params.isHiddenZero = +params.isHiddenZero
  params.isVerifyIdentity = +params.isVerifyIdentity
  params.isNewRecordConfirm = +params.isNewRecordConfirm
  params.fieldSort = params.fieldSort.filter(item => item.checked).map(item => item.id)
  params.configFields = params.configFields.map((item, index) => {
    item.sort = index
    return item
  })
  if(params.isNewRecordConfirm && !params.personalBaseToken) errorMessages.value = '请填写授权码'
  return params
}
const handleSubmit = async() => {
  loading.value = true
  // 核查有没有附件
  const attachmentFieldList = await checkHasAttachment(tableInfo.value.tableId)
  const params = getParams()
  let records = tableData.value
  // 没有授权码
  if(attachmentFieldList && attachmentFieldList.length && !params.isNewRecordConfirm){
     records = await getCellUrlResult(tableInfo.value.tableId)
  }
  // 表格数据
  params.records = records
  if(errorMessages.value) {
    return message.error({
      content: errorMessages.value,
      class: 'yy-message-error',
    })
  }
  createConfirm(params).then(async (res) => {
    if(res.success){
      // 创建成功 清楚缓存数据
      resetFormData()
      current.value++
      confirmResult.value = res.data
      let confirmId = res.data.confirmId
      let url =`${res.data.domain}/feishuapi/bitable/confirm/qrcode/${res.data.confirmId}`
      const currentTableId = tableInfo.value.tableId || tableInfo.value.id
      const successRecords = res.data.successRecords || []
      insertFieldParams.value = {
        confirmId,
        currentTableId,
        successRecords,
        formulaLink: params.formulaLink,
        qrUrl: res.data.qrUrl,
        userViewUrl: res.data.userViewUrl,
        createUserViewUrl: res.data.createUserViewUrl + '?recordId=',
        formulaUrl: `${confirmResult.value.domain}/salary/wx/h5/index.html#/pluginsConfirm?userType=1&confirmId=${confirmId}&recordId=`,
        formulaUrlEmp: `${confirmResult.value.domain}/salary/wx/h5/index.html#/pluginsConfirm?userType=0&confirmId=${confirmId}&recordId=`,
      }
      res.data.isVerifyIdentity = !!params.isVerifyIdentity
      res.data.isNewRecordConfirm = !!params.isNewRecordConfirm
      confirmResult.value.isVerifyIdentity = !!params.isVerifyIdentity
      setConfrimInfo(res.data)
      let fieldArr = insertField(params.isNewRecordConfirm, params.isVerifyIdentity, params.configFields)
      fieldArr.map(item => {
        Promise.all(item.promiseFun).then(res => {
          if(res.length){
            let updateParams = {
              confirmId: confirmId,
            }
            res.map(item => {
              updateParams = Object.assign(updateParams,item)
              return item
            })
            confirmUpdate(updateParams).then(res => {
            })
            setTimeout(() => {
              loading.value = false
            },2000)
          }
        })
      })
    } else {
      loading.value = false
      message.error({
        content: res.msg,
        class: 'yy-message-error',
      })
    }
  })
}

// 插入字段
const insertField = (isNewRecordConfirm, isVerifyIdentity, configFields = []) => {
  const { 
        formulaLink,
        currentTableId,
        successRecords,
        qrUrl,
        formulaUrl,
        userViewUrl,
        formulaUrlEmp,
        confirmId,
        createUserViewUrl} = insertFieldParams.value
  let fieldArr = [setUserField(currentTableId, 'flde0AcAX8', successRecords)]
  let loginUrl = `${confirmResult.value.domain}/salary/wx/h5/index.html#/pluginsLogin?userType=0&confirmId=${confirmId}`
  // 无身份、无授权插入链接
  if(!isNewRecordConfirm && !isVerifyIdentity){
    fieldArr.push(addField(currentTableId, formulaUrlEmp, successRecords, '签字确认'))
  } else if (!isNewRecordConfirm && isVerifyIdentity) {
    // 有身份 、无授权 插入链接、二维码
    fieldArr.push(addField(currentTableId, createUserViewUrl, successRecords, '签字确认结果', `请把链接发给签字人员：${loginUrl}`))
    fieldArr.push(addImgField(currentTableId, qrUrl, successRecords))
  } else {
    // 有授权  插入公式、状态
    if(isVerifyIdentity){
      fieldArr.push(addSingleSelectField(currentTableId))
      fieldArr.push(addFormulaField(currentTableId, formulaUrl, '签字确认结果', `请把链接发给签字人员：${loginUrl}`))
      if(formulaLink) fieldArr.push(addFormulaLinkField(currentTableId, loginUrl, '自动化签字链接', false))
    } else {
      fieldArr.push(addSingleSelectField(currentTableId))
      fieldArr.push(addFormulaField(currentTableId, formulaUrlEmp, '签字确认'))
      if(formulaLink) fieldArr.push(addFormulaLinkField(currentTableId, formulaUrlEmp))
    }
  }

  let configFieldsPromise = JSON.parse(JSON.stringify(configFields))
  configFieldsPromise.map(item => {
    item.promiseFun = fieldArr
  })
  return configFieldsPromise
}

const handleCopyLink = async() => {
  try {
    await toClipboard(`邀请您对【${confirmResult.value.confirmName || '数据表'}】签字确认点击链接：`+confirmResult.value.userViewUrl)
    message.success({
      content: '链接已复制，点击链接后可签字确认',
      class: 'yy-message-success',
    })
  } catch (e) {
  }
}

const handleDownQr = () => {
  message.success({
    content: '二维码已下载，扫码后可签字确认',
    class: 'yy-message-success',
  })
  setTimeout(() => {
    window.open(`${confirmResult.value.domain}/feishuapi/bitable/confirm/qrcode/${confirmResult.value.confirmId}`)
  })
}

onMounted(async() => {
  const result = await getCacheFormData()
  if(result && Object.values(result).length){
    current.value = result.currentStep || 0
  }
})

</script>

<style lang="scss" scoped>
.create {
  &-container {
    min-width: 350px;
    height: 100%;
    display: flex;
    flex-direction: column;

    &-title {
      font-weight: 600;
      font-size: 16px;
      color: #1F2329;
      line-height: 24px;
      text-align: center;
    }


  }
}
</style>
<style lang="scss">
::-webkit-scrollbar{
  width: 0!important;
  height: 0!important;
}
.plugins-steps {
  height: calc(100% - 24px);
  display: flex;
  flex-direction: column;
  .steps-content{
      flex: 1;
      overflow-y: scroll;
  }
  .steps-action{
    padding: 12px 20px!important;
  }
  .steps{
    .steps-item{
    }
  }
}
.plugins-steps-isVerifyIdentity .yy-steps-container{
  .steps-content{
    border-bottom: none;
  }
  .steps-action{
    display: none;
  }
}
</style>