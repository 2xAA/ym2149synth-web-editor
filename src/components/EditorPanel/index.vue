<template>
  <div>
    <channel-selector @channelChange='updateChannel'></channel-selector>
    <h3>Synth Type</h3>
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
    <range-control
      v-for='range in ranges'
      :title='range.title'
      :label='range.label'
      :value='range.value'
      :cc='range.cc'
      :channel='channel'
    ></range-control>
    <a href='#' id='save' download='voice.json' @click='exportJson' ref='downloadLink'>Save voice data to file</a>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import ChannelSelector from './ChannelSelector';
  import RangeControl from './RangeControl';

  export default {
    name: 'editor-panel',
    data() {
      return {
        channel: 1,
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
      }),
    },
    methods: {
      ...mapActions('values', [
        'writeValue',
      ]),
      updateChannel(e) {
        this.$data.channel = e.channel;
      },
      exportJson() {
        // e.preventDefault();
        console.log(this);
        this.$refs.downloadLink.href = `data:text/json,${JSON.stringify(this.getVoice(this.channel))}`;
        // this.$refs.downloadLink.click();
        // return false;
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
      ChannelSelector,
      RangeControl,
    },
  };
</script>

<style scoped lang='scss'>

</style>