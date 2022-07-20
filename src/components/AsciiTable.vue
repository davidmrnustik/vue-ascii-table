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
      </v-row>
    </template>

    <template v-slot:header="{ props: { headers } }">
      <thead>
      <tr>
        <template v-for="(h, index) in headers">
          <th v-bind:key="h.text + index" class="line" v-if="getMarkedItem.includes(index)">{{h.text}}</th>
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
          <template v-if="getMarkedItem.includes(index)">
            <td @click="$emit('copyValue', value)" v-bind:key="key" class="value line" v-html="getHighlightedValue(value)"></td>
          </template>
          <template v-else>
            <td @click="$emit('copyValue', value)" v-bind:key="key" class="value">{{ value }}</td>
          </template>
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
      tableFormat: 4
    }
  },
  computed: {
    getMarkedItem() {
      return Array.from({ length: this.tableFormat + 1 }, (v, i) => i * 5 - 1).slice(1)
    },
  },
  methods: {
    getHighlightedValue(value) {
      const regexp = /([A-Z0-9]+)\s+(\(.*\))/;

      if (regexp.test(value)) {
        const [,code, description] = regexp.exec(value);
        return `<mark>${code}</mark>&nbsp;${description}`;
      }
      return `<mark>${value}</mark>`;
    }
  }
};
</script>

<style scoped>

</style>