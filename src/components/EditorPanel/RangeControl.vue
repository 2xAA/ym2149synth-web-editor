<template>
  <div>
    <label>
      <h3>{{ title }}</h3>
      <span v-if='label'>{{ label }}</span>
    </label>
    <input
      :disabled='!connected'
      type='range'
      min='0'
      max='127'
      step='1'
      v-model.number='inputValue'
    >
    <input
      :disabled='!connected'
      type='number'
      min='0'
      max='127'
      step='1'
      v-model.number='inputValue'
    >
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'range-control',
    props: [
      'label',
      'title',
      'value',
      'cc',
      'channel',
    ],
    data() {
      return {
        inputValue: 0,
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
    beforeMount() {
      this.$data.inputValue = this.value;
    },
    watch: {
      inputValue() {
        console.log(this.inputValue);
        this.writeValue({
          channel: this.channel,
          id: this.cc,
          value: this.inputValue,
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