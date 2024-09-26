import { ref } from 'vue'
import { bitable } from '@lark-base-open/js-sdk';

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


const base = bitable.base;
const baseUi = bitable.ui;
// 获取表格实例
const getTableInstance = (tableId) => {
  if(tableInstance) return Promise.resolve(tableInstance)
  else return base.getTable(tableId)
}
// 设置表格信息
const setTableInfo = (selection) => {
    tableInfo.value = selection
    // 获取表格实例
    getTableInstance(selection.tableId)
    // 获取当前多维表格下所有的数据表
    // getTalbeList(selection.tableId)
    getTableName(selection.tableId)
    getTableSheetList(selection.tableId)
    getTableFieldList(selection.tableId)
    getCellList(selection.tableId)
    getTenantKey()
    getUserId()
    // addField(selection.tableId)
}
// 获取当前多维表格下所有的数据表
const getTableSheetList = async (tableId) => {
  const table = await getTableInstance(tableId);
  const sheetListArr = await table.getViewMetaList();
  sheetListArr.map(item => {
    item.label = item.name
    item.value = item.id
    return item
  })
  sheetList.value = sheetListArr
  // 第一个视图不是数据表，切换视图
  if(sheetListArr.length && sheetListArr[0].type!= 1){
    const findTableData = sheetListArr.find(item => item.type == 1)
    const viewId =  findTableData[0].id
    await baseUi.switchToView(tableId, viewId);
  }
}
// 获取当前表格名称
const getTableName = async (tableId) => {
    const table = await getTableInstance(tableId);
    const name = await table.getName()
    tableName.value = name
}
// 获取表格字段列表
const getTableFieldList = async (tableId) => {
    const table = await getTableInstance(tableId);
    const fieldListData = await table.getFieldMetaList();
    fieldList.value = fieldListData.map(item => {
        item.label = item.name
        item.value = item.id
        return item
    })
}
// const getTalbeList = async (tableId) => {
//     const table = await base.getTable(tableId);
// }

// 获取表格数据
const getCellList = async (tableId) => {
  if(loading.value) return
  loading.value = true
  // const table = await getTableInstance(tableId)
  const table = await base.getActiveTable();
  // 获取所有记录 id 列表。
  let params = {
    pageSize: 4,
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
  tableData.value = tableData.value.concat(data.records)
  console.log(tableData.value)
}

// 获取附件地址
// const getAttachmentUrl = async (tableId) => {
//     const table = await base.getTable(tableId);
//     const attachment = await table.getCellAttachmentUrls([]);
//     const url = await attachment.getUrl();
//     return url
// }

const getTenantKey = async () => {
  const Id = await bitable.bridge.getTenantKey();
  tenantKey.value = Id
}

const getUserId = async () => {
  const Id = await bitable.bridge.getUserId();
  userId.value = Id
}
// 新增字段
const addField = async (tableId) => {
  // const result = await getFile('https://uat.yygongzi.com/salary/wx/pc/Payroll/img/bg_1.32906926.png')

  // console.log(result)
  const setRecords = []
  const table = await getTableInstance(tableId);
  // 创建字段~获取字段 id
  const fieldId = await table.addField({type: FieldType.Url});
  // 通过字段 id 获取字段实例
  const field = await table.getField(fieldId);
  // 获取所有列
  const recordIdList = await table.getRecordIdList();

  recordIdList.forEach(item => {
    setRecords.push({
      recordId: item,
      fields: {
        [field.id]: 'https://salary-1307799014.cos.ap-beijing.myqcloud.com/TENCENT/salarybill/image/2020/202008/system_chat_logo.png'
      }
    })
  })
  
  // 批量赋值
  await table.setRecords(setRecords)
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
        getTableSheetList,
        setTableInfo
    }

}

    
