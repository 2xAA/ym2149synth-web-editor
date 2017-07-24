<template>
  <div>
    <h1>YM2149Synth Patch Editor</h1>
    <h2>Connected: {{ connected }} <span v-if='name'>({{ name }})</span></h2>
    <load-patch></load-patch>
    <save-patch></save-patch>
    <save-to-file></save-to-file>
    <hr>
    <h3>Playback options*</h3>
    <small>(*these options are not saved in the patch, they are for testing sound playback in the editor only)</small>
    <channel-selector></channel-selector>
    <octave-selector></octave-selector>
    <hr>
    <editor-panel></editor-panel>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import WebMidi from 'webmidi';

  import LoadPatch from './LoadPatch';
  import SavePatch from './SavePatch';
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
      LoadPatch,
      SavePatch,
      SaveToFile,
      ChannelSelector,
      OctaveSelector,
      EditorPanel,
    },
  };
</script>

<style scoped lang='scss'>

</style>