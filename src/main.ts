import './assets/global.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

import {
  Highcharts,
  HighchartsVue,
} from './plugins/highcharts';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(HighchartsVue, { highcharts: Highcharts });
app.mount('#app');
