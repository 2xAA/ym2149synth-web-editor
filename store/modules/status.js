import Vue from 'vue';

const initialState = {
  synthConnected: false,
  synthId: '',
  inputs: [],
};

// getters
const getters = {
  connected: state => state.synthConnected,
  id: state => state.synthId,
  inputs: state => state.inputs,
};

// actions
const actions = {
  registerDeviceId({ commit, state }, { id }) {
    commit('setConnected', { connected: true });
    commit('setId', { id });
  },
  resetStatus({ commit }) {
    commit('setConnected', { connected: false });
    commit('setId', { id: '' });
  },
};

// mutations
const mutations = {
  setConnected(state, { connected }) {
    Vue.set(state, 'synthConnected', connected);
  },
  setId(state, { id }) {
    Vue.set(state, 'synthId', id);
  },
  setInputs(state, { inputs }) {
    Vue.set(state, 'inputs', inputs);
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
