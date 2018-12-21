// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
<% if(vueManage === 'vuex'){ %>
import store from "store";
<% } %>
<% if(vueManage === 'bus'){ %>
import vueBus from "./bus";
<% } %>
import "@/router-permission"; // 路由拦截

// 引用UI组件

<% if(uiLibrary === 'elementUI'){ %>
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
<% } %>

<% if(uiLibrary === 'iview'){ %>
import iView from 'iview'
import 'iview/dist/styles/iview.css'
<% } %>

import "@/scss/main.scss";
import "common/font/iconfont.css";
import http from "@/common/axios";
window.httpReq = http;

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
