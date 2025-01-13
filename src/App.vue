<template>
  <div id="app">
    <micro-app class="my-app" :url='url' name="plugin"></micro-app>
  </div>
</template>

<script>
import microApp from '@micro-zoe/micro-app'
export default {
  name: 'App',
  components: {
    microApp
  },
  data () {
    return {
      url: 'https://www.yygongzi.com/plugin/index.html#/'
    }
  },
  created () {
    console.log(333)
    console.log(process.env)
    if (process.env.NODE_ENV !== 'development') {
      this.url  = (process.env.VUE_APP_API_URL || 'https://www.yygongzi.com') + `${process.env.VUE_APP_API_prefix}/plugin/index.html#/`
    } else {
      this.url = 'https://127.0.0.1:8089'
    }
    microApp.start()
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
