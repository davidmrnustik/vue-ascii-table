<template>
  <v-row style="height: 150px;">
    <v-btn small @click="$emit('onClickDecreaseFontSize')">
      A-
    </v-btn>
    <v-btn small @click="$emit('onClickIncreaseFontSize')">
      A+
    </v-btn>
    <v-col>
      <v-switch
        label="Small table"
        @change="$emit('onChangeSmallTable')"
      ></v-switch>
    </v-col>
    <v-col>
      <v-text-field
        v-model="search"
        label="Search"
        class="mx-4"
        @keyup="$emit('onChangeSearch', search)"
      ></v-text-field>
    </v-col>
    <v-col>
      <v-switch
        @change="$emit('onChangeTableExtended')"
        label="HTML Entities"
      ></v-switch>
    </v-col>
    <v-col>
      <v-slider
        v-model="tableFormat"
        :thumb-size="24"
        min="1"
        max="6"
        thumb-label="always"
        @change="$emit('onChangeTableFormat', tableFormat)"
        label="Columns"
      ></v-slider>
    </v-col>
    <v-col>
      <v-switch
        :value="tableDense"
        label="Dense table"
        @change="$emit('onChangeTableDense')"
      ></v-switch>
    </v-col>
    <v-col>
      <v-switch
        v-model="$vuetify.theme.dark"
        label="Theme Dark"
      ></v-switch>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "AppHeader",
  props: {
    tableDense: Boolean
  },
  data() {
    return {
      search: "",
      tableFormat: 4,
    }
  }
};
</script>