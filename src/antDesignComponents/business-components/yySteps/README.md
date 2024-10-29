# yy-steps

步骤条

## props

 | 参数 | 说明 | 类型 | 可选值 | 默认值 |
 | ---- | ---- | ---- | ---- | ---- |
 | steps | 步骤信息 | array | - | ｜
 | index | 当前步骤 | number | - | '' |
 | isSetRouteStep | 是否根据当前路由设置进度 | Boolean | - | true |
 | include | 组件换成 | array | - | [] |
 
## event

 | 参数 | 说明 | 类型 | 可选值 | 默认值 |
 | ---- | ---- | ---- | ---- | ---- |
 | next | 点击下一步时触发 | {from:string, to:string , next:function} | - | - |
 | prev | 点击上一步时触发 | {from:string, to:string , next:function} | - | - |

## 补充

yysteps可以直接跟路由关联，加载时读取`query.stepsStart` 设置起始步骤（value 从0开始）
