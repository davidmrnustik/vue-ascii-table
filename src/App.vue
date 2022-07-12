<template>
  <h1>{{title}}</h1>

  <input v-model="tableFormat" @change="onChange" type="number" min="1" max="4" placeholder="Type a table format">
  <p>Format is: <strong>{{tableFormat}}</strong></p>
  {{tableData}}

</template>

<script>
import module from '../public/a.out.js';

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
  data() {
    return {
      tableFormat: 4,
      title: "Ascii table",
      tableData: null
    }
  },
  methods: {
    onChange(e) {
      this.getTable(e.target.value);
    },
    getTable(value) {
      instance.ready.then(_ => this.tableData = instance.getTable(value));
    },
  },
  mounted() {
    this.getTable(this.tableFormat);
  }
}
</script>
