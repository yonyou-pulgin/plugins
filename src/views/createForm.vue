<template>
  <div class="loading-container" v-if="loading">
    <div class="loading-gif"></div>
    <span>创建中，请稍等</span>
  </div>
  <div class="create-container">
    <div class="create-container-title">
      <span>对多维表中数据进行签字确认</span>
    </div>
    <yySteps class="plugins-steps" :class="{ 'plugins-steps-isVerifyIdentity': isVerifyIdentityCheck }" :steps="stepList"
      :indes="current" @next="handleNext" @prev="handlePrev">
      <yy-button v-if="current && current < stepList.length - 1 && current != stepList.length - 1"
        class="steps-action-button yy-custom-btn-operate" @click="handlePrev">上一步</yy-button>
      <yy-button v-if="current == 0 && current != stepList.length - 1" class="steps-action-button yy-custom-btn-operate"
        @click="handlePreview">在线预览</yy-button>
      <yy-button :disabled="nextStepDisabled" v-if="current < stepList.length - 1" type="primary"
        @click="handleNext">下一步</yy-button>
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
  addFormulaField, addSingleSelectField, closePlugin, addFormulaLinkField, setUserField, findFieldIndex, tableIdChangeFlag } = useTableBase();
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
  if (current.value) {
    if (isVerifyIdentity && !configFields.length) return true
    // 权限校验
    if (isVerifyIdentity) return configFields.filter(item => !item.mdnFieldId).length
    // 签字字段校验
    if (signType) {
      return configFields.filter(item => !item.signPeopleFieldId).length
    }
  }
  return loading.value || (current.value == 0 && !selectFieldFlag.value)
})

const isVerifyIdentityCheck = computed(() => {
  return current.value == 2 && confirmResult.value && !confirmResult.value.isVerifyIdentity
})
// 选中的字段id
const selectFieldFlag = computed(() => {
  const fieldSort = formData.value.fieldSort || []
  return fieldSort.filter(item => item.checked).length || 0
})

watch(() => tableIdChangeFlag.value, () => {
  current.value = 0 
  nextTick(() => {
    tableIdChangeFlag.value = false
  })
}, {deep: true })

const handleNext = () => {
  //current.value++
  if (current.value == stepList.value.length - 2) {
    // 提交
    handleSubmit()
  } else {
    if (current.value == 0 && !selectFieldFlag.value) {
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
const arrToObj = (arr) => {
  return arr.reduce((prev, next) => {
    return Object.assign(prev, next)
  }, {});
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
  if(params.configFields){
    params.configFields = params.configFields?.map((item, index) => {
      item.sort = index + 1
      return item
    })
  } else {
    params.configFields = [{ mdnFieldName: null, mdnFieldId: null, sort: 1}]
  }
  if (params.isNewRecordConfirm && !params.personalBaseToken) errorMessages.value = '请填写授权码'
  return params
}
const handleSubmit = async () => {
  loading.value = true
  findFieldIndex(fieldList.value)
  // 核查有没有附件
  const attachmentFieldList = await checkHasAttachment(tableInfo.value.tableId)
  const params = getParams()
  let records = tableData.value
  // 没有授权码
  if (attachmentFieldList && attachmentFieldList.length && !params.isNewRecordConfirm) {
    records = await getCellUrlResult(tableInfo.value.tableId)
  }
  // 表格数据
  params.records = records
  if (errorMessages.value) {
    message.error({
      content: errorMessages.value,
      class: 'yy-message-error',
    })
    loading.value = false
    return false
  }
  createConfirm(params).then(async (res) => {
    if (res.success) {
      // 创建成功 清楚缓存数据
      resetFormData()
      current.value++
      confirmResult.value = res.data
      let confirmId = res.data.confirmId
      let url = `${res.data.domain}/feishuapi/bitable/confirm/qrcode/${res.data.confirmId}`
      const currentTableId = tableInfo.value.tableId || tableInfo.value.id
      const successRecords = res.data.successRecords || []
      insertFieldParams.value = {
        confirmId,
        currentTableId,
        successRecords,
        formulaLink: params.formulaLink,
        qrUrl: res.data.qrUrl,
        userViewUrl: res.data.userViewUrl,
        createUserViewUrl: `${confirmResult.value.domain}/salary/wx/h5/index.html#/pluginsConfirm?userType=1&confirmId=${confirmId}`,
        formulaUrl: `${confirmResult.value.domain}/salary/wx/h5/index.html#/pluginsConfirm?userType=1&confirmId=${confirmId}`,
        formulaUrlEmp: `${confirmResult.value.domain}/salary/wx/h5/index.html#/pluginsConfirm?userType=0&confirmId=${confirmId}`,
      }
      res.data.isVerifyIdentity = !!params.isVerifyIdentity
      res.data.isNewRecordConfirm = !!params.isNewRecordConfirm
      confirmResult.value.isVerifyIdentity = !!params.isVerifyIdentity
      setConfrimInfo(res.data)
      // fix loading 时间
      if(params.signType){
        setTimeout(() => {
          loading.value = false
        }, 1000 * params.configFields.length);
      }
      // 更新字段
      handleUpdateField(params, confirmId)
    } else {
      loading.value = false
      message.error({
        content: res.msg,
        class: 'yy-message-error',
      })
    }
  })
}

const handleUpdateField = async (params, confirmId) => {

  let fieldArr = await insertField(params.isNewRecordConfirm, params.isVerifyIdentity, params.configFields, params.signType)
 // 并行执行所有Promise
  const promises = fieldArr.map(item => Promise.all(item.promiseFun));
  const results = await Promise.all(promises);

  // 将结果转换为对象并更新fieldArr
  fieldArr = results.map((res, index) => {
    const obj = arrToObj(res);
    return { ...fieldArr[index], ...obj };
  });

  fieldArr.forEach(item => delete item.promiseFun);

  // 准备更新参数
  const updateParams = { confirmId, configFields: fieldArr };

  // 执行更新操作
  try {
    await confirmUpdate(updateParams);
    // 更新加载状态
    if(!params.signType) loading.value = false; 
    
  } catch (error) {
    loading.value = false; 
  }
}

// 插入字段
const insertField = async (isNewRecordConfirm, isVerifyIdentity, configFields = [], signType = 0) => {
  const {formulaLink,  currentTableId, successRecords, qrUrl, formulaUrl, userViewUrl,
    formulaUrlEmp, confirmId, createUserViewUrl } = insertFieldParams.value
  let configFieldsPromise = JSON.parse(JSON.stringify(configFields))
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  for (const item of configFieldsPromise) {
    let fieldArr = []
    // 延迟1秒，等字段创建完保证顺序执行
    let time = 1000 * configFields.length
    await delay(time)
    // 处理多级签字人
    if (signType) {
      fieldArr.push(setUserField(currentTableId, item.signPeopleFieldId, successRecords))
    }
    let routeFieldId = item.signPeopleFieldId || item.mdnFieldId || ''
    let sort = item.sort || 0
    let loginUrl = `${confirmResult.value.domain}/salary/wx/h5/index.html#/pluginsLogin?userType=0&confirmId=${confirmId}`
    // 无身份、无授权插入链接
    if (!isNewRecordConfirm && !isVerifyIdentity) {
    
      fieldArr.push(addField(currentTableId, `${formulaUrlEmp}&field_id=${routeFieldId}&sort=${sort}`, successRecords, '签字确认'))
    } else if (!isNewRecordConfirm && isVerifyIdentity) {
      // 有身份 、无授权 插入链接、二维码
      fieldArr.push(addField(currentTableId, `${createUserViewUrl}&field_id=${routeFieldId}&sort=${sort}`, successRecords, '签字确认结果', `请把链接发给签字人员：${loginUrl}`))
      fieldArr.push(addImgField(currentTableId, qrUrl, successRecords))
    } else {
      // 有授权  插入公式、状态
      if (isVerifyIdentity) {
        fieldArr.push(addSingleSelectField(currentTableId))
        fieldArr.push(addFormulaField(currentTableId, `${formulaUrl}&field_id=${routeFieldId}&sort=${sort}`, '签字确认结果', `请把链接发给签字人员：${loginUrl}`))
        if (formulaLink) fieldArr.push(addFormulaLinkField(currentTableId, `${loginUrl}&field_id=${routeFieldId}&sort=${sort}`, '自动化签字链接', false))
      } else {
        fieldArr.push(addSingleSelectField(currentTableId))
        fieldArr.push(addFormulaField(currentTableId, `${formulaUrlEmp}&field_id=${routeFieldId}&sort=${sort}`, '签字确认'))
        if (formulaLink) fieldArr.push(addFormulaLinkField(currentTableId, `${formulaUrlEmp}&field_id=${routeFieldId}&sort=${sort}`,))
      }
    }
    item.promiseFun = fieldArr
  }
  return configFieldsPromise
}

const handleCopyLink = async () => {
  try {
    await toClipboard(`邀请您对【${confirmResult.value.confirmName || '数据表'}】签字确认点击链接：` + confirmResult.value.userViewUrl)
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

onMounted(async () => {
  const result = await getCacheFormData()
  if (result && Object.values(result).length) {
    if(tableInfo.value.tableId != result.tableId){
      const selection = await bitable.base.getSelection();
      tableInfo.value.tableId = selection.tableId
      formData.value.tableId = selection.tableId
      current.value = 0
    } else {
      current.value = result.currentStep || 0
    }
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
::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
}

.plugins-steps {
  height: calc(100% - 24px);
  display: flex;
  flex-direction: column;

  .steps-content {
    flex: 1;
    overflow-y: scroll;
  }

  .steps-action {
    padding: 12px 20px !important;
  }

  .steps {
    .steps-item {}
  }
}

.plugins-steps-isVerifyIdentity .yy-steps-container {
  .steps-content {
    border-bottom: none;
  }

  .steps-action {
    display: none;
  }
}
</style>