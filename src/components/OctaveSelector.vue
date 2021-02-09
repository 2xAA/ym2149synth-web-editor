<template>
  <div class="control-container pure-u-1-1 pure-u-sm-1-2">
    <div class="shadow pure-form">
      <h3>Keyboard Octave</h3>
      <input v-model="keyboardOctave" readonly="true" size=1>
      <button @click="decrementOctave" class="pure-button"><i class="fa fa-minus" aria-hidden="true"></i></button>
      <button @click="incrementOctave" class="pure-button"><i class="fa fa-plus" aria-hidden="true"></i></button>
    </div>
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
