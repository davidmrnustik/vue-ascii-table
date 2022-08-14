<template>
  <v-app-bar dense fixed>
    <v-toolbar-title class="mr-10">{{ title }}</v-toolbar-title>
    <v-row>
      <v-col align-self="center">
        <v-text-field
          v-model="search"
          prepend-icon="mdi-magnify"
          dense
          hide-details
          single-line
          @keyup="$emit('onChangeSearch', search)"
        ></v-text-field>
      </v-col>
      <v-col align-self="center">
        <v-switch
          dense
          hide-details
          @change="$emit('onChangeTableExtended')"
          label="HTML Entities"
        ></v-switch>
      </v-col>
      <v-col align-self="center">
        <v-slider
          dense
          hide-details
          v-model="tableFormat"
          :thumb-size="24"
          min="1"
          max="6"
          @change="$emit('onChangeTableFormat', tableFormat)"
          :label="columns"
        ></v-slider>
      </v-col>
      <v-col align-self="center">
        <v-row>
          <v-col align-self="center">
            <v-switch
              dense
              hide-details
              label="Dense table"
              :value="tableDense"
              @change="$emit('onChangeTableDense')"
            ></v-switch>
          </v-col>
          <v-col align-self="center">
            <v-switch
              dense
              hide-details
              label="Small table"
              @change="$emit('onChangeSmallTable')"
            ></v-switch>
          </v-col>
        </v-row>
      </v-col>
      <v-col align-self="center" align="right" class="no-grow no-max-width no-wrap">
        <v-btn small @click="$emit('onClickDecreaseFontSize')">
          A-
        </v-btn>
        <v-btn small @click="$emit('onClickIncreaseFontSize')">
          A+
        </v-btn>
      </v-col>
      <v-col align-self="center" class="no-grow no-max-width no-wrap">
        <v-switch
          dense
          hide-details
          v-model="$vuetify.theme.dark"
          label="Theme Dark"
        ></v-switch>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppHeader",
  props: {
    tableDense: Boolean,
    title: String
  },
  data() {
    return {
      search: "",
      tableFormat: 4,
    }
  },
  computed: {
    columns() {
      return `Columns: ${this.tableFormat}`
    }
  }
};
</script>

<style scoped>
  h1 {
    font-weight: normal;
    font-size: 20px;
  }
  .no-grow {
    flex-grow: 0;
  }
  .no-max-width {
    width: auto;
  }
  .no-wrap {
    white-space: nowrap;
  }
</style>