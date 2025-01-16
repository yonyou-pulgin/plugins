<template>
  <div id="app">
    <micro-app class="my-app" :url='url' name="plugin"></micro-app>
  </div>
</template>

<script>
import microApp from '@micro-zoe/micro-app'
export default {
  name: 'App',
  components: {},
  data () {
    return {
      url: 'https://www.yygongzi.com/plugin/index.html#/'
    }
  },
  created () {
    if(window.localStorage.getItem('plugin_prefix')) {
      const plugin_prefix = window.localStorage.getItem('plugin_prefix')
      this.url = `https://${plugin_prefix}.yygongzi.com/${plugin_prefix}plugin/index.html#/`
    } else if (process.env.NODE_ENV !== 'development' && !window.location.href.includes('127.0.0.1')) {
      this.url  = (process.env.VUE_APP_API_URL || 'https://www.yygongzi.com/') + `${process.env.VUE_APP_API_prefix}plugin/index.html#/`
    } else {
      this.url = 'https://www.yygongzi.com/plugin/#/'
    }
    microApp.start({
      'disable-memory-router': true, // 关闭虚拟路由系统
      'disable-patch-request': true, // 关闭对子应用请求的拦截
    })
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  border: none;
}
html, body {
  height: 100%;
  width: 100%;
}
#app,.my-app {
  height: 100%;
  width: 100%;
}
</style>
