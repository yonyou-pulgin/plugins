import { ref, onMounted } from 'vue'
import { bitable } from '@lark-base-open/js-sdk';


const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}


const bridge = bitable.bridge;
const formData = ref({
  isVerifyIdentity: true
})

// 获取缓存的表单数据
const getCacheFormData = async () => {
  const data = await bridge.getData('yy-form-data')
  if(data && Object.values(data).length && data !=1){
    let dataObj = JSON.parse(data)
    dataObj.key = +Date.now()
    if(!dataObj.dataSheet && !dataObj.tableId){
      dataObj.fieldSort = []
      dataObj.fieldsList = []
    }
    formData.value = Object.assign({}, formData.value, dataObj)
  } else {
    formData.value = Object.assign(formData.value, {
      key: +Date.now(),
    })
  }
}
// 获取缓存授权码
const getCacheAuthCode = async () => {
  const data = await bridge.getData('yy-auth-code')
  //  有数据返回string 没有数据返回 {}
  if(data && Object.values(data).length){
    return Promise.resolve(data)
  }
  return Promise.resolve(null)
}
// 确认信息
const confrimInfo = ref({})
const editDataFlag = ref(false)

const setFormData = debounce(async function (val) {
  if(val && typeof val == 'object' ){
    console.log('set')
    let data = Object.assign({}, formData.value, val)
    formData.value = data
    // 清空授权码
    await bridge.setData('yy-form-data', JSON.stringify(data))
    // 记录当前的baseId的授权码
    if(formData.value.isNewRecordConfirm && formData.value.personalBaseToken){
      await bridge.setData('yy-auth-code', formData.value.personalBaseToken)
      await bridge.setData('yy-baseId', formData.value.baseId)
    }
  }
}, 200)
const getFormData = () => {
  this.getCacheFormData()
  return formData.value
}
const resetFormData = async() => {
  formData.value = {}
  await bridge.setData('yy-form-data', 1)
}
const setConfrimInfo = (info) => {
  confrimInfo.value = info
}
const getConfrimInfo = () => {
  return confrimInfo.value
}



const useConfirmInfo = () => {
  // 获取缓存的表单数据
  // getCacheFormData()  

  return {
    formData,
    confrimInfo,
    editDataFlag,
    setConfrimInfo,
    getConfrimInfo,
    setFormData,
    getFormData,
    getCacheFormData,
    getCacheAuthCode,
    resetFormData,
  }
}
export default useConfirmInfo