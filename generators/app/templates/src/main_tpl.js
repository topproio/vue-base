/*
 * The Vue build version to load with the `import` command
 * (runtime-only or standalone) has been set in webpack.base.conf with an alias.
 */

/* eslint-disable */

import Vue from 'vue'
import App from './App'
import router from './router'
// 状态管理工具
<% if(vueManage === 'vuex'){ %>
import store from "store";
<% } %>
<% if(vueManage === 'bus'){ %>
import vueBus from "./bus";
  Vue.use(vueBus);
<% } %>
// JS 工具库
<% if(jsTool === 'lodash'){ %>
import lodash from 'lodash'
Vue.prototype._ = lodash
<% } %>
<% if(jsTool === 'underscore'){ %>
import underscore from 'underscore'
Vue.prototype._ = underscore
<% } %>
// 路由拦截器
import "@/router-permission";
// UI组件
<% if(uiLibrary === 'elementUI'){ %>
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
<% } %>
<% if(uiLibrary === 'iview'){ %>
import iView from 'iview'
import 'iview/dist/styles/iview.css'
<% } %>
// 主样式文件
import "@/scss/main.scss";
import "common/font/iconfont.css";
import axios from "@/common/axios";
Vue.prototype.http = axios;
<% if(uiLibrary === 'elementUI'){ %>
Vue.use(ElementUI);
<% } %>
<% if(uiLibrary === 'iview'){ %>
Vue.use(iView)
<% } %>
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  <% if(vueManage === 'vuex'){ %>
  store,
  <% } %>
})
