import router from 'router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {setToken,getToken,removeToken} from '@/common/auth' // 验权
//whiteList 存放不需要被路由token的路径
const whiteList = ['/login','/home','/demoUI',]

router.beforeEach((to, from, next) => {
    NProgress.start();
    //登录成功后每次访问路由先检查是否有token
    if (getToken()) {

        if(to.path=='/'){
            next();
            return;
        }
        

    }else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            removeToken();
            if(to.path == '/'){
                next();
            }else{
                next('/');
            }
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})
