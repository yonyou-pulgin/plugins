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
    bitable.base.onSelectionChange((event) => {
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
  fieldList.value = fieldListData.map(item => {
      item.label = item.name
      item.value = item.id
      return item
  })
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
    console.log(dataSource)
    const data = await getAttachmentUrl(table, dataSource)
    console.log(data)
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
  return attachmentFieldList.value
}
// 获取附件地址Promise
const getAttachmentUrlSync = async(tableInstance, data) => {
  const attachmentFieldListData = toRaw(attachmentFieldList.value)
  //获取 table 下所有的附件字段
  // const attachmentFieldList = await tableInstance.getFieldListByType(FieldType.Attachment);
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
      resolve(data)
    }
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
// 新增字段
const addField = async (tableId, content, successRecords, fieldTitle='签字确认结果', isDesc = '') => {
  const setRecords = []
  const table = await getTableInstance(tableId);
  // 创建字段~获取字段 id
  // 查找签字字段
  const findField = fieldList.value.filter(item => item.name.includes(fieldTitle))
  let name = findField.length ? `${fieldTitle}${findField.length}` : fieldTitle
  // 创建字段~获取字段 id
  const fieldId = await table.addField({type: FieldType.Url, name,
  description: { // 字段描述
    content: isDesc,
    /** 是否禁止同步，如果为true，表示禁止同步该描述内容到表单的问题描述（只在新增、修改字段时生效）; 默认false */
    disableSyncToFormDesc: false
  }});
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
            "link": `${content}${item}`
          }]
        }
      })
    }
  })
  // 批量赋值
  await table.setRecords(setRecords)
  return Promise.resolve({
    viewFieldId: fieldId,
  })
}

// 获取附件token
const getAttachmentToken = async(file) => {
  const tokens = await bitable.base.batchUploadFile([file]);
  return tokens
}
// 新增附件字段
const addImgField = async (tableId, url, successRecords) => {
  const result = await urltoBlob(url)
  const file = new File([result], 'imgage.png', { type: result.type});
  // 设置单个值
  // const table = await bitable.base.getActiveTable();
  // const attachmentField = await table.getField("fld5ESct1p");
  // const recordIdList = await table.getRecordIdList();
  // await attachmentField.setValue(recordIdList[0], file);
  const token = await getAttachmentToken(file)
  const setRecords = []
  const table = await bitable.base.getTableById(tableId);
  // 创建字段~获取字段 id
  const findField = fieldList.value.filter(item => item.name.includes('签字二维码【发给签字人员】'))
  let name = findField.length ? `签字二维码【发给签字人员】${findField.length}` : '签字二维码【发给签字人员】'
  const fieldId = await table.addField({type: FieldType.Attachment, name});
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
  return Promise.resolve({
    qrFieldId: fieldId,
  })
}
const addFormulaField = async (tableId, content, fieldTitle = '签字确认结果', isDesc = '') => {
  const table = await bitable.base.getTableById(tableId);
  const findField = fieldList.value.filter(item => item.name.includes(fieldTitle))
  let name = findField.length ? `${fieldTitle}${findField.length}` : fieldTitle
  const fieldId = await table.addField({type: FieldType.Formula, name, description: { // 字段描述
    content: isDesc,
    /** 是否禁止同步，如果为true，表示禁止同步该描述内容到表单的问题描述（只在新增、修改字段时生效）; 默认false */
    disableSyncToFormDesc: false
  }});
  // 公式字段
  const formulaField = await table.getField(fieldId);
  let url = content || 'https://www.baidu.com/'
  let  titleVal = fieldTitle == '签字确认结果' ? '查看签字结果' : '在线签字确认'
  let contentUrl = `HYPERLINK(CONCATENATE("${url}",RECORD_ID()),"${titleVal}")`
  await formulaField.setFormula(contentUrl);
  return Promise.resolve({
    viewFieldId: fieldId,
  })
}

const addFormulaLinkField = async (tableId, content, fieldTitle = '自动化签字链接', isRecord = true) => {
  let isDesc = `如何通过飞书自动化推送签字消息https://yygongzi.feishu.cn/docx/EUdEdozAVobHQ2x4YcXcRakTnmh`
  const table = await bitable.base.getTableById(tableId);
  const findField = fieldList.value.filter(item => item.name.includes(fieldTitle))
  let name = findField.length ? `${fieldTitle}${findField.length}` : fieldTitle
  const fieldId = await table.addField({type: FieldType.Formula, name, 
  description: { // 字段描述
    content: isDesc,
    /** 是否禁止同步，如果为true，表示禁止同步该描述内容到表单的问题描述（只在新增、修改字段时生效）; 默认false */
    disableSyncToFormDesc: false
  }});
  // 公式字段
  const formulaField = await table.getField(fieldId);
  let url = content || 'https://www.baidu.com/'
  let  contentUrl = ''
  if(isRecord) contentUrl = `CONCATENATE("${url}", RECORD_ID())`
  else contentUrl = `CONCATENATE("${url}&rowId=", RECORD_ID())`
  await formulaField.setFormula(contentUrl);
  return Promise.resolve({
    viewFieldId: fieldId,
  })
}
// 新增单选
const addSingleSelectField = async (tableId, url, successRecords) => {
  const table = await bitable.base.getTableById(tableId);
  const findField = fieldList.value.filter(item => item.name.includes('签字状态'))
  let name = findField.length ? `签字状态${findField.length}` : '签字状态'
  const fieldId = await table.addField({type: FieldType.SingleSelect, name});
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
  return Promise.resolve({
    statusFieldId: fieldId,
    statusFieldName: name
  })
}

const closePlugin = async () => {
  await bitable.ui.closeHostContainer()
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
    addFormulaLinkField
  }
}
