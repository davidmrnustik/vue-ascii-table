<template>
  <v-app>
    <input v-model="tableFormat" @change="onChange" type="number" min="1" max="4" placeholder="Type a table format">
    <p>Format is: <strong>{{tableFormat}}</strong></p>

    <v-data-table
        v-if="tableData"
        :headers="getHeaders"
        :items="getTableData"
        :items-per-page="127"
        item-key="name"
        class="elevation-1"
        :search="search"
    >
      <template v-slot:top>
        <v-text-field
            v-model="search"
            label="Search"
            class="mx-4"
        ></v-text-field>
    </template>

    </v-data-table>
  </v-app>
</template>

<script>
import module from './assets/js/a.out.js';

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
      tableFormat: 4,
      title: "Ascii table",
      tableData: [],
      search: ""
    }
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
    onChange(e) {
      this.getTable(e.target.value);
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
              [`${(parsed[0][index]).toLowerCase()}${index}`]: cur
            }
          }, {})
          cellData.push(res)
        }
      })

      return [headerData, cellData]
    },
    getTable(value) {
      instance.ready.then(() => this.tableData = this.prepareData(instance.getTable(value)));
    },
    filterOnlyDec(value, search) {
      console.log("value", value)
      console.log("search", search)
      return value != null &&
          search != null &&
          value.indexOf(search) !== -1
    }
  },
  mounted() {
    this.getTable(this.tableFormat);
  }
};
</script>
