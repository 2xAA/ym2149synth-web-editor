<template>
  <div class='control-container pure-u-1-1 pure-u-sm-1-2'>
    <div class='shadow pure-form'>
      <label>
        <h3>Save Patch to Synth EEPROM</h3>
      </label>
      <select :disabled='!connected' v-model.number='inputValue'>
        <option v-for='i in 11' :value='i'>Patch {{ i }}</option>
      </select>
      <button
        :disabled='!connected'
        @click='savePatch'
        class='pure-button'
      >
        <i class="fa fa-download" aria-hidden="true"></i> Save patch
      </button>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'save-patch',
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
        'savePatchToDevice',
      ]),
      savePatch() {
        this.savePatchToDevice({
          id: this.inputValue,
        });
      },
    },
  };
</script>

<style scoped lang='scss'>
</style>