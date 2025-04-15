import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsBoost from 'highcharts/modules/boost';
import heatmap from 'highcharts/modules/heatmap';
import tilemap from 'highcharts/modules/tilemap';
import treemap from 'highcharts/modules/treemap';
heatmap(Highcharts);
tilemap(Highcharts);
HighchartsBoost(Highcharts);
HighchartsMore(Highcharts);
treemap(Highcharts);

Highcharts.setOptions({
  accessibility: { enabled: false },
  credits: { enabled: false },

  colors: [
    '#061a40',
    '#90adc6',
    '#fad02c',
    '#34113f',
    '#e9eaec',
    '#333652',
  ],
  lang: {
    decimalPoint: ',',
    thousandsSep: '.',
  },
});

export { Highcharts, HighchartsVue };
