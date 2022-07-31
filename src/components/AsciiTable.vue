<template>
  <v-data-table
    v-if="tableItems"
    :headers="tableHeaders"
    :items="tableItems"
    :items-per-page="128"
    item-key="name"
    :search="search"
    hide-default-footer
    hide-default-header
    :dense="tableDense"
  >
    <template v-slot:top>
      <p class="text-h4">ASCII table</p>
      <v-row>
      </v-row>
      <v-row style="height: 150px;">
        <v-col>
          <v-text-field
            v-model="search"
            label="Search"
            class="mx-4"
          ></v-text-field>
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
            v-model="tableDense"
            label="Dense table"
          ></v-switch>
        </v-col>
        <v-col>
          <v-switch
            v-model="$vuetify.theme.dark"
            label="Theme Dark"
          ></v-switch>
        </v-col>
        <v-col>
          <v-switch
            v-model="extended"
            @change="$emit('onChangeTableExtended', extended)"
            label="HTML Entities"
          ></v-switch>
        </v-col>
      </v-row>
    </template>

    <template v-slot:header="{ props: { headers } }">
      <thead>
      <tr>
        <template v-for="(h, index) in headers">
          <th v-bind:key="h.text + index" class="line" v-if="getDivisionItem.includes(index)">{{h.text}}</th>
          <th v-bind:key="h.text + index" v-else>{{h.text}}</th>
        </template>
      </tr>
      </thead>
    </template>

    <template v-slot:body="{ items }">
      <tbody>
      <tr
        v-for="item in items"
        :key="item.name"
      >
        <template v-for="(value, key, index) in item">
          <td @click="$emit('copyValue', value)" v-bind:key="key" v-if="isNoHtmlField(index)" :class="`value${getDivisionItem.includes(index) ? ' line' : ''}`">
            {{ getHighlightedValue(value, index) }}</td>
          <td @click="$emit('copyValue', value)" v-bind:key="key" v-else :class="`value${getDivisionItem.includes(index) ? ' line' : ''}`" v-html="getHighlightedValue(value, index)"></td>
        </template>
      </tr>
      </tbody>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "AsciiTable",
  props: {
    tableItems: Array,
    tableHeaders: Array
  },
  data() {
    return {
      search: "",
      tableDense: false,
      tableFormat: 4,
      extended: false
    }
  },
  computed: {
    getDivisionItem() {
      return Array.from({ length: this.tableFormat + 1 }, (v, i) => i * this.getNumberOfColumns - 1).slice(1)
    },
    getStyleMap() {
      const styles = this.extended ?
        [
          "%value%",
          "%value%",
          "%value%",
          "%value%",
          "NO_HTML",
          "NO_HTML",
          "<mark>%value%</mark>",
          "<em>%value%</em>"
        ] :
        [
          "%value%",
          "%value%",
          "%value%",
          "%value%",
          "<mark>%value%</mark>",
          "<em>%value%</em>"
        ];

      return Array.from({ length: this.tableFormat * this.getNumberOfColumns - 1 }, () => [...styles]).flat();
    },
    getNumberOfColumns() {
      return this.tableHeaders && this.tableHeaders.length / this.tableFormat;
    }
  },
  methods: {
    isNoHtmlField(index) {
      const style = this.getStyleMap[index.toString()];

      return style === "NO_HTML";
    },
    getHighlightedValue(value, index) {
      const style = this.getStyleMap[index.toString()];

      return style.replace(/(NO_HTML|%value%)/gi, value);
    }
  }
};
</script>

<style scoped>

</style>