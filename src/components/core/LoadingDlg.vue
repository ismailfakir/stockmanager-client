<template>
<div class="text-center">
  <v-overlay :value="dialog">
  <v-progress-circular :size="70" :width="7" indeterminate color="secondary">
  </v-progress-circular>
  </v-overlay>
</div>
</template>
<script>
export default {
  name: 'LoadingDlg',
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    show() {
      this.dialog = true;
    },
    hide() {
      this.dialog = false;
    }
  }
};
</script>
