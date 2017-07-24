<template>
  <div>
    <h1>YM2149Synth Patch Editor</h1>
    <h2>Connected: {{ connected }} <span v-if='name'>({{ name }})</span></h2>
    <editor-panel></editor-panel>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import WebMidi from 'webmidi';

  import EditorPanel from './EditorPanel';

  export default {
    name: 'home',
    computed: {
      ...mapGetters('status', [
        'connected',
        'id',
      ]),
      name() {
        let name;
        WebMidi.outputs.forEach((output) => {
          if(output.id === this.id) name = output.name;
        });
        return name;
      },
    },
    components: {
      EditorPanel,
    },
  };
</script>

<style scoped lang='scss'>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>