<template>
  <div :class="{ hidden: connected }" class="control-container pure-u-1-1">
    <div class="pure-form shadow">
      <p>
        Your YM2149Synth should automatically be detected.<br />
        If it is not detected, you can use these controls to explicitly select a
        MIDI device
      </p>
      <select :disabled="connected" v-model="deviceId">
        <option
          v-for="option in outputOptions"
          :selected="option.selected"
          :key="option.input.id"
          :value="option.input.id"
        >
          {{ option.input.name }}
        </option>
      </select>
      <button class="pure-button" @click="explicitlyUseDevice">
        Use this device
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "midi-device-list",
  data() {
    return {
      deviceId: "",
    };
  },
  methods: {
    ...mapActions("status", ["registerDeviceId"]),
    explicitlyUseDevice() {
      this.registerDeviceId({ id: this.deviceId });
    },
  },
  computed: {
    ...mapGetters("status", ["connected", "id", "outputs"]),
    outputOptions() {
      if (!this.outputs) return [];

      return this.outputs.map((input) => {
        //eslint-disable-line
        return { input, selected: input.id === this.id };
      });
    },
  },
};
</script>

<style scoped>
label {
  display: block;
}
</style>
