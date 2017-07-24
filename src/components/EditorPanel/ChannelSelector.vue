<template>
  <div>
    <h3>Select voice</h3>
    <select :disabled='!connected' v-model='inputValue'>
      <option value='1'>A</option>
      <option value='2'>B</option>
      <option value='3'>C</option>
    </select>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'channel-selector',
    data() {
      return {
        inputValue: 1,
      };
    },
    computed: {
      ...mapGetters('status', [
        'connected',
      ]),
    },
    watch: {
      inputValue() {
        this.$emit('channelChange', {
          channel: this.inputValue,
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