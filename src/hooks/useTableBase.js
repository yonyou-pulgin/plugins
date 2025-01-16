import { ref, nextTick, toRaw } from 'vue'
import { bitable } from '@lark-base-open/js-sdk';
import { confirmImgDown } from '@/api/api.js'
import { urltoBlob } from 'image-conversion'

const FieldType = {
  Text: 1, // 多行文本
  Number: 2, // 数字
  SingleSelect: 3, // 单选
  MultiSelect: 4, // 多选
  DateTime: 5, // 日期
  Checkbox: 7, // 复选框
  User: 11, // 人员
  Phone: 13, // 电话
  Url: 15, // 超链接
  Attachment: 17, // 附件
  SingleLink: 18, // 单向关联
  Lookup: 19, // 查找引用
  Formula: 20, // 公式
  DuplexLink: 21, // 双向关联
  Location: 22, // 地理位置
  GroupChat: 23, // 群聊
  CreatedTime: 1001, // 创建时间
  ModifiedTime: 1002, // 修改时间
  CreatedUser: 1003, // 创建人
  ModifiedUser: 1004, // 修改人
  AutoNumber: 1005, // 自动编号
  Barcode: 99001, // 二维码
  Progress: 99002, // 进度条
  Currency: 99003, // 货币
  Rating: 99004, // 评分
  Email: 99005 // 邮箱
};

const getFile = (dataurl, filename) => {
  //将base64转换为文件
  return new Promise((resolve, reject) => {
    fetch(dataurl)
    .then(Response => Response.blob())
    .then(res => 
      resolve(res)
    )
  })
}

const dataURLtoFile = (dataurl, filename) =>{
  //将base64转换为文件
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}

// 查找最大的下标
const findFieldIndex = (fieldList) => {
  const findHasFieldName = fieldList.filter(item => item.name.indexOf('签字人') > -1 ||  item.name.indexOf('签字确认结果') > -1 || item.name.indexOf('签字状态') > -1
    || item.name.indexOf('签字二维码【发给签字人员】') > -1 || item.name.indexOf('自动化签字链接') > -1 || item.name.indexOf('签字确认结果') > -1 || 
    item.name.indexOf('签字确认') > -1
  ).map(item => +item.name.replace(/\D/g, ''))
  insetFieldIndex.value =  0;
  if(findHasFieldName.length){
    let maxIndex = Math.max(...findHasFieldName)
    insetFieldIndex.value = maxIndex ? ++maxIndex : 1;
  }

}

const loading = ref(false)
const tableInstance = null // table 实例
const tableInfo = ref(null) // 获取基本信息
const sheetList = ref([]) // 表格sheet数据
const tableName = ref('') // 表格名称
const fieldList = ref([]) // 表格字段
const recordList = ref([]) // 表格数据
const tenantKey = ref('') // 租户key
const userId = ref('') // 用户id 创建人
const tableData =ref([]) // 表格数据
const pageToken = ref(null) // 分页token
const delFieldFlag = ref(false) // 删除字段\
const attachmentFieldList = ref([]) // 附件字段
const insetFieldIndex = ref(0) // 插入的下标
const tableIdChangeFlag = ref(false) // 表格id 变化
const lockupAttachmentField = ref([]) // 引用表附件字段
const base = bitable.base;
const baseUi = bitable.ui;
const bridge = bitable.bridge;

const getTableInstance = (tableId) => {
  return base.getTable(tableId)
}
let flag = true
// 设置表格信息
const setTableInfo = async(selection, type = '') => {
    if(!selection.tableId){
      selection.tableId = selection.id
    }
    tableInfo.value = selection
    // 获取表格实例
    const table = await getTableInstance(selection.tableId)
    // 获取当前多维表格下所有的数据表
    if(!type) getTableName(selection.tableId)
    getTableSheetList(selection.tableId)
    getTableFieldList(selection.tableId)
    // 获取当前多维表格下所有的数据表
    getCellList(selection.tableId)
    getTenantKey()
    getUserId()
    // 监听 field 变化

    table.onFieldAdd((event) => {
      console.log('add tableId:' + tableInfo.value.tableId)
      getTableFieldList(tableInfo.value.tableId)
      getCellList(tableInfo.value.tableId)
    })
    table.onFieldDelete((event) => {
      console.log('del tableId:' + tableInfo.value.tableId)
      getTableFieldList(tableInfo.value.tableId)
      getCellList(tableInfo.value.tableId)
    })
    // 监听数据变化
    bitable.base.onSelectionChange(async(event) => {
      nextTick(() => {
        tableData.value = []
        getTableSheetList(tableInfo.value.tableId)
        getCellList(tableInfo.value.tableId)
      })
    })
}
// 获取当前多维表格下所有的数据表
const getTableSheetList = async (tableId) => {
  const tableList = await base.getTableMetaList();
  tableList.map(item => {
    item.label = item.name
    item.value = item.id
    return item
  })
  sheetList.value = tableList
}
// 获取当前表格名称
const getTableName = async (tableId) => {
  const table = await getTableInstance(tableId);
  const name = await table.getName();
  tableName.value = name || ''
}
// 获取表格字段列表
const getTableFieldList = async (tableId) => {
  lockupAttachmentField.value = []
  // const baseInfo = await bitable.base.getSelection();
  const table = await getTableInstance(tableId);
  const viewList = await table.getViewMetaList();
  // 获取表格视图
  const findView = viewList.find(item => item.type == 1)
  if(!findView) return
  // 获取第一个视图 id
  const viewId = findView.id
  // 通过视图 id 获取视图实例
  const view = await table.getViewById(viewId);
  // 通过视图获取所有字段
  const fieldListData = await view.getFieldMetaList();
  let fieldListArr = []
  for (const item of fieldListData) {
    // 字段引用
    item.tableId = tableId // 主表id 
    if(item.type == FieldType.Lookup){
      const lockupTable = await base.getTableById(item.property.refTableId);
      const lockupFieldMeta = await lockupTable.getFieldMetaById(item.property.refFieldId);
      lockupFieldMeta.label = lockupFieldMeta.name
      lockupFieldMeta.value = lockupFieldMeta.id
      lockupFieldMeta.isHidden = true
      lockupFieldMeta.tableId = item.property.refTableId // 关联表id
      fieldListArr.push(lockupFieldMeta)
      // 判断引用是否有附件字段
      if(lockupFieldMeta.type == FieldType.Attachment){
        const field = await table.getFieldById(item.id);
        lockupAttachmentField.value.push(field) 
      }
    }
    item.label = item.name
    item.value = item.id
    fieldListArr.push(item)
  }
  fieldList.value  = fieldListArr
}

// 获取表格数据
const getCellList = async (tableId) => {
  if(loading.value) return
  loading.value = true
  const table = await base.getTableById(tableId);
  // 获取所有记录 id 列表。
  let params = {
    pageSize: 5000,
  }
  if(pageToken.value) {
    params.pageToken = pageToken.value
  }
  const data = await table.getRecords(params);
  // 分页参数
  loading.value = false
  if(data.pageToken) {
    pageToken.value = data.pageToken
    setTimeout(() => {
      getCellList(tableId)
    }, 1000);
  } else {
    pageToken.value = null
  }
  // 分页请求
  if(data.pageToken){
    tableData.value = tableData.value.concat(data.records)
  } else {
    tableData.value = data.records
  }
}
const getCellUrlResult = async (tableId, type = '') => {
  return new Promise(async (resolve, reject) => {
    const table = await base.getTableById(tableId);
    // 处理附件数据
    let tableDataSource = toRaw(tableData.value)
    if(type == 'preview'){
      // 预览数据处理一条
      tableDataSource = [tableDataSource[0]]
    }
    const dataSource = await getAttachmentUrlSync(table, tableDataSource)
    const data = await getAttachmentUrl(table, dataSource)
    resolve(data)
  })
}

const getFieldSync = async(tableInstance, fieldId, recordId, recordInfo) => {
  // 附件为空报错
  // const attachmentField = await tableInstance.getField(fieldId);
  // const attachmentUrls = await attachmentField.getAttachmentUrls(recordId);
  // if(attachmentUrls){
  //   recordInfo[fieldId] = attachmentUrls
  //   return Promise.resolve(recordInfo)
  // } else {
  //   return Promise.resolve(recordInfo)
  // }
  // 通过cell 获取
  let fieldToken = []
  for (const fieldIKey in recordInfo.fields){
    if(fieldId == fieldIKey && recordInfo.fields[fieldIKey]){
      recordInfo.fields[fieldIKey].map(item => {
        fieldToken.push(item.token)
      })
    }
  }
  const attachmentUrls = await tableInstance.getCellAttachmentUrls(fieldToken, fieldId, recordId);
  if(attachmentUrls && fieldToken.length){
    recordInfo[fieldId] = attachmentUrls
    return Promise.resolve(recordInfo)
  } else {
    return Promise.resolve(recordInfo)
  }
}
// 核查附件字段
const checkHasAttachment = async (tableId) => {
  const tableInstance = await base.getTableById(tableId);
  // 获取 table 下所有的附件字段
  attachmentFieldList.value = await tableInstance.getFieldListByType(FieldType.Attachment);
  attachmentFieldList.value = [...toRaw(attachmentFieldList.value), ...toRaw(lockupAttachmentField.value)]
  return attachmentFieldList.value
}
// 获取附件地址Promise
const getAttachmentUrlSync = async(tableInstance, data) => {
  const attachmentFieldListData = toRaw(attachmentFieldList.value)
  data.map(item => {
    item.PromiseFun = []
    // 拿到行 recordId
    const recordId = item.recordId
    //处理每个附件的url
    attachmentFieldListData.map(field => {
      item.PromiseFun.push(getFieldSync(tableInstance, field.id, recordId, item))
    })
  })
  return Promise.resolve(data)
}

const getAttachmentUrl = async(tableInstance, data) => {
  return new Promise(async(resolve, reject) => {
    for(const item of data){
      const urlArr = await Promise.all(item.PromiseFun)
      delete item.PromiseFun
      let urlArrKey = Object.keys(urlArr[0])
      for (let fieldIKey in item.fields){
        if(urlArrKey.includes(fieldIKey) && item.fields[fieldIKey]){
        // 附件是数组
          item.fields[fieldIKey].map((attachAttr,index) => {
            attachAttr.attachmentUrl = urlArr[0][fieldIKey][index] || ''
          })
        }
      }
    }
    resolve(data)
  })
}

const getTenantKey = async () => {
  const Id = await bitable.bridge.getTenantKey();
  tenantKey.value = Id
}

const getUserId = async () => {
  const Id = await bitable.bridge.getUserId();
  userId.value = Id
}

const getWindowTableInstance = async(tableId) => {
  if(window.tableInstance) return window.tableInstance
  else window.tableInstance = await getTableInstance(tableId);
  return window.tableInstance
}
// 新增字段
const addField = async (insertIndex, tableId, content, successRecords, fieldTitle='签字确认结果', isDesc = '') => {
  return new Promise(async(resolve, reject) => {
    const setRecords = []
    const table = await getWindowTableInstance(tableId)
    // 创建字段~获取字段 id
    // 查找签字字段
    const findField = insetFieldIndex.value + insertIndex || 0
    let name = findField ? `${fieldTitle}${findField}` : `${fieldTitle}`

    // 创建字段~获取字段 id
    const fieldId = await table.addField({type: FieldType.Url, name,
    description: { // 字段描述
      content: isDesc,
      /** 是否禁止同步，如果为true，表示禁止同步该描述内容到表单的问题描述（只在新增、修改字段时生效）; 默认false */
      disableSyncToFormDesc: false
    }});
    resolve({
      viewFieldId: fieldId,
    })
    // 通过字段 id 获取字段实例
    const field = await table.getField(fieldId);
    // 获取所有列
    const recordIdList = await table.getRecordIdList();
    let text = fieldTitle == '签字确认结果' ? '查看签字结果' : '在线签字确认'
    recordIdList.forEach(item => {
      if(successRecords.includes(item)) {
        setRecords.push({
          recordId: item,
          fields: {
            [field.id]: [{
              "type": "url",
              "text": text,
              "link": `${content}&recordId=${item}`
            }]
          }
        })
      }
    })
    // 批量赋值
    await table.setRecords(setRecords)
  })
}

// 获取附件token
const getAttachmentToken = async(file) => {
  const tokens = await bitable.base.batchUploadFile([file]);
  return tokens
}
// 新增附件字段
const addImgField = async (insertIndex, tableId, url, successRecords) => {
  const result = await urltoBlob(url)
  const file = new File([result], 'imgage.png', { type: result.type});
  // 设置单个值
  // const table = await bitable.base.getActiveTable();
  // const attachmentField = await table.getField("fld5ESct1p");
  // const recordIdList = await table.getRecordIdList();
  // await attachmentField.setValue(recordIdList[0], file);
  const token = await getAttachmentToken(file)
  const setRecords = []

  return new Promise(async(resolve, reject) => {
      const table = await getWindowTableInstance(tableId);
      // 创建字段~获取字段 id
      const imgFieldLen =  insetFieldIndex.value + insertIndex || 0
      let name = imgFieldLen ? `签字二维码【发给签字人员】${imgFieldLen}` : '签字二维码【发给签字人员】'
      const fieldId = await table.addField({type: FieldType.Attachment, name});
      resolve({
        qrFieldId: fieldId,
      })
      // 通过字段 id 获取字段实例
      const field = await table.getField(fieldId);

      // 获取所有列
      const recordIdList = await table.getRecordIdList();

      recordIdList.forEach(item => {
        if(successRecords.includes(item)) {
          setRecords.push({
            recordId: item,
            fields: {
              [field.id]: [{
                name: file.name,
                size: file.size,
                type: file.type,
                token: token[0],
                timeStamp: file.lastModified,
                permission: {
                }
              }]
            }
          })
        }
      })
      // 批量赋值
      table.setRecords(setRecords)
  })

}

const addFormulaField = async (insertIndex, tableId, content, fieldTitle = '签字确认结果', isDesc = '') => {
  return new Promise(async(resolve, reject) => {
    const table = await getWindowTableInstance(tableId);
    const formulaFieldLen = insetFieldIndex.value + insertIndex || 0
    let name = formulaFieldLen ? `${fieldTitle}${formulaFieldLen}` : fieldTitle
    const fieldId = await table.addField({type: FieldType.Formula, name, description: { // 字段描述
      content: isDesc,
      /** 是否禁止同步，如果为true，表示禁止同步该描述内容到表单的问题描述（只在新增、修改字段时生效）; 默认false */
      disableSyncToFormDesc: false
    }});
    resolve({
      viewFieldId: fieldId,
    })
    // 公式字段
    const formulaField = await table.getField(fieldId);
    let url = content + `&recordId=`  || 'https://www.baidu.com/'
    let  titleVal = fieldTitle == '签字确认结果' ? '查看签字结果' : '在线签字确认'
    let contentUrl = `HYPERLINK(CONCATENATE("${url}",RECORD_ID()),"${titleVal}")`
    await formulaField.setFormula(contentUrl);
  })

}

const addFormulaLinkField = async (insertIndex, tableId, content, fieldTitle = '自动化签字链接', isRecord = true) => {
  return new Promise(async(resolve, reject) => {
    let isDesc = `如何通过飞书自动化推送签字消息https://yygongzi.feishu.cn/docx/EUdEdozAVobHQ2x4YcXcRakTnmh`
    const table = await getWindowTableInstance(tableId);
    const formulaFieldLinkLen = insetFieldIndex.value + insertIndex || 0
    let name = formulaFieldLinkLen ? `${fieldTitle}${formulaFieldLinkLen}` : fieldTitle
    const fieldId = await table.addField({type: FieldType.Formula, name,
    description: { // 字段描述
      content: isDesc,
      /** 是否禁止同步，如果为true，表示禁止同步该描述内容到表单的问题描述（只在新增、修改字段时生效）; 默认false */
      disableSyncToFormDesc: false
    }});
    resolve({
      viewFieldId: fieldId,
    })
    // 公式字段
    const formulaField = await table.getField(fieldId);
    let url = content + `&recordId=`  || 'https://www.baidu.com/'
    let  contentUrl = ''
    if(isRecord) contentUrl = `CONCATENATE("${url}", RECORD_ID())`
    else contentUrl = `CONCATENATE("${url}&rowId=", RECORD_ID())`
    await formulaField.setFormula(contentUrl);
  })

}
// 新增单选
const addSingleSelectField = async (insertIndex, tableId, url, successRecords) => {
 return new Promise(async(resolve, reject) => {
    const table = await getWindowTableInstance(tableId);
    const singleSelectLen = insetFieldIndex.value + insertIndex || 0
    let name = singleSelectLen ? `签字状态${singleSelectLen}` : '签字状态'
    const fieldId = await table.addField({type: FieldType.SingleSelect, name});
    resolve({
      statusFieldId: fieldId,
      statusFieldName: name
    })
    // 获取单选实力
    const singleSelectField = await table.getField(fieldId);
    // //0-未查看/未签字 1-已查看/已签字 2-已查看/未签字
    await singleSelectField.addOptions([
      {
        name: '未查看/未签字',
      },
      {
        name: '已查看/已签字',
      },
      {
        name: '已查看/未签字',
      },
    ]);
    const recordIdList = await table.getRecordIdList();
    recordIdList.forEach(item => {
      singleSelectField.setValue(item, '未查看/未签字'); // 传入选项 id   
    })
 })
}

const closePlugin = async () => {
  await bitable.ui.closeHostContainer()
}

// 设置人员
const setUserField = async(insertIndex, tableId, selectUserFieldId, successRecords) => {
 return new Promise(async(resolve, reject) => {
  const table = await getWindowTableInstance(tableId);
  
  const userFieldLen = insetFieldIndex.value + insertIndex || 0
  let name = userFieldLen ? `签字人${userFieldLen}`: '签字人'
  const addUserFieldId = await table.addField({type: FieldType.Text, name });
  resolve({
    userField: addUserFieldId
  })
  // 获取对应列的字段
  const userField = await table.getField(selectUserFieldId);
  // 获取行数据
  const recordList = await table.getRecordList();
  recordList.recordIdList.map(async item => {
    if(successRecords.includes(item)) {
      // 获取对应的人员
      let cellValue = await table.getCellValue(selectUserFieldId, item);
      // const cellValue = await userField.getValue(item);
      if(Array.isArray(cellValue) && cellValue[0]){
        // 人员字段赋值
        let currentField = cellValue[0]
        if(!currentField.type && currentField.name && currentField.id ){
          currentField = Object.assign({
            "type": "mention",
            "mentionType": "User",
            "token": currentField.id,
            "text": `@${currentField.name}`
          }, currentField)
          cellValue = [currentField]
        }
        const modifiedUserField = await table.getField(addUserFieldId);
        // 设置人员
        await modifiedUserField.setValue(item, cellValue);
      }
    }
  })

 })
}
export default function useTableBase() {
  return {
    userId,
    tableInfo,
    tableName,
    sheetList,
    fieldList,
    recordList,
    tenantKey,
    tableData,
    attachmentFieldList,
    insetFieldIndex,
    tableIdChangeFlag,
    checkHasAttachment,
    getCellList,
    getCellUrlResult,
    getTableSheetList,
    setTableInfo,
    addField,
    addImgField,
    addFormulaField,
    addSingleSelectField,
    closePlugin,
    addFormulaLinkField,
    setUserField,
    findFieldIndex
  }
}
