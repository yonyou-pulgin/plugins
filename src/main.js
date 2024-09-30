import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import './assets/base.css'

import {i18n} from './locales/i18n.js'
import router from './router/index.js'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

import './assets/antReset.scss'
// import yycomponents from '../componentsV3/src/lib/index.js'
createApp(App).use(Antd).use(router).use(i18n).mount('#app') // 注入国际化函数$t


// createApp(App).mount('#app')
