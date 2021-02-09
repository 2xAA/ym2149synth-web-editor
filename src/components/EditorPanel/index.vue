<template>
  <div>
    <h2>Patch values:</h2>
    <div class="pure-g">
      <synth-type-selector></synth-type-selector>
      <range-control
        v-for="(range, idx) in ranges"
        :key="idx"
        :title="range.title"
        :label="range.label"
        :value="range.value"
        :cc="range.cc"
      ></range-control>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import RangeControl from './RangeControl';
  import SynthTypeSelector from './SynthTypeSelector';

  export default {
    name: 'editor-panel',
    data() {
      return {
        voice: 0,
        ranges: [
          { title: 'Fine-tune', label: 'Softwave-voice / Env-voice (Software PWM)', value: 0, cc: 1 },
          { title: 'Detune', label: 'Softwave-voice note detune in synth type: 5, otherwise square-voice detune', value: 0, cc: 2 },
          { title: 'Volume Envelope Shape', label: '0=OFF, 1-63=Ramp up time, 64-127=Ramp down time', value: 0, cc: 4 },
          { title: 'Portamento', value: 0, cc: 5 },
          { title: 'Vibrato Rate', value: 0, cc: 6 },
          { title: 'Vibrato Depth', value: 0, cc: 7 },
          { title: 'Trigger Noise Delay', label: '(useful for snare tail or Env synth type effect)', value: 0, cc: 8 },
          { title: 'Pitch Envelope Amount', value: 0, cc: 9 },
          { title: 'Pitch Envelope Shape', label: '0=OFF, 1-63=Ramp up time, 64-127=Ramp down time', value: 0, cc: 10 },
          { title: 'Transpose', label: '64 center', value: 64, cc: 11 },
        ],
      };
    },
    computed: {
      ...mapGetters('status', [
        'connected',
      ]),
      ...mapGetters('values', {
        getVoice: 'voice',
        channel: 'channel',
      }),
    },
    methods: {
      ...mapActions('values', [
        'writeValue',
      ]),
      updateChannel(e) {
        this.$data.channel = e.channel;
      },
    },
    watch: {
      voice() {
        this.writeValue({
          channel: this.channel,
          id: 3,
          value: parseInt(this.voice, 10),
        });
      },
    },
    components: {
      RangeControl,
      SynthTypeSelector,
    },
  };
</script>
