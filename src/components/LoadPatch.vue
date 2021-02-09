<template>
  <div class="control-container pure-u-1-1 pure-u-sm-1-2">
    <div class="shadow pure-form">
      <label>
        <h3>Load Patch from Synth EEPROM</h3>
      </label>
      <select :disabled="!connected" v-model.number="inputValue">
        <option v-for="i in 11" :value="i">Patch {{ i }}</option>
      </select>
      <button
        :disabled="!connected"
        @click='loadPatch'
        class='pure-button'
      >
        <i class="fa fa-upload" aria-hidden="true"></i> Load patch
      </button>
    </div>
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

<style scoped lang="scss">
  .load-patch-container {
    display: inline-block;
    text-align: center;
    width: 25%;
    box-sizing: border-box;
    padding: 2em;
    vertical-align: top;
  }
</style>
