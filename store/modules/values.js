import store from '@/../store';
import Vue from 'vue';
import WebMidi from 'webmidi';

const state = {
  cc1: 0,
  cc2: 0,
  cc3: 0,
  cc4: 0,
  cc5: 0,
  cc6: 0,
  cc7: 0,
  cc8: 0,
  cc9: 0,
  cc10: 0,
  cc11: 0,
};

// getters
const getters = {
  value: state => (id) => state[`cc${id}`],
  values: state => state
};

// actions
const actions = {
  writeValue({ commit, state }, { id, value }) {
    let currentOutput;
    WebMidi.outputs.forEach((output) => {
      if(output.id === store.getters['status/id']) currentOutput = output;
    });

    if(currentOutput) {
      currentOutput.sendControlChange(id, value);
      currentOutput.playNote('C3');
    }

    commit('setValue', { id, value });
  }
};

// mutations
const mutations = {
  setValue(state, { id, value }) {
    Vue.set(state, `cc${id}`, value);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};