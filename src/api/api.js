import HTTP from '@base/http'
// eslint-disable-next-line import/no-relative-packages\


const MockBase = 'https://yapi.yygongzi.cn/mock/69/gw/'

const http = new HTTP({
  baseURL: '/gw/',
  timeout: 1000 * 60 * 3,
})

