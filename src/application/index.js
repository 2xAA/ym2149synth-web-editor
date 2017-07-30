import WebMidi from 'webmidi';
import store from '@/../store';
import keyboard from './keyboard';
import isSynth from './is-synth';

window.WebMidi = WebMidi;

class Application {
  constructor() {
    WebMidi.enable((err) => {
      if(err) {
        console.log('WebMidi could not be enabled.', err);
      } else {
        this.setup();
      }
    }, true);
  }

  setup() { //eslint-disable-line
    WebMidi.addListener('connected', (e) => {
      if(!('output' in e)) return;

      store.commit('status/setInputs', { inputs: WebMidi.inputs.map(input => input) });

      if(isSynth(e)) {
        // let sendValues = false;
        // if(this.newDeviceDialog()) {
        //   sendValues = true;
        //   console.log('Should send current editor values to Synth memory');
        // }
        store.dispatch('status/registerDeviceId', { id: e.id/* , sendValues */ });
      }
    });

    WebMidi.addListener('disconnected', (e) => {
      store.commit('status/setInputs', { inputs: WebMidi.inputs.map(input => input) });

      if(store.getters['status/id'] === e.id) {
        store.dispatch('status/resetStatus');
      }
    });

    store.commit('status/setInputs', { inputs: WebMidi.inputs.map(input => input) });

    WebMidi.outputs.forEach((output) => {
      if(isSynth(output)) {
        store.dispatch('status/registerDeviceId', { id: output.id });
      }
    });

    keyboard();
  }

  newDeviceDialog() { //eslint-disable-line
    return confirm('New YM2149 Synth connected, send current editor values to Synth?'); //eslint-disable-line
  }
}

const application = new Application();

export default application;