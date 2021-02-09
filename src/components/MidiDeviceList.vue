<template>
  <div :class='{ hidden: connected }' class='control-container pure-u-1-1'>
    <div class='pure-form shadow'>
      <p>
        Your YM2149Synth should automatically be detected.<br>
        If it is not detected, you can use these controls to explicitly select a MIDI device
      </p>
      <select :disabled='connected' v-model='deviceId'>
        <option v-for='option in inputOptions' :selected='option.selected' :key='option.id'>{{ option.input.name }}</option>
      </select>
      <button
        class='pure-button'
        @click='explicitlyUseDevice'
      >
        Use this device
      </button>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'midi-device-list',
    data() {
      return {
        deviceId: '',
      };
    },
    methods: {
      ...mapActions('status', [
        'registerDeviceId',
      ]),
      explicitlyUseDevice() {
        this.registerDeviceId({ id: this.deviceId });
      },
    },
    computed: {
      ...mapGetters('status', [
        'connected',
        'id',
        'inputs',
      ]),
      inputOptions() {
        if(!this.inputs) return;

        return this.inputs.map((input) => { //eslint-disable-line
          return { input, selected: input.id === this.id };
        });
      },
    },
  };
</script>

<style scoped lang='scss'>
  label {
    display: block;
  }
</style>
