<template>
  <div class="sign-type">
    <div class="sign-type-head"> {{ $t('secondSetting.confirmNameSignType') }}</div>
    <div class="sign-type-switch" :class="{'sign-type-switch-disabled':isEditVisible , 'sign-type-auto': tableInfo.lang != 'zh'}">
      <span :class="{'is-active': signType == 0}" @click="handleSignType(0)"> {{ $t('secondSetting.confirmNameSignType1') }}</span>
      <span :class="{'is-active': signType == 1}" @click="handleSignType(1)"> {{ $t('secondSetting.confirmNameSignType2') }}</span>
    </div>

    <div class="sign-type-list" :class="{'sign-list-all': currentConfigFields.length == 5, 'sign-type-switch-disabled':isEditVisible}">
      <a-checkbox class="checkbox-plugin" :disabled="isZHLang" :class="{'checkbox-margin': !signType && !isVerifyIdentity }" v-model:checked="isVerifyIdentity"> {{ $t('secondSetting.isVerify') }}</a-checkbox>

      <div class="sign-type-item" v-for="(item, index) in currentConfigFields" :key="item.key || index">
        <div class="sign-type-item-label" v-if="signType">
          <img src="@/assets/img/noSign.png" alt="">
          <span class="sign-type-item-title">{{ $t('secondSetting.selectPerson') }}</span>
          <span v-if="configFields.length > 2 && !isEditVisible" class="sign-type-item-del" @click="handleSignTypeDel(index)">  {{ $t('secondSetting.deleteSelectPerson') }}</span>
        </div>
        <yy-select v-if="signType" class="yy-fs-from-item" :placeholder="$t('secondSetting.selectPersonTip')" :showArrow="true" :options="userFields" v-model:value="item.signPeopleFieldId"  @change="handleChange(index, $event, 'user')"></yy-select>
        <div class="sign-type-item-label" v-if="isVerifyIdentity">
          <span class="sign-type-item-title">{{ $t('secondSetting.selectPhone') }}</span>
        </div>
        <yy-select :disabled="isZHLang" v-if="isVerifyIdentity" class="yy-fs-from-item"  :placeholder="$t('secondSetting.selectPhoneTip')" :showArrow="true" :options="phoneFields" v-model:value="item.mdnFieldId" @change="handleChange(index, $event, 'phone')"></yy-select>
      </div>

      <span v-if="signType && configFields.length < 5 && !isEditVisible" class="sign-type-add" @click="handleSignTypeAdd">
        {{ $t('secondSetting.addSelectPerson') }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, onBeforeMount, nextTick } from 'vue';
import yySwitch from '@/antDesignComponents/yySwitch/yy-switch.vue'
import yySelect from '@/antDesignComponents/yySelect/yy-select.vue'
import useTableBase from '@/hooks/useTableBase.js';
import useConfirmInfo from '@/hooks/useConfirmInfo'

const { setTableInfo, tableInfo, tableName, sheetList, fieldList, tenantKey, userId, confirmId } = useTableBase();
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
const isEditVisible = computed(() => {
  return confirmId.value && cacheFormData.value.confirmId ? true : false
})
// 手机号列
const phoneFields = computed(() => {
  return fieldList.value.filter(item => item.type!=17 && !item.isHidden) || []
})
// 选择人员
const userFields = computed(() => {
  return fieldList.value.filter(item => [1,3,4,11, 19, 1003,1004].includes(item.type) && !item.isHidden) || []
})
// 所有字段id
const allFieldId = computed(() => {
  return fieldList.value.map(item => item.id) || []
})

const isZHLang = computed(() => {
  return tableInfo.value.lang != 'zh'
})
const handleEditToast = () => {
  message.error({
    content: '不可修改！如需修改，请重新创建确认单',
    class: 'yy-message-error',
  })
}
// 获取手机号字段
const getPhoneField = () => {
  const phoneField = fieldList.value.filter(item => ( item.name.indexOf('手机') > -1 || item.name.indexOf('电话') > -1) && !item.isHidden)
  if(phoneField.length){
    singleConfigFields.value[0].mdnFieldId = phoneField[0].id || null
    singleConfigFields.value[0].mdnFieldName = phoneField[0].name || null
  }
}

watch(() => [fieldList.value], (val) => {
  if(val){
    configFields.value = configFields.value.map(item => {
      item.mdnFieldId = allFieldId.value.includes(item.mdnFieldId) ? item.mdnFieldId : null
      item.signPeopleFieldId = allFieldId.value.includes(item.signPeopleFieldId) ? item.signPeopleFieldId : null
      return item
    })
  }
}, {deep: true})

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

onMounted(() => {
  isVerifyIdentity.value = cacheFormData.value.isVerifyIdentity
  if(tableInfo.value.lang!= 'zh'){
    isVerifyIdentity.value = false
  }
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
  if(val == 0){
    singleConfigFields.value = [
      {
        key: +Date.now(),
        mdnFieldId: null,
        mdnFieldName: null
      }
    ]
  }
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

  &-auto{
    width: 100%;
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
    // width: 70px;
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

.sign-type-switch-disabled{
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
<style lang="scss">
.checkbox-plugin {
  .ant-checkbox + span{
    font-weight: initial;
  }
}
</style>