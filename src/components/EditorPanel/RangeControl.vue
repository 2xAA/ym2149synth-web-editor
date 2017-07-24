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
    ],
    computed: {
      ...mapGetters('status', [
        'connected',
      ]),
      ...mapGetters('values', {
        channel: 'channel',
        getValue: 'value',
      }),
      inputValue: {
        get() {
          return this.$store.state.values.values[this.channel - 1][this.cc - 1];
          // return this.getValue(this.channel - 1, this.cc - 1);
        },
        set(value) {
          this.writeValue({
            id: this.cc,
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
    beforeMount() {
      this.inputValue = this.value;
    },
  };
</script>

<style scoped lang='scss'>
  label {
    display: block;
  }
</style>