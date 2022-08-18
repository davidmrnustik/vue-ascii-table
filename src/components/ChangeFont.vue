<template>
  <v-col align-self="center" :class="cssRules">
    <v-btn small @click="$emit('onClickDecreaseFontSize')">
      A-
    </v-btn>
    <v-btn small @click="$emit('onClickIncreaseFontSize')">
      A+
    </v-btn>
  </v-col>
</template>

<script>
export default {
  name: "ChangeFont",
  props: {
    cssRules: String
  }
};
</script>

<style scoped>

</style>