import Vue from 'vue';
import vueRouter from 'vue-router';
import Vuetify from 'vuetify';
import { shallowMount } from '@vue/test-utils';
import Home from './Home.vue';

Vue.use(Vuetify, {
  iconfont: 'md',
});

describe('App.vue component matches snapshot', () => {
  it('for default view', () => {
    Vue.use(vueRouter);
    const wrapper = shallowMount(Home);
    expect(wrapper).toMatchSnapshot();
  });
});
