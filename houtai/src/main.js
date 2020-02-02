import Vue from 'vue'
import App from './App'
import router from './router'
// import store from "./index"
import store from './store/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import "./assets/css/global.css"
import "./assets/fonts/iconfont.css"
import ZkTable from 'vue-table-with-tree-grid'
// Vue.use(ZkTable)
Vue.component("tree-table", ZkTable)

import vueQuillEditor from "vue-quill-editor"

import "quill/dist/quill.core.css"
import "quill/dist/quill.snow.css"
import "quill/dist/quill.bubble.css"

Vue.use(vueQuillEditor)
// import NProgress from "nprogress"
// import "nprogress/nprogress.css"
import axios from "axios"
// import Timeline from "./plugins/timeline/index.js"
// import TimelineItem from "./plugins/timeline/index.js"
// Vue.use(Timeline)
// Vue.use(TimelineItem)
//asiox 拦截器  添加token字段
// request 拦截器  展示进度条  NProgress.start()
axios.interceptors.request.use(function (config) {
  //nProgress.start()  这是一种方法
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;  //必须返回config
})
// 在  response 拦截器  隐藏进度条  NProgress.done()
// axios.interceptors.response.use(function (config) {
//   // nProgress.done()  这是一种方法
//   return config;  //必须返回config
// })
Vue.prototype.$http = axios;
import { Message } from "element-ui"
Vue.prototype.$message = Message;
import { MessageBox } from "element-ui"

import echarts from "echarts"
import nProgress from 'nprogress'
Vue.prototype.$echarts = echarts
Vue.prototype.$comfirm = MessageBox.comfirm;
Vue.filter("dateFormat", function (originTime) {
  const dt = new Date(originTime)
  const year = dt.getFullYear()
  const month = (dt.getMonth() + 1 + "").padStart(2, "0")
  const day = (dt.getDate() + "").padStart(2, "0")
  const hour = (dt.getHours() + "").padStart(2, "0")
  const minutes = (dt.getMinutes() + "").padStart(2, "0")
  const second = (dt.getSeconds() + "").padStart(2, "0")

  return `${year}-${month}-${day} ${hour}:${minutes}:${second}`
})
Vue.config.productionTip = false;
new Vue({
  el: '#app',
  router,
  store,
  ElementUI,
  components: { App },
  template: '<App/>'
})
