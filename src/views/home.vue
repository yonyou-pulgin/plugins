<template>
  <div class="form-container">
    <div class="loading-container" v-if="previewLoading">
      <div class="loading-gif"></div>
      <span>预览数据生成中，请稍等</span>
    </div>
    <div class="form-content">
      <div class="form-item">
        <span class="form-item-label required">数据表</span>
        <yy-select class="yy-fs-from-item" placeholder="请选择数据表" :showArrow="true" :options="sheetList" v-model:value="dataSheet" @change="handleDataSheet"></yy-select>
      </div>
      <div class="form-item">
        <span class="form-item-label required">确认单内容 <span v-if="fromData.dataSheet">{{fieldTitle}}</span></span>
        <div class="form-item-empty" v-if="!fromData.dataSheet">选择数据表后自动识别</div>
        <template v-else>
          <a-checkbox-group class="form-item-checkbox-group" v-model:value="hiddenCheckedList" :options="plainOptions" @change="handleGroupChange" />
          <div class="drag-all">
              <a-checkbox :class="{'yy-field-checked': selectFields.length && selectFields.length != fieldsSortListLenth }" v-model:checked="fieldAllChecked" @click="handleAllClick">全选</a-checkbox>
          </div>
          <VueDraggable
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
            <li class="drag-item" v-for="item in fieldsSortList">
              <div class="f">
                <icon-draggripper class="drag-item-icon draggripper" />
                <a-checkbox v-model:checked="item.checked">
                  <component class="icon-svg-container" :is="fieldTypeMap[item.type] || 'icon-text'" />
                {{item.name}}</a-checkbox>
              </div>
              <div class="field-desc" v-if="item.type == 17">* 当前仅支持图片，不支持其他文件格式</div>
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
import iconDraggripper from '@/antDesignComponents/icon/icon-draggripper.vue'
import { ref, computed, onMounted, nextTick, watch, onBeforeUnmount, onBeforeMount, reactive, toRaw } from 'vue';
import { VueDraggable } from 'vue-draggable-plus'
import useTableBase from '@/hooks/useTableBase.js';
const { setTableInfo, tableInfo, tableName, sheetList, fieldList, tenantKey, userId, tableData, getCellUrlResult, checkHasAttachment,
addField, addImgField, addFormulaField, addSingleSelectField} = useTableBase();
import fromPreview from './fromPreview.vue';
import { createConfirm, confirmPreview, confirmUpdate } from '@/api/api.js';
import { useRouter } from 'vue-router';
import bus from '@/eventBus/bus.js'
import useConfirmInfo from '@/hooks/useConfirmInfo.js';
const { formData:cacheFormData, setFormData } = useConfirmInfo();
import { message } from 'ant-design-vue';

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
const fromData = ref({
  baseId: '',
  tableId: '',
  confirmName: '',
  tableName: '',
  dataSheet: null,
  fields: null,
  fieldSort: [],
  isHiddenZero: false,
  isHiddenEmpty: false,
  currentStep: 0,
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
const plainOptions = [
  { label: '隐藏为空数据项', value: 'isHiddenEmpty' },
  { label: '隐藏为0数据项', value: 'isHiddenZero' },
];
const fieldsSortListLenth = ref(0)
const fieldAllChecked = ref(true)
const previewLoading = ref(false)

// 确认单选择文案
const fieldTitle = computed(() => {
  return `(共计：${fieldsSortListLenth.value}个，已选中：${selectFields.value.length}个)`
})

const selectFields = computed(() => {
  return fieldsSortList.value.filter(item => item.checked)
})

const handleGroupChange = (val) => {
  fromData.value.isHiddenZero = + hiddenCheckedList.value.includes('isHiddenZero')
  fromData.value.isHiddenEmpty = + hiddenCheckedList.value.includes('isHiddenEmpty')
}

const handleDataSheet = async(val) => {
  const currentSheetObj = sheetList.value.find(item => item.id == val)
  fromData.value.fields = currentSheetObj
  fromData.value.dataSheet = val
  fromData.value.tableName = currentSheetObj.name
    // 获取数据表
  const selection = await bitable.base.getSelection();
  const tableMeta = await bitable.base.getTableMetaById(val);
  const table = await bitable.base.getTable(tableMeta.id);
  table.baseId = selection.baseId // baseId
  fromData.value.baseId = selection.baseId
  setTableInfo(table, 'change')
  // 获取手机字段 确认单内容
  setTimeout(() => {
    fieldsSortList.value = JSON.parse(JSON.stringify(fieldList.value))
    fieldsSortList.value = fieldsSortList.value.filter(item => ![0, 7, 15].includes(item.type)).map(item => {
      item.checked = true
      return item
    })
    fromData.value.fieldSort = fieldsSortList.value
    fieldsSortListLenth.value = fieldsSortList.value.filter(item => item.checked).length || 0
  }, 100)
}

watch(() => fieldList.value.length, () => {
  fieldsSortList.value = JSON.parse(JSON.stringify(fieldList.value))
  fieldsSortList.value = fieldsSortList.value.filter(item => ![0, 7, 15].includes(item.type)).map(item => {
    item.checked = true
    return item
  })
  fieldsSortListLenth.value = fieldsSortList.value.filter(item => item.checked).length || 0
  fromData.value.fieldSort = fieldsSortList.value
  if(fieldsSortListLenth.value == selectFields.value.length) fieldAllChecked.value = true
  else fieldAllChecked.value = false
  setFormData(fromData.value)
})

watch(() => fromData.value, (val) => {
  // 延迟监听
  if(initFlag.value) setFormData(fromData.value)
}, { deep: true })

watch(() => selectFields.value.length, (val) => {
  if(fieldsSortListLenth.value == val) fieldAllChecked.value = true
  else fieldAllChecked.value = false
}, { deep: true })
onMounted(async()=>{
  initFlag.value = false
  const selection = await bitable.base.getSelection();
  fromData.value.baseId = cacheFormData.value.baseId || selection.baseId
  fromData.value.currentStep = 0
  setTimeout(() => {
    dataSheet.value = cacheFormData.value.dataSheet || selection.tableId
    fromData.value.dataSheet = dataSheet.value
    // 读取缓存数据
    if(cacheFormData.value.dataSheet){
      fieldsSortList.value = cacheFormData.value.fieldSort || []
      fieldsSortListLenth.value = fieldsSortList.value.length
      fromData.value.fieldSort = fieldsSortList.value 
      if(cacheFormData.value.isHiddenZero){
        hiddenCheckedList.value.push('isHiddenZero')
        fromData.value.isHiddenZero =  1
      }
      if(cacheFormData.value.isHiddenEmpty){
        hiddenCheckedList.value.push('isHiddenEmpty')
        fromData.value.isHiddenEmpty = 1
      }
    } else {
      handleDataSheet( dataSheet.value)
    }
    initFlag.value = true
  }, 200)

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
  const cell = await record.getCellByField(fromData.value.mdnFieldId);
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
// const handleChecked = (val) => {
//   fieldsSortList.value.map(item => {
//     if(item.id == val.id){
//       item.checked = !item.checked
//     }
//     return item
//   })
//   console.log(fieldsSortList.value)
// }

const getParams = () => {
  const params = Object.assign({}, fromData.value)
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
  fromData.value.fieldSort = fieldsSortList.value
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
      font-style: normal;
      margin-bottom: 8px;
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
      padding-left: 4px;
      &::before{
        content: '*';
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
  margin-top: 2px;
      margin-top: 4px;
    float: left;
    margin-right: 4px;
}
</style>