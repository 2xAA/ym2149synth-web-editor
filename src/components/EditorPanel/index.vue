<template>
  <div>
    <range-control
      v-for='range in ranges'
      :title='range.title'
      :label='range.label'
      :value='range.value'
      :cc='range.cc'
    ></range-control>
    CC3 - Synth Type:<br>
    <select :disabled='!connected' v-model='voice'>
      <option value='0'>Square-voice</option>
      <option value='1'>Square-voice + Env-voice Saw (Square pitch modulations are soloed for "acid" effects.)</option>
      <option value='2'>Square-voice + Env-voice Triangle (Square pitch modulations are soloed for "acid" effects.)</option>
      <option value='3'>Env-voice Triangle</option>
      <option value='4'>Env-voice Saw</option>
      <option value='5'>Square-voice + Softwave-voice (PWM)</option>
      <option value='6'>Square-voice + Softwave-voice (Square pitch modulations are soloed for "acid" effects.)</option>
      <option value='7'>Noise</option>
    </select>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import RangeControl from './RangeControl';

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
    },
    methods: {
      ...mapActions('values', [
        'writeValue',
      ]),
    },
    components: {
      RangeControl,
    },
    watch: {
      voice() {
        this.writeValue({
          id: 3,
          value: parseInt(this.voice, 10),
        });
      },
    },
  };
</script>

<style scoped lang='scss'>

</style>