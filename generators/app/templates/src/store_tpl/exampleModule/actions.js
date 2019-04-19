// import Vue from 'vue';
import request from '@/utils/request';

export default {

  /*
   * 示例
   *params: { }
   */
  async example({commit}, params) {
    const {success, data, error} = await request.post('', params);
    if (success) {
      commit('setExample', data);
      return Promise.resolve();
    } else {
      return Promise.reject(error);
    }
  }

};
