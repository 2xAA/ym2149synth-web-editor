<template>
  <button
    href="#"
    @click="clickLoadButton"
    class="pure-button"
    :class="{ 'pure-button-disabled': !connected }"
  >
    <input type="file" accept=".json" name="fileInput" ref="fileInput" class="hidden" />
    <i class="fa fa-folder-open" aria-hidden="true"></i> Load voice data from file
  </button>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'load-from-file',
    data() {
      return {
        fileInput: null,
      };
    },
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
      ...mapActions('values', [
        'writeValue',
      ]),
      clickLoadButton() {
        this.$refs.fileInput.click();
      },
      loadFile(e) {
        const files = e.target.files;

        for(let i = 0; i < files.length; i += 1) {
          const file = files.item(i);
          if(!file.type.match('json.*')) {
            return;
          }

          const reader = new FileReader();

          reader.onloadend = (ev) => {
            if(ev.target.readyState === FileReader.DONE) {
              const capture = JSON.parse(ev.target.result);
              capture.forEach((data, idx) => this.writeValue({
                id: idx + 1,
                value: data,
              }));
            }
          };

          const fakeBlob = file.slice(0, file.size);
          reader.readAsBinaryString(fakeBlob);
        }
      },
    },
    mounted() {
      this.$refs.fileInput.addEventListener('change', this.loadFile.bind(this));
    },
    destroyed() {
      this.$refs.fileInput.removeEventListener('change', this.loadFile.bind(this));
    },
  };
</script>
