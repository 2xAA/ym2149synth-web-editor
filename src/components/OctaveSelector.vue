<template>
  <div>
    <h3>Keyboard Octave</h3>
    <input v-model='keyboardOctave' readonly='true'>
    <button @click='decrementOctave'>-</button>
    <button @click='incrementOctave'>+</button>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'octave-selector',
    computed: {
      ...mapGetters('values', [
        'keyboardOctave',
      ]),
    },
    methods: {
      ...mapActions('values', [
        'incrementOctave',
        'decrementOctave',
      ]),
    },
  };
</script>

<style scoped lang='scss'>

</style>