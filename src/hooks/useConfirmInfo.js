import { ref } from 'vue'
import { bitable } from '@lark-base-open/js-sdk';

const bridge = bitable.bridge;
const formData = ref({
  isVerifyIdentity: true
})

// 获取缓存的表单数据
const getCacheFormData = async () => {
  const data = await bridge.getData('yy-form-data')
  if(data && Object.values(data).length){
    formData.value = Object.assign(formData.value, JSON.parse(data))
    return Promise.resolve(formData.value)
  }
  return Promise.resolve(null)
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
const confrimInfo = ref({
    "confirmId": "1849279010542968834",
    "confirmName": "数据表 3",
    "qrUrl": "https://salary-1307799014.cos.ap-beijing.myqcloud.com/images/micro-salaryfeishu-server/qrCode/2024/10/24/897076cabf0746a9bc418134878b92294768813334207917075.png",
    "createUserViewUrl": "https://www.yygongzi.com/gw/feishuapi/bitable/confirm/route/1/1849279010542968834",
    "userViewUrl": "https://www.yygongzi.com/gw/feishuapi/bitable/confirm/route/0/1849279010542968834",
    "domain": "https://www.yygongzi.com",
    "successRecords": [
      "recus1216Ak4wm"
    ]
})

const setFormData = async (val) => {
  if(val && typeof val == 'object' ){
    formData.value = Object.assign(formData.value, val)
    // 清空授权码
    await bridge.setData('yy-form-data', JSON.stringify(formData.value))
    // 记录当前的baseId的授权码
    if(formData.value.isNewRecordConfirm && formData.value.personalBaseToken){
      await bridge.setData('yy-auth-code', formData.value.personalBaseToken)
      await bridge.setData('yy-baseId', formData.value.baseId)
    }
  }
}
const getFormData = () => {
  return formData.value
}
const resetFormData = async() => {
  formData.value = {}
  await bridge.setData('yy-form-data', '')
}
const setConfrimInfo = (info) => {
  confrimInfo.value = info
}
const getConfrimInfo = () => {
  return confrimInfo.value
}

const useConfirmInfo = () => {
  return {
    formData,
    confrimInfo,
    setConfrimInfo,
    getConfrimInfo,
    setFormData,
    getFormData,
    getCacheFormData,
    getCacheAuthCode
  }
}
export default useConfirmInfo