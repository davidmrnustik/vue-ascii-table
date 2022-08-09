<template>
  <tbody>
  <tr
    v-for="item in items"
    :key="item.name"
  >
    <template v-for="(value, key, index) in item">
      <td @click="$emit('copyValue', value)" :key="key" v-if="isNoHtmlField(index)" :class="`value${getDivisionItem.includes(index) ? ' line' : ''}`">
        {{ getHighlightedValue(value, index) }}</td>
      <td @click="$emit('copyValue', value)" :key="key" v-else :class="`value${getDivisionItem.includes(index) ? ' line' : ''}`" v-html="getHighlightedValue(value, index)"></td>
    </template>
  </tr>
  </tbody>
</template>

<script>
import { getDivisionItem, getNumberOfColumns } from "@/utils"
export default {
  name: "TableBody",
  props: {
    items: Array,
    tableHeaders: Array,
    tableFormat: Number,
    extended: Boolean
  },
  computed: {
    getDivisionItem() {
      return getDivisionItem(this.tableHeaders, this.tableFormat)
    },
    getNumberOfColumns() {
      return getNumberOfColumns(this.tableHeaders, this.tableFormat)
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
          "<span class='description'><em>%value%</em></span>"
        ];

      return Array.from({ length: this.tableFormat * this.getNumberOfColumns - 1 }, () => [...styles]).flat();
    },
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