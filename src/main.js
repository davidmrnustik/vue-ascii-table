import { createApp } from 'vue'
import App from './App.vue'

// const Module = {
//   onRuntimeInitialized: function() {
//     console.log("is ready");
//   }
// }

// let t;
const app = createApp(App)
// var Module = {
//   onRuntimeInitialized: function() {
//     console.log("is ready");
//     t = app.config.globalProperties.Module.getTable.bind(this);
//     console.log(t(4));
//
//   }
// }

app.mount('#app')


