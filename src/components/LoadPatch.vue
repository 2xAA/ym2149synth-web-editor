<template>
  <div>
    <label>
      <h3>Load Patch from Synth EEPROM</h3>
    </label>
    <select :disabled='!connected' v-model.number='inputValue'>
      <option v-for='i in 11' :value='i'>Patch {{ i }}</option>
    </select>
    <button :disabled='!connected' @click='loadPatch'>Load patch</button>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'load-patch',
    data() {
      return {
        inputValue: 1,
      };
    },
    computed: {
      ...mapGetters('status', [
        'connected',
      ]),
      ...mapGetters('values', [
        'channel',
      ]),
    },
    methods: {
      ...mapActions('values', [
        'loadPatchFromDevice',
      ]),
      loadPatch() {
        this.loadPatchFromDevice({
          channel: this.channel,
          id: this.inputValue,
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