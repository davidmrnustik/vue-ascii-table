<template>
  <v-app :style="{ fontSize: fontSize + 'px' }">
    <Header :title="title"></Header>

    <v-container :fluid="!smallTable">
      <TableData
        :table-items="getTableData"
        :table-headers="getHeaders"
        :extended="extendedTable"
        :table-format="tableColumns"
        @copyValue="copyValue"
      ></TableData>
    </v-container>

    <SnackBar :copy-text="copyText"></SnackBar>
  </v-app>
</template>

<script>
import { mapState, mapWritableState } from 'pinia'
import TableData from "@/components/TableData";
import Header from "@/components/Header";
import SnackBar from "@/components/SnackBar";
import { useAsciiTableStore } from "@/stores/AsciiTableStore";

export default {
  name: 'App',

  data() {
    return {
      title: "ASCII table",
      copyText: ""
    }
  },
  components: {
    TableData,
    Header,
    SnackBar
  },
  computed: {
    ...mapState(useAsciiTableStore, [
      'tableColumns',
      'getTableData',
      'getHeaders',
      'extendedTable',
      'smallTable',
      'fontSize',
      'descriptionSize'
    ]),
    ...mapWritableState(useAsciiTableStore, ['getTable', 'setTableColumns'])
  },
  methods: {
    copyValue(value) {
      this.copyText = value
    }
  },
  mounted() {
    this.getTable(this.tableColumns)
  }
}
</script>

<style >
  td mark {
    color: red;
    font-weight: bold;
    background-color: transparent;
  }
  .theme--dark td mark {
    color: yellow;
  }
  td.value {
    border-bottom: none !important;
  }
  td.value:hover {
    background-color: rgba(0, 0, 0, 0.07);
  }
  .theme--dark td.value:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
  th.line, td.value.line {
    border-right: thin solid rgba(0, 0, 0, 0.12) !important;
  }
  .theme--dark th.line, .theme--dark td.value.line {
    border-right: thin solid rgba(255, 255, 255, 0.12) !important;
  }
  thead th.line:last-child, tbody td.value.line:last-child {
    border-right: none !important;
  }
  .v-data-table.ascii-table th,
  .v-data-table.ascii-table td {
    font-size: v-bind(fontSize) !important;
  }
  .v-data-table.ascii-table td span.description {
    font-size: v-bind(descriptionSize);
  }
  .v-data-table--mobile > .v-data-table__wrapper tbody {
    display: table-row-group !important;
  }
  @media screen and (max-width: 650px) {
    .v-input__control label,
    .v-input__control input {
      font-size: 14px !important;
    }
    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > tbody > tr > th, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > th, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
      padding: 0 6px;
    }
    .v-data-table.ascii-table td span.description {
      font-size: 12px;
    }
  }
  @media screen and (max-width: 360px) {
    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > tbody > tr > th, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > th, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
      padding: 0 3px;
    }
  }
</style>