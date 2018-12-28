/*
 * The Vue build version to load with the `import` command
 * (runtime-only or standalone) has been set in webpack.base.conf with an alias.
 */
import Vue from 'vue';
// eslint-disable-next-line no-shadow
import App from './App';
import router from './router';
import '@/router-permission'; // 路由拦截

// 引用UI组件
import '@/scss/main.scss';
import 'common/font/iconfont.css';
import axios from '@/common/axios';

Vue.prototype.http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
});
