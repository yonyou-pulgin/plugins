<template>
  <div class="form-container">
    <div class="form-content">
      <div class="form-head">
        自动在表格最后插入「签字确认」列，可查看详情
      </div>
      <div class="form-item">
        <span class="form-item-label">确认单名称</span>
        <yy-input :maxlength="50" v-model:value="tableName" placeholder="请输入确认单名称"></yy-input>
      </div>
      <div class="form-item">
        <span class="form-item-label required">数据表</span>
        <yy-select class="yy-fs-from-item" placeholder="请选择数据表" :showArrow="true" :options="sheetList" v-model:value="dataSheet" @change="handleDataSheet"></yy-select>
      </div>
      <div class="form-item">
        <span class="form-item-label required">手机号（用于成员身份校验）</span>
        <yy-select class="yy-fs-from-item" :class="{'yy-fs-from-item-error': checkPhoneFieldFlag }" placeholder="请选择手机号列" :showArrow="true" :options="phoneFields" v-model:value="fromData.mdnFieldId" ></yy-select>
      </div>
      <div class="form-item">
        <span class="form-item-label required">确认单内容 <span v-if="fromData.dataSheet">{{fieldTitle}}</span></span>
        <div class="form-item-empty" v-if="!fromData.dataSheet">选择数据表后自动识别</div>
        <template v-else>
          <a-checkbox-group class="form-item-checkbox-group" v-model:value="hiddenCheckedList" :options="plainOptions" />
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
              <icon-draggripper class="drag-item-icon draggripper" />
              <a-checkbox v-model:checked="item.checked">{{item.name}}</a-checkbox>
            </li>
          </VueDraggable>
        </template>  
      </div>
    </div>

    <div class="form-footer">
      <yy-button :disabled="saveDisabled" class="yy-custom-btn-operate" @click="handlePreview">预览</yy-button>
      <yy-button :disabled="saveDisabled" type="primary" @click="handleSave">创建确认单</yy-button>
    </div>
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
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { VueDraggable } from 'vue-draggable-plus'
import useTableBase from '@/hooks/useTableBase.js';
const { setTableInfo, tableInfo, tableName, sheetList, fieldList, tenantKey, userId, tableData, addField, addImgField } = useTableBase();
import fromPreview from './fromPreview.vue';
import { createConfirm, confirmPreview, confirmUpdate } from '@/api/api.js';
import { useRouter } from 'vue-router';
import bus from '@/eventBus/bus.js'
import useConfirmInfo from '@/hooks/useConfirmInfo.js';
const { setConfrimInfo } = useConfirmInfo();
import { message } from 'ant-design-vue';

const router = useRouter()
const fromData = ref({
  baseId: '',
  tableId: '',
  confirmName: '',
  dataSheet: null,
  mdnFieldId: null,
  fields: null,
  fieldSort: []
})
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
const checkPhoneFieldFlag = ref(false) // 手机号校验

// 禁止提交
const saveDisabled = computed(() => {
  return !fromData.value || !fromData.value.fields || !fromData.value.mdnFieldId || !selectFields.value.length
})
// 手机号列
const phoneFields = computed(() => {
  return fieldList.value.filter(item => item.type!=17) || []
})
// 确认单选择文案
const fieldTitle = computed(() => {
  return `(共计：${fieldsSortListLenth.value}个，已选中：${selectFields.value.length}个)`
})

const selectFields = computed(() => {
  return fieldsSortList.value.filter(item => item.checked)
})

const handleDataSheet = async(val) => {
  const currentSheetObj = sheetList.value.find(item => item.id == val)
  fromData.value.fields = currentSheetObj
  fromData.value.dataSheet = val
    // 获取数据表
  const selection = await bitable.base.getSelection();
  const tableMeta = await bitable.base.getTableMetaById(val);
  const table = await bitable.base.getTable(tableMeta.id);
  table.baseId = selection.baseId // baseId
  setTableInfo(table, 'change')
  // 获取手机字段 确认单内容
  setTimeout(() => {
    const phoneField = fieldList.value.filter(item => item.name.indexOf('手机') > -1)
    if(phoneField.length && fromData.value.fields){
      fromData.value.mdnFieldId = phoneField[0].id || null
    } else {
     fromData.value.mdnFieldId = null
    }
    fieldsSortList.value = JSON.parse(JSON.stringify(fieldList.value))
    fieldsSortList.value = fieldsSortList.value.filter(item => ![0, 7, 15, 17].includes(item.type)).map(item => {
      item.checked = true
      return item
    })
    fieldsSortListLenth.value = fieldsSortList.value.filter(item => item.checked).length || 0
  }, 100)
}


watch(() => fieldList.value.length, () => {
  const phoneField = fieldList.value.filter(item => item.name.indexOf('手机') > -1)
  if(phoneField.length && fromData.value.fields){
    fromData.value.mdnFieldId = phoneField[0].id || null
  } else {
    fromData.value.mdnFieldId = null
  }
  fieldsSortList.value = JSON.parse(JSON.stringify(fieldList.value))
  fieldsSortList.value = fieldsSortList.value.filter(item => ![0, 7, 15, 17].includes(item.type)).map(item => {
    item.checked = true
    return item
  })
  fieldsSortListLenth.value = fieldsSortList.value.filter(item => item.checked).length || 0
})


watch(() =>fromData.value.mdnFieldId, (val) => { 
  checkPhoneFieldFlag.value = false
})

//  监听数据表变化
// watch(() => tableInfo.value, (val) => {
//   dataSheet.value = tableInfo.value.tableId
//   handleDataSheet(val.tableId)
// })

onMounted(async()=>{
  const selection = await bitable.base.getSelection();
  setTimeout(() => {
    dataSheet.value = selection.tableId
  //   const currentSheetObj = sheetList.value.find(item => item.id == election.tableId)
  // fromData.value.fields = currentSheetObj
    handleDataSheet(selection.tableId)
  }, 200)
})

const checkPhoneField = async() => {
  const table = await bitable.base.getTableById(tableInfo.value.tableId || tableInfo.value.id)
  const recordList = await table.getRecordList();
  let phoneFieldVal = []
  for (const record of recordList) {
    const cell = await record.getCellByField(fromData.value.mdnFieldId);
    const val = await cell.getValue();
    // 只处理文本 非文本类型 return 空
    if(val && Array.isArray(val) && val[0].text){
      phoneFieldVal.push(Promise.resolve(val[0].text))
    } 
  }
  return phoneFieldVal
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
  // 表格数据
  params.records = tableData.value
  return params
}
const onStart = () => {}
const onEnd = () => {}

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
const handleSave = async() => {
  // 获取手机号字段 
  const resut = await checkPhoneField()
  const checkedPone = await Promise.all(resut)
  if(checkedPone.length){
   const result = checkPhoneNumbersInArray(checkedPone)
   if(!result) return checkPhoneFieldFlag.value = true
  } else {
    return checkPhoneFieldFlag.value = true
  }
  const params = getParams()
  createConfirm(params).then(async (res) => {
    if(res.success){
       router.push({
         name: 'success',
       })
      setConfrimInfo(res.data)
      let confirmId = res.data.confirmId
      let url =`${res.data.domain}/feishuapi/bitable/confirm/qrcode/${res.data.confirmId}`
      const currentTableId = tableInfo.value.tableId || tableInfo.value.id
      const successRecords = res.data.successRecords || []
      Promise.all([addImgField(currentTableId, res.data.qrUrl, successRecords), addField(currentTableId, res.data.createUserViewUrl, successRecords),]).then(res => {
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
        }
      })
    } else {
      message.error({
        content: res.msg,
        class: 'yy-message-error',
      })
    }
  })
}

const handlePreview = () => {
  const params = getParams()
  delete params.records
  params.record = tableData.value[0]
  confirmPreview(params).then(res => {
    if(res.success){
      previewData.value = res.data
      fromPreviewInstance.value.open()
    }
  })
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
 
  &-head{
    font-weight: 600;
    font-size: 14px;
    color: #1F2329;
    line-height: 20px;
    text-align: left;
    font-style: normal;
    margin: 16px 0;
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

  &-item{
    width: 100%;
    height: 32px;
    background: #F2F4F7;
    border-radius: 4px;
    margin-bottom: 8px;
    padding: 6px 12px;
    display: flex;
    flex-direction: row;
    align-items: center;

    &-icon{
      cursor: move;
      margin-right: 12px;
    }
  }
}

</style>

<style>
.yy-fs-from-item-error .ant-select-selector{
  border-color: #FD3B3A!important;
}
</style>