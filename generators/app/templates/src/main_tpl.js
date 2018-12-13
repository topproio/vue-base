// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "store";
import "@/router-permission"; // 路由拦截

// 引用UI组件

<% if(uiLibrary === 'elementUI'){ %>
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
<% } %>
import "@/scss/main.scss";
import "common/font/iconfont.css";
import http from "@/common/ajax";
window.httpReq = http;

<% if(uiLibrary === 'elementUI'){ %>
Vue.use(ElementUI);
<% } %>

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
})
