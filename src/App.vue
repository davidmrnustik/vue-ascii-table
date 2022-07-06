<template>
  <h1>{{title}}</h1>

  <input v-model="tableFormat" @change="onChange" type="number" min="1" max="4" placeholder="Type a table format">
  <p>Format is: <strong>{{tableFormat}}</strong></p>
  {{tableData}}

</template>

<script>
import module from './a.out';

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

<style>
@import './assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

a {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
