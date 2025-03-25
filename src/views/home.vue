<template>
  <div class="form-container">
    <div class="loading-container" v-if="previewLoading">
      <div class="loading-gif"></div>
      <span>{{ $t('previewLoading') }}</span>
    </div>
    <div class="form-content">
      <div class="form-item" @click="handleEditToast">
        <span class="form-item-label required">{{ $t('selectTable') }}</span>
        <yy-select :disabled="isEditVisible" class="yy-fs-from-item" :placeholder="$t('selectTableTip')" :showArrow="true" :options="sheetList" v-model:value="dataSheet" @change="handleDataSheet(dataSheet, '')"></yy-select>
      </div>
      <div class="form-item">
        <div class="form-item-label required">{{ $t('confirmType') }}
          <yy-tooltip style="margin-top: 4px;" overlayClassName="type-tooltips" placement="bottom" :arrowPointAtCenter="false"	isWhite :autoAdjustOverflow="true">
            <template #title>
              <img :src="tipsUrl" width="306" />
            </template>
          </yy-tooltip>
        </div>
        <div class="yy-from-radio">
          <a-radio-group v-model:value="formStep1Data.confirmType">
            <a-radio class="plugin-form-radio" v-for="item in [{label: $t('confirmTypeRadio1'), value:  2}, {label: $t('confirmTypeRadio2'), value: 1}]" 
              :key="item.value" :value="item.value" >
              {{item.label}}
            </a-radio>
          </a-radio-group>
        </div>
     </div>
      <div class="form-item" v-if='formStep1Data.confirmType == 2'>
        <span class="form-item-label required">{{$t('confirmContent')}} <span v-if="dataSheet">{{fieldTitle}}</span></span>
        <div class="form-item-empty" v-if="!dataSheet">{{ $t('confirmContentEmpty') }}</div>
        <template v-else>
          <a-checkbox-group class="form-item-checkbox-group" v-model:value="hiddenCheckedList" :options="plainOptions" @change="handleGroupChange" />
          <div class="drag-all">
              <a-checkbox :class="{'yy-field-checked': selectFields.length && selectFields.length != fieldsSortListLenth }" v-model:checked="fieldAllChecked" @click="handleAllClick">{{$t(
              'selectAll')}}</a-checkbox>
          </div>
          <VueDraggable
            :key="draggableKey"
            class="drag-container"
            :animation="150"
            v-model="fieldsSortList"
            :group="groupName"
            tag="ul"
            @start="onStart"
            @end="onEnd"
            :handle="draggripper"
            :scrollSensitivity="scrollSensitivity"
          >

            <li class="drag-item" v-for="item in fieldsSortList" :key="item.id">
              <div class="f">
                <icon-draggripper class="drag-item-icon draggripper" />
                <a-checkbox v-model:checked="item.checked">
                  <component class="icon-svg-container" :is="fieldTypeMap[item.type] || 'icon-text'" />
                {{item.name }}</a-checkbox>
              </div>
              <div class="field-desc" v-if="item.type == 17">* {{ $t('attachmentType') }}</div>
            </li>
          </VueDraggable>
        </template>
      </div>
    </div>
    <!-- <div class="form-footer">
      <yy-button :disabled="saveDisabled" class="yy-custom-btn-operate" @click="handlePreview">预览</yy-button>
      <yy-button :disabled="saveDisabled" type="primary" @click="handleSave">创建确认单</yy-button>
    </div> -->
  </div>
  <!-- 预览--->
  <fromPreview :data="previewData" ref="fromPreviewInstance"></fromPreview>
</template>

<script setup>
import { bitable } from '@lark-base-open/js-sdk';
import yyInput from '@/antDesignComponents/yyInput/yy-input.vue'
import yyButton from '@/antDesignComponents/yyButton/yy-button.vue'
import yySelect from '@/antDesignComponents/yySelect/yy-select.vue'
import yyTooltip from '@/antDesignComponents/yyTooltip/yy-tooltip.vue'
import iconDraggripper from '@/antDesignComponents/icon/icon-draggripper.vue'
import { ref, computed, onMounted, nextTick, watch, onBeforeUnmount, onBeforeMount, reactive, toRaw, shallowRef } from 'vue';
import { VueDraggable } from 'vue-draggable-plus'
import useTableBase from '@/hooks/useTableBase.js';
const { setTableInfo, tableInfo, tableName, sheetList, fieldList, tenantKey, userId, tableData,
 getCellUrlResult, checkHasAttachment, tableIdChangeFlag, confirmId, 
addField, addImgField, addFormulaField, addSingleSelectField } = useTableBase();
import fromPreview from './fromPreview.vue';
import { createConfirm, confirmPreview, confirmUpdate } from '@/api/api.js';
import { useRouter } from 'vue-router';
import bus from '@/eventBus/bus.js'
import useConfirmInfo from '@/hooks/useConfirmInfo.js';
const { formData, setFormData, editDataFlag } = useConfirmInfo();
import { message } from 'ant-design-vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const fieldTypeMap = {
  1: 'icon-text',
  2: 'icon-number',
  3: 'icon-select',
  5: 'icon-time',
  4: 'icon-multipleSelect',
  7: 'icon-checkBox',
  11: 'icon-person',
  13: 'icon-phone',
  15: 'icon-link',
  17: 'icon-attachment',
  18: 'icon-reference',
  19: 'icon-quote',
  20: 'icon-formula',
  21: 'icon-bidirectionalReference',
  22: 'icon-address',
  23: 'icon-gourpPerson',
1001: 'icon-time',
1002: 'icon-time',
1003: 'icon-person',
1004: 'icon-person',
1005: 'icon-autoNum',
99001: 'icon-barCode',
99002: 'icon-progress',
99003: 'icon-money',
99004: 'icon-score',
99005: 'icon-email',

}
const MyComponent = ref('icon-text')
const router = useRouter()
const cacheFormData = ref(null)
const tipsUrl = ref('')
// 第一步数据
const formStep1Data = ref({
  baseId: '',
  tableId: '',
  tableName: '',
  dataSheet: null,
  fields: null,
  fieldSort: [],
  isHiddenZero: false,
  isHiddenEmpty: false,
  currentStep: 0,
  confirmType: 2,
  configFields: [],
})
const initFlag = ref(false)
const dataSheet = ref(null)
const previewData = ref(null) // 预览数据
const fromPreviewInstance = ref(null)
// 使用句柄操作
const draggripper = '.draggripper'
// 鼠标必须离边缘多近才能开始滚动，单位 px
const scrollSensitivity = ref(150)
const fieldsSortList = ref([]) //排序数组
// 隐藏项
const hiddenCheckedList = ref([])
const plainOptions = ref([
  { label: '隐藏为空数据项', value: 'isHiddenEmpty' },
  { label: '隐藏为0数据项', value: 'isHiddenZero' },
]);

const fieldAllChecked = ref(true)
const previewLoading = ref(false)
const tableChangeFlag = ref(false) // 监听切换数据表
const draggableKey = ref(0)
const editFieldSort = ref([])

const allFields = computed(() => {
  return JSON.parse(JSON.stringify(fieldList.value)) || []
})
// 确认单选择文案
const fieldTitle = computed(() => {
  return ` (${t('allCount')}：${fieldsSortListLenth.value}${t('count')}，${t('selectCount')}：${selectFields.value.length}${t('count')})`
})

const selectFields = computed(() => {
  return fieldsSortList.value.filter(item => item && item.checked)
})
const fieldsSortListLenth = computed(() => {
  return fieldsSortList.value.length
})

const isEditVisible = computed(() => {
  return confirmId.value && formData.value.confirmId ? true : false
})
const handleGroupChange = (val) => {
  formStep1Data.value.isHiddenZero = + hiddenCheckedList.value.includes('isHiddenZero')
  formStep1Data.value.isHiddenEmpty = + hiddenCheckedList.value.includes('isHiddenEmpty')
}

const handleDataSheet = async(val, type ='') => {
  const currentSheetObj = sheetList.value.find(item => item.id == val)
  // 获取数据表
  tableInfo.value.tableId = val
  if(!type) tableChangeFlag.value = true
  setTableInfo(tableInfo.value, 'change')
  formStep1Data.value.fields = currentSheetObj
  formStep1Data.value.dataSheet = val
  if(!confirmId.value) formStep1Data.value.tableName = currentSheetObj.name
  formStep1Data.value.tableId = val
  if(!editDataFlag.value && Array.isArray(formData.value.configFields)){
    formStep1Data.value.configFields = formData.value.configFields.map(item => {
      item.mdnFieldId = null
      item.signPeopleFieldId = null
      return item
    })
  }
}
// 监听编辑
watch(() => editDataFlag.value, (val) => {
  if(val){
    initFlag.value = false
    dataSheet.value = formData.value.tableId
    // 编辑时，重新初始化字段
    formStep1Data.value.confirmType = formData.value.confirmType
    formStep1Data.value.tableName = formData.value.tableName
    formStep1Data.value.tableId = formData.value.tableId
    formStep1Data.value.configFields = formData.value.configFields
    handleDataSheet(dataSheet.value, true)
    sleep(100)
    editFieldSort.value = JSON.parse(JSON.stringify(formData.value.fieldSort))
    draggableKey.value = + new Date()
    if(formData.value.isHiddenZero){
      hiddenCheckedList.value.push('isHiddenZero')
      formStep1Data.value.isHiddenZero =  1
    } else {
      hiddenCheckedList.value =  hiddenCheckedList.value.filter(item => item !='isHiddenZero')
      formStep1Data.value.isHiddenZero = 0
    }
    if(formData.value.isHiddenEmpty){
      hiddenCheckedList.value.push('isHiddenEmpty')
      formStep1Data.value.isHiddenEmpty = 1
    } else {
      hiddenCheckedList.value =  hiddenCheckedList.value.filter(item => item !='isHiddenEmpty')
      formStep1Data.value.isHiddenEmpty = 0
    }
    formStep1Data.value.fieldSort = fieldsSortList.value
    editDataFlag.value = false
    initFlag.value = true
  }
})

watch(() => fieldList.value, (newVal, oldVal) => {
  if(initFlag.value){
    tableChangeFlag.value = true
    initField()
  }
}, { deep: true })

watch(() => formStep1Data.value, (val) => {
  // 延迟监听
  if(initFlag.value) {
    setFormData(val)
  }
}, { deep: true })

watch(() => selectFields.value, (val) => {
  if(initFlag.value){
    if(fieldsSortListLenth.value == val.length) fieldAllChecked.value = true
    else fieldAllChecked.value = false
  }
}, { deep: true })

// 监听缓存数据
watch(() => formData.value, async(val) => {
  if(!val || initFlag.value) return false
  tipsUrl.value = require(`@/assets/img/tips-${tableInfo.value.lang}.png`)
  const selection = val.selection || tableInfo.value// 读取cache
  if(val.confirmId){
    formData.value.dataSheet = val.tableId
  }
  dataSheet.value = val.dataSheet || val.sheetVal || selection.tableId
  formStep1Data.value.dataSheet = dataSheet.value
  formStep1Data.value.tableName = val.tableName
  formStep1Data.value.tableId = dataSheet.value
  formStep1Data.value.configFields = formData.value.configFields
  if(val.isHiddenZero){
    hiddenCheckedList.value.push('isHiddenZero')
    formStep1Data.value.isHiddenZero =  1
  }
  if(val.isHiddenEmpty){
    hiddenCheckedList.value.push('isHiddenEmpty')
    formStep1Data.value.isHiddenEmpty = 1
  }
  formStep1Data.value.confirmType = val.confirmType || 2
  if(!tableChangeFlag.value) initField()
  initFlag.value = true
}, {deep: true})

// 初始化列表字段
const initField = () => {
  let cacheFieldSort = []
  const selection = formData.value.selection || tableInfo.value

  fieldsSortList.value = JSON.parse(JSON.stringify(allFields.value)) || []

  cacheFieldSort = formData.value.fieldSort?.map(item => {
    if(typeof item == 'object' && item && item.checked) return item.id
    return item
  }) || []
  // 编辑时，重新排序
  if(draggableKey.value){
     cacheFieldSort = editFieldSort.value || []
  }
  fieldsSortList.value = fieldsSortList.value.filter(item => ![0, 7, 15].includes(item.type) && !item.isHidden).map(item => {
    if((tableChangeFlag.value || !cacheFieldSort.length) && !draggableKey.value){
      item.checked = true
    } else {
      item.checked = cacheFieldSort.includes(item.id)
      // 排序
      if(editFieldSort.value && editFieldSort.value.length){
        let index = editFieldSort.value.indexOf(item.id)
        item.sort = index > -1? index : allFields.value.length -1
      } else {
        let index = cacheFieldSort.indexOf(item.id)
        item.sort = index > -1? index : allFields.value.length -1
      }
    }
    return item
  })
  formStep1Data.value.fieldSort = fieldsSortList.value.sort((a, b) =>  a.sort - b.sort)
  tableIdChangeFlag.value = false
  // let isCache = formData.value.dataSheet && formData.value.dataSheet == selection.tableId && !tableChangeFlag.value
  // // 字段赋值
  // if(tableChangeFlag.value) {
  //   fieldsSortList.value = JSON.parse(JSON.stringify(allFields.value))
  // } else {
  //   let fieldArr = allFields.value
  //   // 打开插件，取缓存
  //   if(formData.value.fieldSort && formData.value.fieldSort.length){
  //     fieldArr = formData.value.fieldSort
  //   }
  //   fieldsSortList.value = JSON.parse(JSON.stringify(fieldArr))
  // }
  
  // if(isCache && formData.value.fieldSort && formData.value.fieldSort.length){
  //   cacheFieldSort = formData.value.fieldSort.map(item => {
  //     if(typeof item == 'object' && item && item.checked) return item.id
  //     return item
  //   })
  // } else {
  //   // 手动切换数据表，不取缓存
  //   if(!tableChangeFlag.value && formData.value.fieldSort && formData.value.fieldSort.length){
  //     cacheFieldSort = formData.value.fieldSort.map(item => {
  //       if(typeof item == 'object' && item && item.checked) return item.id
  //       return item
  //     })
  //     isCache = true
  //   }
  //   if(!tableChangeFlag.value && formData.value.dataSheet != selection.tableId){
  //     handleDataSheet(formData.value.dataSheet, true)
  //   }
  // }
  // // 编辑时，重新排序
  // if(draggableKey.value){
  //   const arr = allFields.value.filter(item => ![0, 7, 15].includes(item.type) && !item.isHidden).map(item => {
  //     item.checked = editFieldSort.value.includes(item.id)
  //     item.sort = editFieldSort.value.indexOf(item.id) > -1 ? editFieldSort.value.indexOf(item.id) : allFields.value.length -1
  //     return item
  //   })
  //   fieldsSortList.value = arr.sort((a, b) =>  a.sort - b.sort)
  //   formStep1Data.value.fieldSort = fieldsSortList.value
  //   tableIdChangeFlag.value = false
  //   return false
  // }
  // try {
  //   fieldsSortList.value = fieldsSortList.value.filter(item => ![0, 7, 15].includes(item.type) && !item.isHidden).map(item => {
  //     item.checked = isCache ? cacheFieldSort.includes(item.id) : true
  //     return item
  //   })
  // } catch (error) {
  //   fieldsSortList.value = JSON.parse(JSON.stringify(allFields.value))
  //   fieldsSortList.value = fieldsSortList.value.filter(item => ![0, 7, 15].includes(item.type) && !item.isHidden).map(item => {
  //     item.checked = true
  //     return item
  //   })
  // }

  // formStep1Data.value.fieldSort = fieldsSortList.value
  // tableIdChangeFlag.value = false
}

const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
onMounted(async()=>{
  plainOptions.value.forEach((item, index) => { 
    if(tableInfo.value.lang != 'zh'){
      item.label = t('isHiddenZero')
      if(index == 1) item.label = t('isHiddenEmpty')
    }
  })
  bus.on('preview', () => {
    handlePreview()
  })
})
onBeforeUnmount(()=> {
  bus.off('preview')
})



const checkPhoneField = async() => {
  const table = await bitable.base.getTableById(tableInfo.value.tableId || tableInfo.value.id)
  const recordList = await table.getRecordList();
  let phoneFieldVal = []
  for (const record of recordList) {
    phoneFieldVal.push(getFieldPromise(record))
  }
  return phoneFieldVal
}
const getFieldPromise = async(record) => {
  const cell = await record.getCellByField(formStep1Data.value.mdnFieldId);
  const val = await cell.getValue();
  // 只处理文本 非文本类型 return 空
  if(val && Array.isArray(val) && val[0].text){
    return Promise.resolve(val[0].text)
  } else if(typeof val =='string'){
    return Promise.resolve(val)
  } else if(typeof val == 'number'){
    return Promise.resolve(val)
  } else if(typeof val == 'object' && val && val.text){
    return Promise.resolve(val.text)
  }
}

const getParams = () => {
  const params = Object.assign({}, formStep1Data.value)
  params.baseId = tableInfo.value.baseId
  params.tableId = tableInfo.value.tableId
  params.tenantId = tableInfo.value.tenantId || tenantKey.value
  params.userId = tableInfo.value.userId || userId.value 
  params.isHiddenZero = + hiddenCheckedList.value.includes('isHiddenZero')
  params.isHiddenEmpty = + hiddenCheckedList.value.includes('isHiddenEmpty')
  params.confirmName = tableName.value || '签字确认单'
  // 全部字段
  params.fields = fieldList.value
  // 排序字段～选中字段
  params.fieldSort = fieldsSortList.value.filter(item => item.checked).map(item => item.id)
  params.isHiddenEmpty = +params.isHiddenEmpty
  params.isHiddenZero = +params.isHiddenZero
  params.isVerifyIdentity = +params.isVerifyIdentity
  params.isNewRecordConfirm = +params.isNewRecordConfirm
  return params
}
const onStart = () => {}
const onEnd = (val) => {
  formStep1Data.value.fieldSort = fieldsSortList.value
}

const isPhoneNumber = (phoneNumber) => {
 // 定义一个正则表达式来匹配手机号
  var regex = /^1[3456789]\d{9}$/;
  // 使用 test 方法来检查字符串是否匹配正则表达式
  return regex.test(phoneNumber);
}
const checkPhoneNumbersInArray = (phoneNumbers) => {
  for (var i = 0; i < phoneNumbers.length; i++) {
    if (isPhoneNumber(phoneNumbers[i])) {
      return true;
    }
  }
  return false;
}

const handlePreview = async () => {
  previewLoading.value = true
  // 核查有没有附件
  const attachmentFieldList = await checkHasAttachment(tableInfo.value.tableId)
  const params = getParams()
  let records = toRaw(tableData.value)
  if(attachmentFieldList && attachmentFieldList.length){
     records = await getCellUrlResult(tableInfo.value.tableId, 'preview')
  }
  // 表格数据
  params.record = records[0]
  confirmPreview(params).then(res => {
    previewLoading.value = false
    if(res.success){
      previewData.value = res.data
      previewData.value.confirmType = params.confirmType
      fromPreviewInstance.value.open()
    }
  })
}

const handleAllClick = (val) => {
  if(!fieldAllChecked.value){
     fieldsSortList.value = fieldsSortList.value.map(item => {
      item.checked = true
      return item
    })
  } else {
     fieldsSortList.value = fieldsSortList.value.map(item => {
      item.checked = false
      return item
    })
  }
}

const handleEditToast = () => {
  if(isEditVisible.value){  
    message.error({
      content: '不可修改！如需修改，请重新创建确认单',
      class: 'yy-message-error',
    })
  }
}
</script>

<style lang="scss" scoped>
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
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 16px;

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

    &-label{
      font-size: 14px;
      color: #1F2329;
      line-height: 20px;
      text-align: left;
      font-weight: 600;
      margin-bottom: 8px;
      display: inline-flex;
      align-items: center;
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

    .required{
      // padding-left: 4px;
      &::before{
        // content: '*';
        color: #FD3B3A;
        line-height: 20px;
        padding-right: 2px;
      }
    }
  }
  &-content{
    flex: 1;
    overflow: auto;
    &::-webkit-scrollbar{
      width: 0!important;
      height: 0!important;
    }
  }
  &-footer{
    height: 56px;
    border-top: 1px solid #E4E7ED;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-left: -20px;
    margin-right: -20px;
    padding-right: 20px;
  }
}


.drag{
  &-container{
    width: 100%;
  }
  &-all{
   padding-left: 32px!important;
  }
  &-item, &-all{
    width: 100%;
    min-height: 32px;
    background: #F2F4F7;
    border-radius: 4px;
    margin-bottom: 8px;
    padding: 6px 12px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    &-icon{
      cursor: move;
      margin-right: 12px;
    }
    .field-desc{
      font-size: 12px;
      color: #909399;
      line-height: 18px;
      padding-left: 40px;
    }
  }
}

</style>

<style>
.yy-fs-from-item-error .ant-select-selector{
  border-color: #FD3B3A!important;
}


@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.loading-container{
  position: absolute;
  top: -100px;
  bottom: -100px;
  z-index: 120;
  background: #fff;
  width: 100%;
  padding-top: 200px;
  display: flex;
  left: 0;
  flex-direction: column;
  align-items: center;
  .loading-gif{
    width: 28px;
    height: 28px;
    border: 3px solid #3A75FF;
    animation: rotate 1s linear infinite;
    margin-bottom: 14px;
    border-radius: 50%;
    border-top: 3px solid #EBF1FF;
  }
  span{
    font-size: 14px;
    color: #333333;
  }
}

.yy-field-checked{
  .ant-checkbox-inner{
    background-color: #3a75ff!important;
    border-color: transparent!important;
  }
  .ant-checkbox-inner:after {
      height: 2px !important;
      top: 50%!important;
      left: 50%!important;
      width: 8px!important;
      background-color: #fff!important;
      border: 0!important;
      transform: translate(-50%, -50%) scale(1)!important;
      opacity: 1!important;
      content: "";
      box-sizing: border-box;
      position: absolute!important;
      display: table;
      transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
  }

}
.icon-svg-container{
  float: left;
  margin-right: 4px;
  margin-top: 4px;
}
.ant-checkbox-wrapper{
  max-width: 93%;
  display: inline-flex;
  .ant-checkbox{
    align-self: flex-start;
    margin-top: 2px;
  }
}

.plugin-form-radio{
  span + span{
    display: flex;
    align-items: center;
  }
  span.ant-radio+*{
    padding-left: 8px!important;
  }
}

</style>

<style lang="scss">
.form-item-label  .icon-tooltip{
  margin-left: 6px!important;
}
.ant-tooltip{
  max-width: initial!important;
}
.ant-tooltip-inner{
  padding: 12px 10px!important; 
}
.type-tooltips{
  .ant-tooltip-arrow{
    left: 136px!important;
  }
}
</style>