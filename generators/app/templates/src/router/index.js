import Vue from 'vue';
import Router from 'vue-router';
import home from 'page/home.vue';

Vue.use(Router);

export const baseRouter = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
];

export default new Router({

  // mode: 'history', //后端支持可开
  routes: baseRouter
});
