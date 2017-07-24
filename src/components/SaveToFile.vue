<template>
  <a
    :disabled='!connected'
    href='#'
    download='voice.json'
    @click='exportJson'
    ref='downloadLink'
  >Save voice data to file</a>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'save-to-file',
    computed: {
      ...mapGetters('status', [
        'connected',
      ]),
      ...mapGetters('values', {
        getVoice: 'voice',
        channel: 'channel',
      }),
    },
    methods: {
      exportJson() {
        this.$refs.downloadLink.href = `data:text/json,${JSON.stringify(this.getVoice(this.channel))}`;
      },
    },
  };
</script>

<style scoped lang='scss'>

</style>