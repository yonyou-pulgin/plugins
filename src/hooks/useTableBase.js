import { ref } from 'vue'
import { bitable } from '@lark-base-open/js-sdk'; 

const tableInfo = ref(null) // 获取基本信息
const sheetList = ref([]) // 表格sheet数据
const tableName = ref('') // 表格名称
const fieldList = ref([]) // 表格字段
const recordList = ref([]) // 表格数据

const base = bitable.base;
// 设置表格信息
const setTableInfo = (selection) => {
    tableInfo.value = selection
    // 获取当前多维表格下所有的数据表
    // getTalbeList(selection.tableId)
    // getTableName(selection.tableId)
    // getTableSheetList(selection.tableId)
    getTableFieldList(selection.tableId)
    // getCellList(selection.tableId)
}
// 获取当前多维表格下所有的数据表
const getTableSheetList = async (tableId) => {
  const table = await base.getTable(tableId)
  const sheetList = await table.getViewMetaList();
  sheetList.value = sheetList.filter(item => item.type == 1)
  // console.log(sheetList)
}
// 获取当前表格名称
const getTableName = async (tableId) => {
    const table = await base.getTable(tableId)
    const name = await table.getName()
    tableName.value = name
}

const getTableFieldList = async (tableId) => {
    const table = await base.getTable(tableId);
    const fieldList = await table.getFieldMetaList();
    fieldList.value = fieldList
    console.log(fieldList)
}
// const getTalbeList = async (tableId) => {
//     const table = await base.getTable(tableId);
// }

// 获取表格数据
const getCellList = async (tableId) => {
    const table = await base.getActiveTable();
    // 获取所有记录 id 列表。
    const recordList = await table.getRecords({pageSize: 5000});
}

// 获取附件地址
// const getAttachmentUrl = async (tableId) => {
//     const table = await base.getTable(tableId);
//     const attachment = await table.getCellAttachmentUrls([]);
//     const url = await attachment.getUrl();
//     return url
// }
export default function useTableBase() {
    return {
        tableInfo,
        setTableInfo
    }

}

    
