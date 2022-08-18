<template>
  <v-switch
    dense
    :hide-details="hideDetails"
    v-model="$vuetify.theme.dark"
    label="Dark"
  ></v-switch>
</template>

<script>
export default {
  name: "ChangeTheme",
  props: {
    hideDetails: Boolean
  }
};
</script>

<style scoped>

</style>