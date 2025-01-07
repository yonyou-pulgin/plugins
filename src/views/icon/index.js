const componentsInit = (vue) => {
  const requireComponent = require.context('./', true, /(yy|icon)-\S+\.vue$/)
  requireComponent.keys().forEach(fileName => {
    let names = fileName.split('/').pop().replace(/\.\w+$/, '')
    const componentConfig = requireComponent(fileName)
    vue.component(names, componentConfig.default)
  })
}

export default {
  install(vue) {
    componentsInit(vue)
  },
}