<template>
  <yy-button class="steps-action-button yy-custom-btn-operate" @click="handleAddGroup">
    <div class="fire-icon">
      <svg width="15px" height="18px" viewBox="0 0 15 18" version="1.1" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>正常400宽度-第一步选择数据 copy 10</title>
        <g id="二期优化" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="正常400宽度-第一步选择数据-copy-10" transform="translate(-114, -691)">
            <rect fill="#F5F6F7" x="0" y="0" width="416" height="728"></rect>
            <rect id="Rectangle" fill="#FFFFFF" x="66" y="0" width="350" height="728"></rect>
            <g id="Group-13" transform="translate(66, 672)">
              <rect id="Rectangle" fill="#FFFFFF" x="0" y="0" width="350" height="56"></rect>
              <g id="Group-7-Copy-18" transform="translate(36, 12)">
                <rect id="Rectangle" stroke="#BBBFC4" fill="#FFFFFF" x="0.5" y="0.5" width="109" height="31" rx="4">
                </rect>
                <text id="🔥加入交流群" font-family="AppleColorEmoji, Apple Color Emoji" font-size="14" font-weight="normal"
                  fill="#1F2329">
                  <tspan x="10.3" y="24">🔥</tspan>
                  <tspan x="29.3" y="24" font-family="PingFangSC-Regular, PingFang SC">加入交流群</tspan>
                </text>
              </g>
            </g>
          </g>
        </g>
      </svg>

      加入交流群
    </div>
  </yy-button>
</template>

<script setup>
import yyButton from '@/antDesignComponents/yyButton/yy-button.vue';
import jslog from 'jsLog';

const jslogInstance = new jslog();
const handleAddGroup = () => {
  try {
    jslogInstance.push({
      eventId: "plugin_addGroupBtn",
      name: '按钮加群',
      params: ''
    })
  } catch (error) {
    console.log(error);
  }
  window.open('https://go.larkoffice.com/join-chat/22cs5666-9280-479f-9afc-c6a2792a8e41')
}
</script>

<style lang="scss" scoped>
.fire-icon{
  display: flex;
  align-items: center;
  svg{
    margin-top: -5px;
  }
}
</style>