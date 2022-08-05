<template>
  <thead>
  <tr>
    <template v-for="(h, index) in headers">
      <th :key="h.text + index" class="line" v-if="getDivisionItem.includes(index)">{{h.text}}</th>
      <th :key="h.text + index" v-else>{{h.text}}</th>
    </template>
  </tr>
  </thead>
</template>

<script>
import { getDivisionItem } from "@/utils"

export default {
  name: "TableHeader",
  props: {
    headers: Array,
    tableHeaders: Array,
    tableFormat: Number
  },
  computed: {
    getDivisionItem() {
      return getDivisionItem(this.tableHeaders, this.tableFormat)
    },
  }
};
</script>

<style scoped>
  .v-data-table.ascii-table th {
    font-size: var(--font-size);
  }
</style>