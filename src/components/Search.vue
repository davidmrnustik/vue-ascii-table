<template>
  <v-text-field
    v-model="search"
    :prepend-icon="iconSearch"
    dense
    hide-details
    single-line
    placeholder="Search Character"
    @keyup="$emit('onChangeSearch', search)"
  >
    <template v-slot:append>
      <v-icon @click="onIconCloseClick" v-show="search.length">{{ iconClose }}</v-icon>
    </template>
  </v-text-field>
</template>

<script>
import { mdiMagnify, mdiClose } from "@mdi/js"

export default {
  name: "AppSearch",
  data() {
    return {
      search: "",
      iconSearch: mdiMagnify,
      iconClose: mdiClose
    }
  },
  methods: {
    onIconCloseClick() {
      this.search = ""
      this.$emit('onChangeSearch', this.search)
    },
  }
};
</script>

<style scoped>

</style>