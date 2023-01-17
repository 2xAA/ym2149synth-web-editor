<template>
  <div class="control-container pure-u-1-1 pure-u-sm-1-2">
    <div class="shadow pure-form">
      <h3>Select channel/voice</h3>
      <select :disabled="!connected" v-model="inputValue">
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "channel-selector",
  data() {
    return {
      inputValue: 1,
    };
  },
  computed: {
    ...mapGetters("status", ["connected"]),
  },
  methods: {
    ...mapMutations("values", ["setChannel"]),
  },
  watch: {
    inputValue() {
      this.setChannel({ channel: this.inputValue });
    },
  },
};
</script>

<style scoped>
label {
  display: block;
}
</style>
