import HTTP from '@base/http'
import { bitable } from '@lark-base-open/js-sdk';

// eslint-disable-next-line import/no-relative-packages\


const MockBase = 'https://yapi.yygongzi.cn/mock/79/gw/'

let language = 'zh'
const getLang = async () => {
  language = await bitable.bridge.getLanguage();
}
getLang()
const http = new HTTP({
  baseURL: process.env.VUE_APP_API_URL || 'https://www.yygongzi.com/',
  timeout: 1000 * 60 * 3,
})
http.requestCallBack = (res) => {
  res.headers = {
    lang: language
  }
}
// 创建确认单
export const createConfirm = (params) =>  http.post('feishuapi/bitable/confirm/create', params)
// 确认单预览
export const confirmPreview = (params) =>  http.post('feishuapi/bitable/confirm/preview', params)
// 确认单图片下载
export const confirmImgDown = (params) =>  http.get('feishuapi/bitable/confirm/qrcode/'+ params.confirm_id)
// 确认单更新
export const confirmUpdate = (params) =>  http.post('feishuapi/bitable/confirm/update', params)

// 确认单详情
export const confirmInfo = (params) =>  http.post('feishuapi/bitable/confirm/update', params)

export const confirmOperate = (params) =>  {
  if (params.operate === 'update' && params.confirmId) {
    return  http.post(`feishuapi/bitable/confirm/config/modify/${params.confirmId}`, params)
  } else {
    return http.post('feishuapi/bitable/confirm/create', params)
  }
}
// 确认单详情
export const getConfirmInfo = (params) =>  http.get(`feishuapi/bitable/confirm/config/${params.confirmId}`, params)


