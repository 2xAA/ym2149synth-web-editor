import Vue from 'vue';
import Vuex from 'vuex';

import status from './modules/status';
import values from './modules/values';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
if(debug) {
  console.warn(`YM2149 Editor: Vuex is in STRICT mode as NODE_ENV is set to "${process.env.NODE_ENV}".\n
All commits are syncronously watched. Performance lag is due to this.`);
}

export default new Vuex.Store({
  modules: {
    status,
    values
  },
  strict: debug
});