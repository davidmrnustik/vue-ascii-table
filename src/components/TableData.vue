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
    dense
    :custom-filter="filterOnlyChar"
    class="ascii-table mt-10"
  >
    <template v-slot:header="{ props: { headers } }">
      <TableHeader
        :headers="headers"
        :tableHeaders="tableHeaders"
        :tableFormat="tableFormat"
      ></TableHeader>
    </template>

    <template v-slot:body="{ items }">
      <TableBody
        :items="items"
        :tableHeaders="tableHeaders"
        :tableFormat="tableFormat"
        :extended="extended"
        @copyValue="copyValue"
      ></TableBody>
    </template>
  </v-data-table>
</template>

<script>
import TableHeader from "@/components/TableHeader";
import TableBody from "@/components/TableBody";
import { mapState } from "pinia";
import { useAsciiTableStore } from "@/stores/AsciiTableStore";

export default {
  name: "AsciiTable",
  components: {
    TableHeader,
    TableBody
  },
  props: {
    tableItems: Array,
    tableHeaders: Array,
    tableFormat: Number,
    extended: Boolean
  },
  methods: {
    copyValue(value) {
      this.$emit('copyValue', value);
    },
    filterOnlyChar(value, search, item) {
      const charKeys = Object.keys(item).filter(i => i.startsWith("char"));

      return charKeys.some(i => item[i] === value && value === search)
    }
  },
  computed: {
    ...mapState(useAsciiTableStore, ['search']),
  }
};
</script>