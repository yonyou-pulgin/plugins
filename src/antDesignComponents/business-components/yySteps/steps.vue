<template>
  <ul class="steps">
    <li
      v-for="(item, index) in items"
      :key="items.key"
      class="steps-item"
      :class="{
        active: current === index,
        visited: index < current
      }">
      <div class="steps-item-title">
        <span class="steps-serial-number" v-if="index < current"> &nbsp; </span>
        <span v-else class="steps-serial-number">
          {{ index + 1 }}
        </span>
        <span class="steps-title">{{ item.title }}</span>
      </div>
    </li>
  </ul>
</template>

<script setup>

const props = defineProps({
  current: {
    type: Number,
    default: 0,
  },
  items: {
    type: Object,
    default: () => ({ key: '', title: '' }),
  },
})
</script>
<style scoped lang="scss">
.steps {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  li:not(:last-child) {
    background: #fff;
    flex: 1;
  }
  .steps-item {
    position: relative;

    &:first-child{
      .steps-item-title{
        padding-left: 20px;
      }
    }

    &:last-child{
      .steps-item-title{
        padding-right: 20px;
      }
    }
    .steps-item-title {
      display: inline-block;
      height: 20px;
      background: #fff;
      padding: 0px 6px;
      position: relative;
      z-index: 1;
      display: inline-flex;
      align-items: center;
      .steps-serial-number {
        display: inline-block;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #d6dae4;
        font-size: 12px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 600;
        color: #f7f8fa;
        text-align: center;
        line-height: 18px;

      }
      .steps-title {
        display: inline-block;
        font-size: 14px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: #909399;
        margin-left:6px;
        line-height: 20px;
      }
    }

    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background: url('./imgs/line-link.png') repeat-x;
      background-size: 16px 2px;
      position: absolute;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 0;
    }
    &.active {
      .steps-serial-number {
        background: #3a75ff;
      }
      .steps-title {
        font-weight: 500;
        color: #3a75ff;
      }
    }
    &.visited {
      .steps-serial-number {
        background: url(./imgs/visited.png) no-repeat center center;
        background-size: 100% 100%;
      }
      .steps-title {
      }
      &:after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background: url('./imgs/line-active.png') repeat-x;
      background-size: 16px 2px;
      position: absolute;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 0;
    }
    }
  }
}
</style>
