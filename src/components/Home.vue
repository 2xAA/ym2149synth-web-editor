<template>
  <div>
    <h1>YM2149Synth Patch Editor</h1>
    <h2>Connected: {{ connected }} <span v-if='name'>({{ name }})</span></h2>
    <div class='pure-g'>
      <midi-device-list></midi-device-list>
      <load-patch></load-patch>
      <save-patch></save-patch>
    </div>
    <load-from-file></load-from-file>
    <save-to-file></save-to-file>
    <hr>
    <h2>Playback options*</h2>
    <small>*these options are not saved in the patch, they are for testing sound playback in the editor only</small>
    <div class="pure-g">
      <channel-selector></channel-selector>
      <octave-selector></octave-selector>
    </div>
    <hr>
    <editor-panel></editor-panel>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import WebMidi from 'webmidi';

  import MidiDeviceList from './MidiDeviceList';
  import LoadPatch from './LoadPatch';
  import SavePatch from './SavePatch';
  import LoadFromFile from './LoadFromFile';
  import SaveToFile from './SaveToFile';
  import ChannelSelector from './ChannelSelector';
  import OctaveSelector from './OctaveSelector';
  import EditorPanel from './EditorPanel';

  export default {
    name: 'home',
    computed: {
      ...mapGetters('status', [
        'connected',
        'id',
      ]),
      name() {
        let name;
        WebMidi.outputs.forEach((output) => {
          if(output.id === this.id) name = output.name;
        });
        return name;
      },
    },
    components: {
      MidiDeviceList,
      LoadPatch,
      SavePatch,
      LoadFromFile,
      SaveToFile,
      ChannelSelector,
      OctaveSelector,
      EditorPanel,
    },
  };
</script>
