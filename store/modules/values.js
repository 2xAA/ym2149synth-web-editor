import store from '@/../store';
import Vue from 'vue';
import WebMidi from 'webmidi';

const state = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64]
];

const timers = [];

// getters
const getters = {
  value: state => (channel, id) => state[channel][id],
  voice: state => (channel) => state[channel],
  values: state => state
};

// actions
const actions = {
  writeValue({ commit, state }, { channel, id, value }) {
    let currentOutput;
    WebMidi.outputs.forEach((output) => {
      if(output.id === store.getters['status/id']) currentOutput = output;
    });

    if(currentOutput) {
      currentOutput.sendControlChange(id, value, channel);

      if(timers[channel - 1]) {
        clearTimeout(timers[channel - 1]);
        currentOutput.stopNote('C2', channel);
      }

      currentOutput.playNote('C2', channel);

      timers[channel - 1] = setTimeout(() => {
        currentOutput.stopNote('C2', channel);
        timers[channel - 1] = null;
      }, 1000);
    }

    commit('setValue', { channel: channel - 1, id: id - 1, value });
  }
};

// mutations
const mutations = {
  setValue(state, { channel, id, value }) {
    Vue.set(state[channel], id, value);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};