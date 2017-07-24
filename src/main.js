// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Application from '@/application';
import VueCircleSlider from 'vue-circle-slider';

import 'purecss';
import '../node_modules/purecss/build/grids-responsive.css';
import '../node_modules/font-awesome/scss/font-awesome.scss';

import App from './App';
import router from './router';
import store from '../store';

Vue.use(VueCircleSlider);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    Application,
  },
  router,
  store,
  template: '<App/>',
  components: { App },
});