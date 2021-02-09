import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/Home';

Vue.use(Router);

export default new Router({
  base: '/ym2149synth-web-editor',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home,
    },
  ],
});
