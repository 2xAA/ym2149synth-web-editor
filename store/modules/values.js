import store from '@/../store';
import Vue from 'vue';
import WebMidi from 'webmidi';
import isSynth from '@/application/is-synth';

const state = {
  values: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64],
  ],
  channel: 1,
  keyboardOctave: 2,
};

const timers = [];

// getters
const getters = {
  value: state => (channel, id) => state.values[channel - 1][id - 1],
  voice: state => (channel) => state.values[channel - 1],
  values: state => state.values,
  channel: state => state.channel,
  keyboardOctave: state => state.keyboardOctave,
};

// actions
const actions = {
  writeValue({ commit, state }, { id, value }) {
    const channel = state.channel;
    const currentOutput = WebMidi.outputs.find((output) => output.id === store.getters['status/id']);

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
  },
  loadPatchFromDevice({ commit, state }, { channel, id }) {
    const currentOutput = WebMidi.outputs.find((output) => output.id === store.getters['status/id']);
    const currentInput = WebMidi.inputs.find(input => isSynth(input));
    const capture = [];

    function ccHandle(e) {
      capture.push(e.data[2]);

      // The YM2149 Synth patches are only 11 bytes, the rest is padding to meet MIDI spec
      if(capture.length === 11) {
        currentInput.removeListener('controlchange', state.channel, ccHandle);

        capture.forEach((data, idx) => commit('setValue', { channel: channel - 1, id: idx, value: data }))
      }
    }

    currentInput.on('controlchange', channel, ccHandle);

    // Load patch on device
    currentOutput.sendChannelMode(120, id - 1, channel);

    // Ask device to send patch after delay
    // @TODO Is this really necessary?
    setTimeout(() => {
      currentOutput.sendChannelMode(122, id - 1, channel);
    }, 80);
  },
  savePatchToDevice({ commit, state }, { id }) {
    const currentOutput = WebMidi.outputs.find((output) => output.id === store.getters['status/id']);
    currentOutput.sendChannelMode(121, id - 1, state.channel);
  },
  incrementOctave({ commit, state }) {
    if(state.keyboardOctave < 6) {
      commit('setKeyboardOctave', { octave: state.keyboardOctave + 1 });
    }
  },
  decrementOctave({ commit, state }) {
    if(state.keyboardOctave > 0) {
      commit('setKeyboardOctave', { octave: state.keyboardOctave - 1 });
    }
  }
};

// mutations
const mutations = {
  setValue(state, { channel, id, value }) {
    Vue.set(state.values[channel], id, value);
  },
  setChannel(state, { channel }) {
    Vue.set(state, 'channel', channel);
  },
  setKeyboardOctave(state, { octave }) {
    Vue.set(state, 'keyboardOctave', octave);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};