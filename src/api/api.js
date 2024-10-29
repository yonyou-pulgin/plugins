import HTTP from '@base/http'
// eslint-disable-next-line import/no-relative-packages\


const MockBase = 'https://yapi.yygongzi.cn/mock/79/gw/'

console.log(process.env)

const http = new HTTP({
  baseURL: process.env.VUE_APP_API_URL || 'https://www.yygongzi.com/',
  timeout: 1000 * 60 * 3,
})
// 创建确认单
export const createConfirm = (params) =>  http.post('feishuapi/bitable/confirm/create', params)
// 确认单预览
export const confirmPreview = (params) =>  http.post('feishuapi/bitable/confirm/preview', params)
// 确认单图片下载
export const confirmImgDown = (params) =>  http.get('feishuapi/bitable/confirm/qrcode/'+ params.confirm_id)
// 确认单更新
export const confirmUpdate = (params) =>  http.post('feishuapi/bitable/confirm/update', params)
