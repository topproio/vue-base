/**
 * ajax抽共通
 */

import axios from 'axios';
import Vue from 'vue';
const newVue = new Vue(); //newVue代指实例this
// import {getToken,removeToken} from 'common/auth';

export default function httpRequest(paramsVal) {
    // 为空判断
    if (!paramsVal.params) {
        paramsVal.params = {};
    }
    let  requestUrl = "";
    //服务器地址
    requestUrl = paramsVal.url;
    // axios请求的配置
   let authOptions = {
        method: paramsVal.type || 'POST',
        url: requestUrl,
        timeout: 100000,
        data: paramsVal.params, //post用此接收参数
        headers: {
            'content-type': paramsVal.requestDataType || 'application/json', // 默认值
            'TN-REQ-DATA-TYPE': 'json/text', //这个属性何用？
            // 'Authorization': getToken() ? "Bearer " + getToken() : '' //请求头设置token值
        },
    };
    //是否开启isLoading
    if(paramsVal.needLoading){
        //loading 功能
    }
    // post请求
    axios(authOptions)
        .then(
            (response) => {
                if (response.data.code == 200) {
                    if(paramsVal.success){
                        paramsVal.success(response.data);
                    }
                } else {
                    // 8001:Token 过期了（账号被踢也是让token失效）;
                    if (response.data.code == 8001) {
                        this.$router.push({ // 配合catch里面的8001或401报错实现跳转到登录页
                            path: '/'
                        });
                        return;
                    }
                    if (paramsVal.error) {
                        paramsVal.error(response.data);
                    }else{  //如果没有错误回调函数则默认提示错误信息
                        newVue.$message.error(response.data.msg);
                    }
                }
            }
        )
        .catch(function (error) {
            if(error.response &&error.response.data){
                let msg = error.response.data.msg;
                if(msg){
                    newVue.$message.error(msg);
                }
            }
        })
        .finally(()=>{
            if(paramsVal.needLoading){
                newVue.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                    //关闭loading
                });
            }
        })
};

