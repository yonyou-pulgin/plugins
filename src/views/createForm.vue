<template>
  <div class="loading-container" v-if="loading">
    <div class="loading-gif"></div>
    <span>{{ $t('baseSetting.createLoading') }}</span>
  </div>
  <div class="create-container">
    <div class="create-container-title">
      <span>{{ $t('confirmTitle') }}</span>
    </div>
    <yySteps class="plugins-steps" :steps="stepList"
      :indes="current" @next="handleNext" @prev="handlePrev">
      <addGroup />
      <yy-button v-if="current && current < stepList.length - 1 && current != stepList.length - 1"
        class="steps-action-button yy-custom-btn-operate" @click="handlePrev">{{ $t('baseSetting.prevBtn') }}</yy-button>
      <yy-button v-if="current == 0 && current != stepList.length - 1" class="steps-action-button yy-custom-btn-operate"
        @click="handlePreview">{{ $t('baseSetting.previewBtn') }}</yy-button>
      <yy-button :disabled="nextStepDisabled" v-if="current < stepList.length - 1" type="primary"
        @click="handleNext">{{ $t('baseSetting.nextBtn') }}</yy-button>
      <template v-if="current == 2">
        <template v-if="confirmResult.isVerifyIdentity">
          <yy-button class="steps-action-button yy-custom-btn-operate" @click="handleCopyLink">{{ $t('baseSetting.previewBtn') }}</yy-button>
          <yy-button type="primary" @click="handleDownQr">{{ $t('baseSetting.previewBtn') }}</yy-button>
        </template>
        <!-- <yy-button v-else type="primary" @click="closePlugin">完成</yy-button> -->
      </template>
    </yySteps>
  </div>
  <yy-modal customClass="edit-confirm-modal" :width="280" :title="$t('editSetting.editTitle')" v-model:open="editVisible" 
  :isHeaderBottomBorder="false" :footer="null" @cancel="handleVisible" >
    <div class="edit-content">
      <div class="edit-content-desc">
        {{ $t('editSetting.editContent') }}
      </div>
      <yy-button type="primary" @click="getConfirmDetails">   {{ $t('editSetting.editBtn') }}</yy-button>
      <yy-button @click="handleClick">   {{ $t('editSetting.downBtn') }}</yy-button>
    </div>
  </yy-modal>
</template>

<script setup>
import { bitable } from '@lark-base-open/js-sdk';
import { ref, reactive, onMounted, watch, computed, nextTick, onBeforeUnmount} from 'vue'
import { message } from 'ant-design-vue';
import useClipboard from 'vue-clipboard3'
import { createConfirm, confirmUpdate, getConfirmInfo, confirmOperate, confirmPreview } from '@/api/api.js';
import yySteps from '@/antDesignComponents/business-components/yySteps/yy-steps.vue'
import yyButton from '@/antDesignComponents/yyButton/yy-button.vue';
import yyModal from '@/antDesignComponents/yyModal/yy-modal.vue';
import firstStep from './home.vue'
import secondStep from './secondStep.vue'
import threeStep from './fromSuccess.vue'
import bus from '@/eventBus/bus.js'
import yyInput from '@/antDesignComponents/yyInput/yy-input.vue';
import useConfirmInfo from '@/hooks/useConfirmInfo'
import useTableBase from '@/hooks/useTableBase.js';
import { detail } from './data';
import jslog from 'jsLog';
import addGroup from './components/addGroup.vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { toClipboard } = useClipboard()
const { setTableInfo, tableInfo, tenantKey, addField, userId, fieldList, tableData, tableName, addImgField, getCellUrlResult, checkHasAttachment,
  addFormulaField, addSingleSelectField, closePlugin, addFormulaLinkField, setUserField, findFieldIndex, tableIdChangeFlag, confirmId:currentConfirm,
  deleteField, sheetList } = useTableBase();
const { formData, setFormData, resetFormData, setConfrimInfo, getCacheFormData, editDataFlag } = useConfirmInfo()

const loading = ref(false)
const current = ref(0)
const confirmResult = ref(null)
const errorMessages = ref('')
const insertFieldParams = ref({}) // 插入字段需要参数
const initFlag = ref(false)
const editVisible = ref(false)
const editDetail = ref(null) // 编辑详情对比
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
  // 仅签字确认 无需选择字段
  if(formData.value.confirmType == 1) return true
  return fieldSort.filter(item => (item.id ? item.checked : item)).length || 0
})


const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

watch(() => currentConfirm.value, (val) => {
  if(val){
    editVisible.value = true
    // getConfirmDetails()
  }
})

const jslogInstance = new jslog();
const handleClick = () => {
  try {
    jslogInstance.push({
      eventId: "plugin_downBtn",
      name: '批量下载按钮',
      params: `${currentConfirm.value}`
    })
  } catch (error) {
    console.log(error);
  }
  message.info({
    content: t('baseSetting.downBtnTip'),
    class: 'yy-message-error',
  })
}
// 获取确认单详情
const getConfirmDetails = async () => {
  resetFormData()
  current.value = 0
  getConfirmInfo({
    confirmId: currentConfirm.value
  }).then(res => {
    editVisible.value = false
    if(res.code == 0){
      const { data } = res
      data.key = +new Date()
      data.confirmId = currentConfirm.value
      data.isHiddenEmpty = !!data.isHiddenEmpty
      data.isHiddenZero = !!data.isHiddenZero
      data.isVerifyIdentity = !!data.isVerifyIdentity
      data.isNewRecordConfirm = !!data.isNewRecordConfirm
      data.tableName = data.confirmName
      editDetail.value = Object.assign({}, data)
      // 兼容字段是否存在
      if(!data.hasOwnProperty('autoLinkSelected')){
        data.formulaLink = true
      } else {
        data.formulaLink = !!data.autoLinkSelected
      }
      editDataFlag.value = true
      setFormData(data)
    } else {
      currentConfirm.value = null
      message.error({
        content: res.msg,
        class: 'yy-message-error',
      })
    }
  })
}

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
  nextTick(() => {
    formData.value.key = +Date.now()
  })
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
  params.env = tableInfo.value.env
  params.lang = tableInfo.value.lang
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
  params.fieldSort = params.fieldSort?.filter(item => item.checked).map(item => item.id)
  if(params.configFields){
    params.configFields = params.configFields?.map((item, index) => {
      item.sort = index + 1
      return item
    })
  } else {
    params.configFields = [{ mdnFieldName: null, mdnFieldId: null, sort: 1}]
  }
  if (params.isNewRecordConfirm && !params.personalBaseToken) errorMessages.value = t('secondSetting.tableAuthCodeTip')
  return params
}
// 校验排序字段是否存在
const checkSortField = (sortFields = []) => {
  const allFieldsId = fieldList.value.map(item => item.id)
  return new Promise((resolve, reject) => {
    sortFields.findIndex(item => !allFieldsId.includes(item)) > -1 ? resolve(true) : resolve(false)
  })
}
const handleSubmit = async () => {
  loading.value = true
  findFieldIndex(fieldList.value)
  const params = getParams()

  if(!params.isNewRecordConfirm) params.autoLinkSelected = 0
  else params.autoLinkSelected = +params.formulaLink
  // 校验排序字段是否存在
  const checkResult = await checkSortField(params.fieldSort)
  if (params.confirmType ==2 && (!params.fieldSort ||!params.fieldSort.length || checkResult)) {
    message.error({
      content: t('field.sortDesc') || '排序字段不存在',
      class: 'yy-message-error',
    })
    current.value = 0
    resetFormData()
    loading.value = false
    return false
  }
  // 核查有没有附件
  const attachmentFieldList = await checkHasAttachment(tableInfo.value.tableId)

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
  // 编辑
  if(params.confirmId && currentConfirm.value){
    params.operate = 'update'
    if(!params.personalBaseToken && editDetail.value.personalBaseToken){
      message.error({
        content: t('secondSetting.tableAuthCodeTip'),
        class: 'yy-message-error',
      })
      loading.value = false
      return false
    }

  }

  const myNextTick = async () => {
    
    let observerOption = {
      childList: true,
      attributes: true,
      subTree: true
    }

    const observer = new MutationObserver(() => {
      cb()
    })


    observer.observe(document.querySelector('.ant-modal-body'), observerOption)
  }

  const loop = (arr) => {
    let result = [[]]

    for (item of arr){
      const length = result.length 

      for(let i = 0 ; i < length; i++){
        result[i].push([item])
      }
    }
  }


function combinations(nums) { // [1,2,3]
  const result = [];
  function backtrack(currentSubset, startIndex) { 
    result.push([...currentSubset]); // [[]] [[], [1]]
    for (let i = startIndex; i < nums.length; i++) {
      currentSubset.push(nums[i]); // [1]
      backtrack(currentSubset, i + 1); // [1] , 1
      currentSubset.pop();[]
    }
  }
  backtrack([], 0);
  return result;
}
  console.log(combinations([1,2,3]));
  confirmOperate(params).then(async (res) => {
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
      // 设置确认单信息
      setConfrimInfo(res.data)
      // 编辑逻辑
      if(params.confirmId && currentConfirm.value){
        currentConfirm.value =  null
        delete formData.value.confirmId
        loading.value = false

        if(params.isNewRecordConfirm) handleEditUpdateField(params, insertFieldParams.value)
        if(editDetail.value.autoLinkSelected && !params.autoLinkSelected) handleDeleteField(params, confirmId)
        // 更新字段
        return false
      }
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

const handleDeleteField = async (params, confirmId) => {
  let { configFields = [] } = editDetail.value
  configFields.map(item => {
    if(item.autoLinkFieldId){
      deleteField(params.tableId, item.autoLinkFieldId)
      item.autoLinkFieldId = null
    }
  })
   await confirmUpdate({
    confirmId,
    configFields
   });
}
//  修改更新字段
const handleEditUpdateField = async (params, insertFieldParams) => {
  let { configFields = [] } = params
  const { formulaLink, currentTableId, successRecords, formulaUrlEmp } = insertFieldParams
  if(params.formulaLink && params.formulaLink != editDetail.value.formulaLink && configFields[0] && !configFields[0].autoLinkFieldId){
    const promiseFns = configFields.map((item, index) => {
      const insertIndex = index++;
      const routeFieldId = item.signPeopleFieldId || item.mdnFieldId || '';
      const sort = item.sort || 1;
      return addFormulaLinkField(insertIndex, currentTableId, `${formulaUrlEmp}&field_id=${routeFieldId}&sort=${sort}`);
    });
    const results = await Promise.all(promiseFns);
    configFields = configFields.map((item, index) => {
      return {
        ...item,
        ...results[index]
      }
    })
    await confirmUpdate({
      confirmId: params.confirmId, 
      configFields
    });
  }
}

// 创建更新字段
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
  let index = 0
  for (const item of configFieldsPromise) {
    let insertIndex = index++
    let fieldArr = []
        // 延迟1秒，等字段创建完保证顺序执行
    let time = 2000
    await delay(time)
    // 处理多级签字人
    if (signType) {
      fieldArr.push(setUserField(insertIndex, currentTableId, item.signPeopleFieldId, successRecords))
    }
    let routeFieldId = item.signPeopleFieldId || item.mdnFieldId || ''
    let sort = item.sort || 0
    let loginUrl = `${confirmResult.value.domain}/salary/wx/h5/index.html#/pluginsLogin?userType=0&confirmId=${confirmId}`
    // 无身份、无授权插入链接
    if (!isNewRecordConfirm && !isVerifyIdentity) {
    
      fieldArr.push(addField(insertIndex, currentTableId, `${formulaUrlEmp}&field_id=${routeFieldId}&sort=${sort}`, successRecords, t('field.sign')))
    } else if (!isNewRecordConfirm && isVerifyIdentity) {
      // 有身份 、无授权 插入链接、二维码
      fieldArr.push(addField(insertIndex, currentTableId, `${createUserViewUrl}&field_id=${routeFieldId}&sort=${sort}`, successRecords, t('field.result'), t('field.sendDesc')`${loginUrl}`))
      fieldArr.push(addImgField(insertIndex, currentTableId, qrUrl, successRecords))
    } else {
      // 有授权  插入公式、状态
      if (isVerifyIdentity) {
        fieldArr.push(addSingleSelectField(insertIndex, currentTableId))
        fieldArr.push(addFormulaField(insertIndex, currentTableId, `${formulaUrl}&field_id=${routeFieldId}&sort=${sort}`, t('field.sign'), t('field.sendDesc')`${loginUrl}`))
        if (formulaLink) fieldArr.push(addFormulaLinkField(insertIndex, currentTableId, `${loginUrl}&field_id=${routeFieldId}&sort=${sort}`, t('field.formarlLink'), false))
      } else {
        fieldArr.push(addSingleSelectField(insertIndex, currentTableId))
        fieldArr.push(addFormulaField(insertIndex, currentTableId, `${formulaUrlEmp}&field_id=${routeFieldId}&sort=${sort}`, ))
        if (formulaLink) fieldArr.push(addFormulaLinkField(insertIndex, currentTableId, `${formulaUrlEmp}&field_id=${routeFieldId}&sort=${sort}`,))
      }
    }
    item.promiseFun = fieldArr
  }
  return configFieldsPromise
}

const handleCopyLink = async () => {
  try {
    await toClipboard(`${t(fieldList.invite1)}${confirmResult.value.confirmName || '数据表'}${t(fieldList.invite2)}` + confirmResult.value.userViewUrl)
    message.success({
      content: t('field.copyLink'),
      class: 'yy-message-success',
    })
  } catch (e) {
  }
}

const handleDownQr = () => {
  message.success({
    content: t('field.qrDown'),
    class: 'yy-message-success',
  })
  setTimeout(() => {
    window.open(`${confirmResult.value.domain}/feishuapi/bitable/confirm/qrcode/${confirmResult.value.confirmId}`)
  })
}

watch(() => formData.value, async(val) => {
  if(!initFlag.value) current.value = val.currentStep || 0
  const currentTableId = tableInfo.value.tableId
  const cacheTableId = val.dataSheet || val.tableId
  const sheetListId = sheetList.value.map(item => item.id) || [];
  // fix 缓存数据表不存在时，切换表单数据表
  if(sheetListId.length && !sheetListId.includes(cacheTableId) && !initFlag.value){
    // 切换表
 
    current.value = 0
    formData.value.dataSheet = currentTableId
    formData.value.personalBaseToken = ''
    // formData.value.signType = 0
    const table = await bitable.base.getTable(currentTableId);
    tableInfo.value.tableId = table.id
    setTableInfo(tableInfo.value, 'change')
    initFlag.value = true
    return false
  }
  if(currentTableId && currentTableId != cacheTableId){
    // 切换表
    const table = await bitable.base.getTable(cacheTableId);
    tableInfo.value.tableId = table.id
    setTableInfo(tableInfo.value, 'change')
  }
  initFlag.value = true
}, { deep: true})

const handleVisible = () => {
  delete formData.value.confirmId
  currentConfirm.value = null
  editVisible.value = false
}
// 获取数据

getCacheFormData()
onMounted(async () => {
  stepList.value = stepList.value.map((item, index) => {
    if(tableInfo.value.lang != 'zh'){
      item.title = t('baseSetting.step' + (index + 1))
    }
    return item
  })
  // 比较当前表格和缓存表格是否一致  切换baseId 清空授权码
  const cacheBaseId = await bitable.bridge.getData('yy-baseId')
  const currentBaseId = tableInfo.value.baseId
  if(cacheBaseId && typeof cacheBaseId == 'string' && cacheBaseId != currentBaseId) {
    await bitable.bridge.setData('yy-auth-code', {})
    formData.value.personalBaseToken = ''
  }
})
onBeforeUnmount(() => {
  delete formData.value.confirmId
  // confirmId.value = null
  setTableInfo.value = null
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
// 编辑弹窗
.edit-confirm-modal{
  .ant-modal-header{
    padding: 0 20px!important;
  }
}
.edit-content{
  padding: 0 4px 24px;
  display: flex;
  flex-direction: column;
  &-desc{
    font-weight: 400;
    font-size: 14px;
    color: #333333;
    line-height: 22px;
    margin-bottom: 17px;
  }
  .yy-button{
    width: 100%;
    &:first-child{
      margin-bottom: 16px;
    }
  }
  .yy-button + .yy-button{
    margin-left: 0;
    margin-top: 12px;
  }
}
</style>