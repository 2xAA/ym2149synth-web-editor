<template>
  <div class='control-container pure-u-1-1'>
    <div class='shadow pure-form'>
      <h3>Synth Type</h3>
      <select :disabled='!connected' v-model.number='voice'>
        <option v-for='(option, idx) in options' :value='idx'>{{ option }}</option>
      </select>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'synth-type-selector',
    data() {
      return {
        options: [
          'Square-voice',
          'Square-voice + Env-voice Saw (Square pitch modulations are soloed for "acid" effects)',
          'Square-voice + Env-voice Triangle (Square pitch modulations are soloed for "acid" effects)',
          'Env-voice Triangle',
          'Env-voice Saw',
          'Square-voice + Softwave-voice (PWM)',
          'Square-voice + Softwave-voice (Square pitch modulations are soloed for "acid" effects)',
          'Noise',
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
      voice: {
        get() {
          return this.$store.state.values.values[this.channel - 1][2];
        },
        set(value) {
          this.writeValue({
            id: 3,
            value,
          });
        },
      },
    },
    methods: {
      ...mapActions('values', [
        'writeValue',
      ]),
    },
  };
</script>

<style scoped lang='scss'>

</style>