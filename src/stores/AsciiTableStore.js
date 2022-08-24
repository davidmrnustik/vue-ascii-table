import { defineStore } from 'pinia/dist/pinia'
import module from "@/assets/js/a.out";

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

export const useAsciiTableStore = defineStore('AsciiTableStore', {
  state: () => {
    return {
      tableData: [],
      extendedTable: false,
      tableColumns: 4,
      fontSize: "14px",
      smallTable: false,
      descriptionSize: "14px",
      search: ""
    }
  },
  actions: {
    getTable(value, ext) {
      instance.ready.then(() => this.setTableData(instance.getTable(value, ext)))
    },
    prepareData(data) {
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
              [`${(parsed[0][index]).toLowerCase().replace(/\s/, "")}${index}`]: cur
            }
          }, {})
          cellData.push(res)
        }
      })

      return [headerData, cellData]
    },
    setTableData(data) {
      this.tableData = this.prepareData(data)
    },
    setSearch(value) {
      this.search = value
    },
    setExtendedTable() {
      this.extendedTable = !this.extendedTable
      this.getTable(this.tableColumns, this.extendedTable)
    },
    setTableColumns(columns) {
      this.tableColumns = columns
    },
    setSmallTable() {
      this.smallTable = !this.smallTable;

      if (this.smallTable) {
        this.descriptionSize = `${parseInt(this.descriptionSize) - 3}px`;
        this.decreaseFontSize();
      } else {
        this.descriptionSize = "14px";
        this.increaseFontSize();
      }
    },
    increaseFontSize() {
      this.fontSize = `${parseInt(this.fontSize) + 2}px`;
    },
    decreaseFontSize() {
      const fontSize = parseInt(this.fontSize);
      fontSize <= 10 ? this.fontSize = "10px" : this.fontSize = `${fontSize - 2}px`
    },
  },
  getters: {
    getTableData() {
      return this.tableData[1]
    },
    getHeaders() {
      return this.tableData[0]
    }
  }
})