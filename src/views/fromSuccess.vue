<template>
    <div class="success">
      <div class="success-head">
        <img src="@/assets/img/success.png" width="16px" alt="">
      创建完成</div>
      <div class="success-desc">发送二维码/链接，邀请成员签字确认</div>
      <div class="success-qr">
        <img src="" alt="">
      </div>

      <div class="success-btn">
        <yy-button  class="yy-custom-btn-operate">复制链接</yy-button>
        <yy-button type="primary">下载二维码</yy-button>  
      </div>
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>
.success{
  max-width: 375px;
  margin: 0 auto;
  &-head{
    margin-top: 16px;
    font-weight: 600;
    font-size: 16px;
    color: #1F2329;
    line-height: 22px;
    text-align: left;
    font-style: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      margin-right: 6px;
    }
  }

  &-desc{
    margin-top: 8px;
    text-align: center;
    font-size: 14px;
    color: #8F959E;
    line-height: 20px;
    font-style: normal;
    margin-bottom: 24px;
  }

  &-qr{
    width: 280px;
    height: 296px;
    background: #FFFFFF;
    border-radius: 6px;
    border: 1px solid #E4E7ED;
    margin: 0 auto;
  }

  &-btn{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
  }
}
</style>