<template>
  <div id="app">
     <micro-app class="my-app" url='https://127.0.0.1:8089/#/' name="pligin"></micro-app>
  </div>
</template>

<script>
import microApp from '@micro-zoe/micro-app'
export default {
  name: 'App',
  components: {
    microApp
  },
  created () {
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
