<template>
  <div class="yy-steps" v-if="steps.length">
    <min-steps class="header" :current="current" :items="items" v-if="steps.length > 1"></min-steps>
    <!-- <a-steps class="header" :current="current" :items="items" v-if="steps.length > 1"></a-steps> -->

    <div class="yy-steps-container">
      <div class="steps-content" v-if="steps[current]" :class="{'one': steps.length === 1}">
        <keep-alive :include="props.include">
          <component :is="steps[current].content"></component>
        </keep-alive>
      </div>
      <div class="steps-action"  v-if="steps.length > 1">
        <slot>
          <a-button class="steps-action-button yy-custom-btn-operate" v-if="current > 0" @click="prev">上一步</a-button>
          <a-button
            class="steps-action-button"
            :class="{'disable': nextButtonDisabled}"
            v-if="current < steps.length - 1"
            type="primary"
            @click="next"
          >下一步</a-button
          >
          <a-button
            class="steps-action-button"
            :class="{'disable': nextButtonDisabled}"
            v-if="current == steps.length - 1"
            type="primary"
            @click="finish"
          >
            完成
          </a-button>
        </slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import minSteps from './steps.vue'
import { useRoute, useRouter } from 'vue-router'
import { debounce } from 'lodash'

const props = defineProps({
  indes: {
    type: Number,
    default: 0,
  },
  steps: {
    type: Array,
    default: () => [],
  },
  // 是否根据当前路由设置步骤 (fix 两个步骤条)
  isSetRouteStep: {
    type: Boolean,
    default: true,
  },
  // 组件缓存
  include: {
    type: Array,
    default: () => [],
  },
  // 下一步以及完成按钮是否可用
  nextButtonDisabled: {
    type: Boolean,
    default: false,
  },
})
const current = ref(props.indes) // 当前步骤
const route = useRoute()
const router = useRouter()
// 设置步骤的起始进度
if (route.query.stepsStart && props.isSetRouteStep) {
  current.value = Number(route.query.stepsStart)
}

const emit = defineEmits(['next', 'prev', 'finish'])
// 下一步
const next = () => {
  if (props.nextButtonDisabled) return
  emit('next', {
    from: current.value,
    to: current.value + 1,
    next: (index) => {
      if (index) {
        current.value = index
      } else {
        current.value++
      }
      if (props.isSetRouteStep) {
        router.replace({
          name: route.name,
          query: {
            ...route.query,
            stepsStart: current.value,
          },
        })
      }
    },
  })
}
// 上一步
const prev = () => {
  emit('prev', {
    from: current.value,
    to: current.value - 1,
    next: () => {
      current.value--
      if (props.isSetRouteStep) {
        router.replace({
          name: route.name,
          query: {
            ...route.query,
            stepsStart: current.value,
          },
        })
      }
    },
  })
}

const finish = debounce(() => {
  if (props.nextButtonDisabled) return
  emit('finish')
}, 500)

const items = props.steps.map(item => ({ key: item.title, title: item.title }))

watch(() => props.indes, (newVal) => {
  if (props.isSetRouteStep) {
    current.value = newVal
    router.replace({
      name: route.name,
      query: {
        ...route.query,
        stepsStart: newVal,
      },
    })
  } else {
    current.value = newVal
  }
})
</script>
<style scoped lang="scss">
.yy-steps {
  display: flex;
  flex-direction: column;
  .header {
    width: 100%;
    padding: 18px 0px;
    margin: auto;
  }
  :deep(.ant-steps-item) {
    .ant-steps-item-icon {
      width: 20px;
      height: 20px;
      margin-right: 6px;
      background: #d6dae4;
      line-height: 18px;
      border: 0px;

      span {
        font-size: 12px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #f7f8fa;
      }
    }

    .ant-steps-item-content {
      .ant-steps-item-title {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #909399;
        line-height: 20px;

        &:after {
          border: 1px dashed #bcc2cc;
          background: transparent;
          height: 0px;
          top: 9px;
        }
      }

      &:hover {
        .ant-steps-item-icon {
          border: 0px;

          span {
            color: #f7f8fa;
          }
        }

        .ant-steps-item-content {
          .ant-steps-item-title {
            color: #909399 !important;
          }
        }
      }
    }

    &.ant-steps-item-finish {
      .ant-steps-item-icon {
        width: 18px;
        height: 18px;
        background: transparent;
        border: 1px solid #3a75ff;

        span {
          svg {
            color: #3a75ff;
          }
        }
      }

      .ant-steps-item-title {
        &::after {
          border: 1px dashed #3a75ff;
          background: transparent;
        }
      }
    }

    &.ant-steps-item-active {
      .ant-steps-item-icon {
        background: #3a75ff;
      }

      .ant-steps-item-title {
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #3a75ff;
      }
    }
  }

  .yy-steps-container{
    flex: 1;
    flex-direction: column;
    display: flex;
    overflow-y: scroll;
  }

  .steps-content {
    flex: 1;
    // max-height: calc(100% - 56px - 56px);
    padding-top: 20px;
    border-bottom: 1px solid #e4e7ed;
    &.one {
      height: 100%;
      max-height: 100%;
    }
  }
  .steps-action {
    padding: 12px 6px;
    display: flex;
    justify-content: flex-end;
    .steps-action-button {
      margin-right: 12px;
      &.disable {
        background: #9CBAFF;
        cursor: not-allowed;
      }
    }
  }
}
</style>
<style>

</style>
