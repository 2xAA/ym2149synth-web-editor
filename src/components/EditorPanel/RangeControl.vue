<template>
  <div class='pure-u-1-1 pure-u-sm-1-2 pure-u-md-1-3 control-container'>
    <div class='shadow'>
        <h3>{{ title }}</h3>
      <circle-slider
        v-model.number='inputValue'
        :min='0'
        :max='127'
        :step-size='1'
      ></circle-slider>
      <input
        :disabled='!connected'
        type='number'
        min='0'
        max='127'
        step='1'
        v-model.number='inputValue'
      >
      <p v-if='label'>{{ label }}</p>
    </div>
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
</style>
