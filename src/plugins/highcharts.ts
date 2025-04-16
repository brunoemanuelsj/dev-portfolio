import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';
import HighchartsMore from 'highcharts/highcharts-more';
import accessibility from 'highcharts/modules/accessibility';
import HighchartsBoost from 'highcharts/modules/boost';
import exporting from 'highcharts/modules/exporting';
import heatmap from 'highcharts/modules/heatmap';
import hollowcandlestick from 'highcharts/modules/hollowcandlestick';
import HighchartsMap from 'highcharts/modules/map';
import highstock from 'highcharts/modules/stock';
import tilemap from 'highcharts/modules/tilemap';
import treemap from 'highcharts/modules/treemap';

highstock(Highcharts);
heatmap(Highcharts);
tilemap(Highcharts);
HighchartsBoost(Highcharts);
HighchartsMore(Highcharts);
treemap(Highcharts);
HighchartsMap(Highcharts);
hollowcandlestick(Highcharts);
accessibility(Highcharts);
exporting(Highcharts);

Highcharts.setOptions({
  accessibility: { enabled: true },
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
