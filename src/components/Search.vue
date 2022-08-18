<template>
  <v-text-field
    v-model="search"
    prepend-icon="mdi-magnify"
    dense
    hide-details
    single-line
    placeholder="Search Character"
    @keyup="$emit('onChangeSearch', search)"
  >
    <template v-slot:append>
      <v-icon @click="onIconCloseClick" v-show="search.length">mdi-close</v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: "AppSearch",
  data() {
    return {
      search: ""
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