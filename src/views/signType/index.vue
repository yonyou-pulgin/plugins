<template>
  <div class="sign-type">
    <div class="sign-type-head">选择签字模式</div>
    <div class="sign-type-switch">
      <span :class="{'is-active': signType == 0}" @click="handleSignType(0)">单人签字</span>
      <span :class="{'is-active': signType == 1}" @click="handleSignType(1)">多人签字</span>
    </div>

    <div class="sign-type-list" :class="{'sign-list-all': currentConfigFields.length == 5}">
      <a-checkbox class="checkbox-plugin" :class="{'checkbox-margin': !signType && !isVerifyIdentity }" v-model:checked="isVerifyIdentity">是否验证身份</a-checkbox>

      <div class="sign-type-item" v-for="(item, index) in currentConfigFields" :key="item.key || index">
        <div class="sign-type-item-label" v-if="signType">
          <img src="@/assets/img/noSign.png" alt="">
          <span class="sign-type-item-title">选择签字人</span>
          <span v-if="configFields.length > 2" class="sign-type-item-del" @click="handleSignTypeDel(index)"> 删除</span>
        </div>
        <yy-select v-if="signType" class="yy-fs-from-item"  placeholder="请选择签字人" :showArrow="true" :options="userFields" v-model:value="item.signPeopleFieldId"  @change="handleChange(index, $event, 'user')"></yy-select>
        <div class="sign-type-item-label" v-if="isVerifyIdentity">
          <span class="sign-type-item-title">选择手机号</span>
        </div>
        <yy-select v-if="isVerifyIdentity" class="yy-fs-from-item"  placeholder="请选择手机号列" :showArrow="true" :options="phoneFields" v-model:value="item.mdnFieldId" @change="handleChange(index, $event, 'phone')"></yy-select>
      </div>

      <div v-if="signType && configFields.length < 5" class="sign-type-add" @click="handleSignTypeAdd">
        增加签字人
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, onBeforeMount, nextTick } from 'vue';
import yySwitch from '@/antDesignComponents/yySwitch/yy-switch.vue'
import yySelect from '@/antDesignComponents/yySelect/yy-select.vue'
import useTableBase from '@/hooks/useTableBase.js';
import useConfirmInfo from '@/hooks/useConfirmInfo'

const { setTableInfo, tableInfo, tableName, sheetList, fieldList, tenantKey, userId, } = useTableBase();
const { setFormData, formData:cacheFormData, getCacheAuthCode } = useConfirmInfo()

const initFlag = ref(false)
const isVerifyIdentity = ref(true)
const checked = ref(false)
const signType = ref(0)
const configFields = ref([
  {
    key: 1,
    mdnFieldId: null,
    mdnFieldName: null,
    signPeopleFieldId: null,
    signPeopleFieldName: null
  },
  {
    key: 2,
    mdnFieldId: null,
    mdnFieldId: null,
    mdnFieldName: null,
    signPeopleFieldId: null,
    signPeopleFieldName: null
  }
])

const singleConfigFields = ref([
  {
    key: 1,
    mdnFieldId: null,
    mdnFieldName: null
  }
])

const currentConfigFields = computed(() => {
  if(signType.value) return configFields.value
  return singleConfigFields.value
})
// 手机号列
const phoneFields = computed(() => {
  return fieldList.value.filter(item => item.type!=17 && !item.isHidden) || []
})
// 选择人员
const userFields = computed(() => {
  return fieldList.value.filter(item => [1,3,4,11,1003,1004].includes(item.type) && !item.isHidden) || []
})

// 获取手机号字段
const getPhoneField = () => {
  const phoneField = fieldList.value.filter(item => ( item.name.indexOf('手机') > -1 || item.name.indexOf('电话') > -1) && !item.isHidden)
  if(phoneField.length){
    singleConfigFields.value[0].mdnFieldId = phoneField[0].id || null
    singleConfigFields.value[0].mdnFieldName = phoneField[0].name || null
  } 
}

watch(() => [signType.value, isVerifyIdentity.value, configFields.value, singleConfigFields.value], (val) => {
  if(initFlag.value){
    let obj = {
      isVerifyIdentity: isVerifyIdentity.value,
      signType: signType.value,
      configFields: signType.value ? configFields.value : singleConfigFields.value
    }
    setFormData(obj)
  }
},{ deep: true})

// watch(() => fieldList.value, () => {
//   cacheFormData.value.configFields.map(item => {
//     item = Object.assign(item, {
//       mdnFieldId: null,
//       mdnFieldName: null,
//       signPeopleFieldId: null,
//       signPeopleFieldName: null
//     })
//     return item
//   })
//   console.log(cacheFormData.value.configFields)
//   if(signType.value){
//     configFields.value = JSON.parse(JSON.stringify(cacheFormData.value.configFields))
//   } else {
//     singleConfigFields.value = JSON.parse(JSON.stringify(cacheFormData.value.configFields))
//   }
// }, { deep: true })

onMounted(() => {
  isVerifyIdentity.value = cacheFormData.value.isVerifyIdentity
  signType.value = cacheFormData.value.signType || 0
  if(cacheFormData.value.configFields && cacheFormData.value.configFields.length) {
    if(signType.value){
      configFields.value = JSON.parse(JSON.stringify(cacheFormData.value.configFields))
    } else {
      singleConfigFields.value = JSON.parse(JSON.stringify(cacheFormData.value.configFields))
    }
  }
  nextTick(() => {
    initFlag.value = true
    getPhoneField()
  })
})

const handleSignType = (val) => {
  signType.value = val
  isVerifyIdentity.value = false
}
const handleSignTypeAdd = () => {
  configFields.value.push({
    key: Date.now(),
    mdnFieldId: null,
    signPeopleFieldId: null
  })
}
const handleSignTypeDel = (index) => {
  configFields.value.splice(index, 1)
}

const handleChange = (index, val, key) => {
  const fieldInfo = fieldList.value.filter(item => item.value == val)[0]
  if(signType.value){
    if(key =='phone'){
      configFields.value[index].mdnFieldName = fieldInfo.name
    } else {
      configFields.value[index].signPeopleFieldName = fieldInfo.name
    }
  } else {
    singleConfigFields.value[index].mdnFieldName = fieldInfo.name
  }
}
</script>

<style lang="scss" scoped>
.sign-type{
  padding: 0 20px;
  &-head{
    font-weight: 500;
    font-size: 14px;
    color: #333333;
    line-height: 20px;
  }

  &-switch{
    width: 160px;
    height: 32px;
    background: #FFFFFF;
    border-radius: 6px;
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-top: 12px;
    span{
      display: inline-block;
      width: 50%;
      text-align: center;
      font-weight: 400;
      font-size: 14px;
      color: #333333;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      border: 1px solid #D6DAE4;
      &:first-child{
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
      }
      &:last-child{
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
      }
      &:hover{
        border-color: #3A75FF;
      }
    }
    .is-active{
      color: #fff;
      background: #3A75FF;
      border-color: #3A75FF;
      &:hover{
        background: #6191ff;
        border-color: #6191ff;
      }
    }
  }

  &-list{
    padding: 12px;
    background: #F2F4F7;
    border-radius: 4px;
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    .ant-checkbox-wrapper {
      margin-bottom: 12px;
      span{
        font-weight: initial!important;
      }
    }
    .checkbox-margin{
      margin-bottom: 0;
    }
  }

  &-item{
    position: relative;
    &:not(:last-child):not(:nth-last-child(2)){
      &::before{
        content: '';
        top: 24px;
        left: 8px;
        bottom: 10px;
        position: absolute;
        border-left: 1px dashed #ccc;
      }
    }
    &-label{
      display: flex;
      flex-direction: row;
      position: relative;
      img{
        width: 18px;
        height: 18px;
        border-radius: 50%;
        position: absolute;
      }
    }
    &-title{
      flex: 1;
      font-weight: 600;
      font-size: 14px;
      color: #1F2329;
      line-height: 20px;
      margin-left: 6px;
      margin-left: 24px;
    }
    &-del{
      font-size: 14px;
      color: #FD3B3A;
      line-height: 20px;
      cursor: pointer;
      font-weight: initial;
    }

    .yy-fs-from-item{
      width: calc(100% - 24px)!important;
      margin-left: 24px;
      margin-bottom: 12px;
    }
  }

  &-add{
    width: 70px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    color: #3A75FF;
    line-height: 20px;
    margin-left: 24px;
  }
}

.sign-list-all{
  .sign-type-item{
    position: relative;
    &:not(:last-child):not(:nth-last-child(1)){
      &::before{
        content: '';
        top: 24px;
        left: 8px;
        bottom: 10px;
        position: absolute;
        border-left: 1px dashed #ccc;
      }
    }
  }
}
</style>
<style lang="scss">
.checkbox-plugin {
  .ant-checkbox + span{
    font-weight: initial;
  }
}
</style>