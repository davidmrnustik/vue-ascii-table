<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeoutSnackBar"
  >
    {{ snackbarText }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="blue"
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "SnackBar",
  props: {
    copyText: String
  },
  data() {
    return {
      snackbar: false,
      timeoutSnackBar: 1000,
      snackbarText: "Value has been copied to clipboard.",
    }
  },
  watch: {
    copyText(value) {
      navigator.clipboard.writeText(value).then(() => this.snackbar = true);
    }
  }
};
</script>