<template>
  <v-app :style="{ fontSize: fontSize + 'px' }">
    <Header
      :title="title"
      @onChangeTableFormat="onChangeTableFormat"
      @onChangeTableExtended="onChangeTableExtended"
    ></Header>

    <v-container :fluid="!smallTable">
      <TableData
        :table-items="getTableData"
        :table-headers="getHeaders"
        :extended="extended"
        :table-format="tableColumns"
        @copyValue="copyValue"
      ></TableData>
    </v-container>

    <SnackBar :copy-text="copyText"></SnackBar>
  </v-app>
</template>

<script>
import { mapState, mapWritableState } from 'pinia'
import module from './assets/js/a.out.js';
import TableData from "@/components/TableData";
import Header from "@/components/Header";
import SnackBar from "@/components/SnackBar";
import { useAsciiTableStore } from "@/stores/AsciiTableStore";

let instance = {
  ready: new Promise(resolve => {
    module({
      onRuntimeInitialized() {
        instance = Object.assign(this, {
          ready: Promise.resolve()
        });
        resolve();
      }
    });
  })
};

export default {
  name: 'App',

  data() {
    return {
      title: "ASCII table",
      extended: false,
      copyText: ""
    }
  },
  components: {
    TableData,
    Header,
    SnackBar
  },
  computed: {
    ...mapState(useAsciiTableStore, ['tableColumns', 'getTableData', 'getHeaders', 'smallTable', 'fontSize', 'descriptionSize']),
    ...mapWritableState(useAsciiTableStore, ['setTableData', 'setTableColumns', 'setExtendedTable'])
  },
  methods: {
    onChangeTableFormat(e) {
      this.setTableColumns(e)
      this.getTable(e, this.extended)
    },
    onChangeTableExtended() {
      this.extended = !this.extended
      this.getTable(this.tableColumns, this.extended)
    },
    getTable(value, ext) {
      instance.ready.then(() => this.setTableData(instance.getTable(value, ext)))
    },
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