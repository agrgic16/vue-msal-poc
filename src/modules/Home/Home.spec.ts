import Vue from 'vue';
import vueRouter from 'vue-router';
import Vuetify from 'vuetify';
import { shallowMount } from '@vue/test-utils';
import Home from './Home.vue';

Vue.use(Vuetify, {
  iconfont: 'md',
});

describe('Home.vue', () => {
  it('renders', () => {
    Vue.use(vueRouter);
    const wrapper = shallowMount(Home);
    expect(wrapper).toBeTruthy();
  });
});
