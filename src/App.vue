<template>
  <v-app :style="{ fontSize: fontSize + 'px' }">
    <v-container :fluid="true">
      <p class="text-h4">ASCII table</p>

      <Header
        @onChangeTableFormat="onChangeTableFormat"
        @onChangeTableExtended="onChangeTableExtended"
        @onChangeSearch="onChangeSearch"
        @onChangeTableDense="onChangeTableDense"
        @onClickDecreaseFontSize="decreaseFontSize"
        @onClickIncreaseFontSize="increaseFontSize"
      ></Header>

      <TableData
        :table-items="getTableData"
        :table-headers="getHeaders"
        :extended="extended"
        :table-format="tableFormat"
        :search="search"
        :table-dense="tableDense"
        @copyValue="copyValue"
      ></TableData>
    </v-container>

    <SnackBar :copy-text="copyText"></SnackBar>
  </v-app>
</template>

<script>
import module from './assets/js/a.out.js';
import TableData from "@/components/TableData";
import Header from "@/components/Header";
import SnackBar from "@/components/SnackBar";

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
      search: "",
      tableFormat: 4,
      title: "Ascii table",
      tableData: [],
      extended: false,
      fontSize: 14,
      tableDense: false,
      copyText: ""
    }
  },
  components: {
    TableData,
    Header,
    SnackBar
  },
  computed: {
    getHeaders() {
      return this.tableData[0];
    },
    getTableData() {
      return this.tableData[1]
    }
  },
  methods: {
    onChangeTableFormat(e) {
      this.tableFormat = e;
      this.getTable(e, this.extended);
    },
    onChangeTableExtended() {
      this.extended = !this.extended;
      this.getTable(this.tableFormat, this.extended);
    },
    onChangeSearch(e) {
      this.search = e;
    },
    onChangeTableDense() {
      this.tableDense = !this.tableDense;
    },
    prepareData(data) {
      // [["Dec", "Oct", "Bin"], [0, "x80", "00000000"]]
      // [{ text: "Dec", value: "dec1" }, { text: "Oct", value: "oct1" }, { text: "Bin", value: "bin1" }]
      // [{ dec1: 0 }, { oct1: "x80" }, { bin1: "00000000" }]
      /*
      [
        [{ text: "Dec", value: "dec1" }, { text: "Oct", value: "oct1" }, { text: "Bin", value: "bin1" }],
        [{ dec1: 0, oct1: "x80", bin1: "00000000" }, { dec1: 1, oct1: "x81", bin1: "00000001" }, ]
      ]
       */
      const parsed = JSON.parse(data);
      console.log("parsed:", parsed);
      let headerData = []
      const cellData = []

      parsed.forEach((row, rIdx) => {
        if (rIdx === 0) {
          headerData = row.map((col, cIdx) => {
            return {
              text: col,
              sortable: false,
              value: `${col.toLowerCase()}${cIdx}`
            }
          })
        } else {
          const res = row.reduce((acc, cur, index) => {
            return {
              ...acc,
              [`${(parsed[0][index]).toLowerCase().replace(/\s/, "")}${index}`]: cur
            }
          }, {})
          cellData.push(res)
        }
      })

      console.log("cellData", cellData);

      return [headerData, cellData]
    },
    getTable(value, ext) {
      instance.ready.then(() => this.tableData = this.prepareData(instance.getTable(value, ext)));
    },
    copyValue(value) {
      this.copyText = value;
    },
    increaseFontSize() {
      this.fontSize += 2;
    },
    decreaseFontSize() {
      this.fontSize <= 6 ? this.fontSize = 6 : this.fontSize -= 2;
    },
  },
  mounted() {
    this.getTable(this.tableFormat);
  }
};
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
  .theme--dark .v-slider__thumb-label.white {
    /*color: black !important;*/
  }
</style>