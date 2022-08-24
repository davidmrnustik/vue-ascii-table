<template>
  <v-switch
    dense
    :value="extended"
    hide-details
    @change="$emit('onClickTableExtended')"
    :label="label"
  ></v-switch>
</template>

<script>
export default {
  name: "HtmlEntities",
  props: {
    extended: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: "HTML Entities"
    }
  }
};
</script>