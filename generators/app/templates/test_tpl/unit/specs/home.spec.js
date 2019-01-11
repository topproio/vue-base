import Vue from 'vue';
import home from '@/page/home';

describe('home.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(home);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.content').textContent.trim())
      .to.equal('Welcome to Your Vue.js App');
  });
});
