<template>
  <div class="covid-chart">
    <h4 class="title">Airport density per country</h4>

    <h6 class="subtitle">
      Source:
      <a
        href="http://www.citypopulation.de/en/world/bymap/airports/"
      >
        citypopulation.de
      </a>
      <br />
      Click and drag to rotate globe
    </h6>

    <LoadingDefault
      v-if="loading"
      class="loading_wrapper"
    />
    <div
      v-else
      id="globe-container"
      style="height: 600px"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { Highcharts } from '@/plugins/highcharts';
import { onMounted, ref } from 'vue';

import proj4 from 'proj4';
import LoadingDefault from '../Default/LoadingDefault.vue';

window.proj4 = proj4;

const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
    renderChart();
  }, 1500);
});

const renderChart = () => {
  const data = [
    { name: 'United States of America', value: 1477 },
    { name: 'Brazil', value: 490 },
    { name: 'Mexico', value: 882 },
    { name: 'Canada', value: 161 },
    { name: 'Russia', value: 74 },
    { name: 'Argentina', value: 416 },
    { name: 'Bolivia', value: 789 },
    { name: 'Colombia', value: 805 },
  ];

  const getGraticule = () => {
    const graticule = [];
    for (let x = -180; x <= 180; x += 15) {
      graticule.push({
        geometry: {
          type: 'LineString',
          coordinates:
            x % 90 === 0
              ? [
                  [x, -90],
                  [x, 0],
                  [x, 90],
                ]
              : [
                  [x, -80],
                  [x, 80],
                ],
        },
      });
    }
    for (let y = -90; y <= 90; y += 10) {
      const coordinates = [];
      for (let x = -180; x <= 180; x += 5) {
        coordinates.push([x, y]);
      }
      graticule.push({
        geometry: {
          type: 'LineString',
          coordinates,
          lineWidth: y === 0 ? 2 : undefined,
        },
      });
    }
    return graticule;
  };

  const afterAnimate = (
    e: Highcharts.ChartClickEventObject
  ) => {
    if (!e.target) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chart = (e.target as any).chart;

    if (!chart.get('flight-route')) {
      chart.addSeries(
        {
          type: 'mapline',
          name: 'Flight route, Amsterdam - Los Angeles',
          animation: false,
          id: 'flight-route',
          data: [
            {
              geometry: {
                type: 'LineString',
                coordinates: [
                  [4.9, 53.38],
                  [-118.24, 34.05],
                ],
              },
              color: '#313f77',
            },
          ],
          lineWidth: 2,
          accessibility: { exposeAsGroupOnly: true },
        },
        false
      );

      chart.addSeries(
        {
          type: 'mappoint',
          animation: false,
          data: [
            {
              name: 'Amsterdam',
              geometry: {
                type: 'Point',
                coordinates: [4.9, 53.38],
              },
            },
            {
              name: 'LA',
              geometry: {
                type: 'Point',
                coordinates: [-118.24, 34.05],
              },
            },
          ],
          color: '#313f77',
          accessibility: { enabled: false },
        },
        false
      );

      chart.redraw(false);
    }
  };

  // Usando fetch para carregar o arquivo JSON
  fetch(
    'https://code.highcharts.com/mapdata/custom/world.topo.json'
  )
    .then((response) => response.json())
    .then((topology) => {
      const chart = Highcharts.mapChart('globe-container', {
        chart: {
          map: topology,
        },
        title: {
          text: '',
          floating: true,
          align: 'left',
          style: { textOutline: '2px white' },
        },
        legend: { enabled: false },
        mapNavigation: {
          enabled: true,
          enableDoubleClickZoomTo: true,
          buttonOptions: { verticalAlign: 'bottom' },
        },
        mapView: {
          maxZoom: 30,
          projection: {
            name: 'Orthographic',
            rotation: [60, -30],
          },
        },
        colorAxis: {
          tickPixelInterval: 100,
          minColor: '#BFCFAD',
          maxColor: '#31784B',
          max: 1000,
        },
        tooltip: {
          pointFormat: '{point.name}: {point.value}',
        },
        plotOptions: {
          series: {
            animation: { duration: 750 },
            clip: false,
          },
        },
        series: [
          {
            name: 'Graticule',
            id: 'graticule',
            type: 'mapline',
            data: getGraticule(),
            nullColor: 'rgba(0, 0, 0, 0.05)',
            accessibility: { enabled: false },
            enableMouseTracking: false,
          },
          {
            data,
            joinBy: 'name',
            name: 'Airports per million km²',
            states: {
              hover: {
                color: '#a4edba',
                borderColor: '#333333',
              },
            },
            dataLabels: {
              enabled: false,
              format: '{point.name}',
            },
            events: { afterAnimate },
            accessibility: { exposeAsGroupOnly: true },
          },
        ],
      });

      const renderSea = () => {
        let verb = 'animate';
        if (!chart.sea) {
          chart.sea = chart.renderer
            .circle()
            .attr({
              fill: {
                radialGradient: { cx: 0.4, cy: 0.4, r: 1 },
                stops: [
                  [0, 'white'],
                  [1, 'lightblue'],
                ],
              },
              zIndex: -1,
            })
            .add(chart.get('graticule').group);
          verb = 'attr';
        }

        const bounds = chart.get('graticule').bounds;
        const p1 = chart.mapView.projectedUnitsToPixels({
          x: bounds.x1,
          y: bounds.y1,
        });
        const p2 = chart.mapView.projectedUnitsToPixels({
          x: bounds.x2,
          y: bounds.y2,
        });

        chart.sea[verb]({
          cx: (p1.x + p2.x) / 2,
          cy: (p1.y + p2.y) / 2,
          r: Math.min(p2.x - p1.x, p1.y - p2.y) / 2,
        });
      };

      renderSea();
      Highcharts.addEvent(chart, 'redraw', renderSea);
    })
    .catch((error) =>
      console.error('Error loading map data:', error)
    );
};
</script>

<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}

.subtitle {
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 400;
}

.loading_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
}
</style>
