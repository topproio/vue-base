import axios from 'axios';
import Vue from 'vue';
const newVue = new Vue(); // newVue代指实例this

export default function httpRequest(paramsVal) { // 为空判断
  if (!paramsVal.params) {
    paramsVal.params = {};
  }
  let requestUrl = '';

  // 服务器地址
  requestUrl = paramsVal.url;

  // axios请求的配置
  const authOptions = {
    method: paramsVal.type || 'POST',
    url: requestUrl,
    timeout: 100000,
    data: paramsVal.params, // 接收参数
    headers: {
      'content-type': paramsVal.requestDataType || 'application/json', // 默认值
    },
  };

  // 是否开启isLoading
  if (paramsVal.needLoading) {

    // loading 功能
  }

  // post请求
  axios(authOptions)
    .then((response) => {
      if (response.data.code === 200) {
        if (paramsVal.success) {
          paramsVal.success(response.data);
        }
      } else if (paramsVal.error) {
        paramsVal.error(response.data);
      } else {  // 如果没有错误回调函数则默认提示错误信息
        newVue.$message.error(response.data.msg);
      }
    })
    .catch((error) => {
      newVue.$message.error(error);
    })
    .finally(() => {
      if (paramsVal.needLoading) {
        newVue.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          // 关闭loading
        });
      }
    });
};

