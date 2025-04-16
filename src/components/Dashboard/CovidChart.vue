<template>
  <div class="covid-chart">
    <h4 class="title">
      Evolução da COVID-19 no Brasil (últimos 90 dias)
    </h4>

    <h6 class="subtitle">
      Dados da disease.sh - Open Disease Data API
    </h6>

    <LoadingDefault
      v-if="loading"
      class="loading_wrapper"
    />
    <highcharts v-else :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import LoadingDefault from '../Default/LoadingDefault.vue';

const loading = ref(true);

const chartOptions = ref({
  chart: {
    type: 'line',
  },
  title: {
    text: '',
  },
  xAxis: {
    type: 'datetime' as const,
    categories: [] as never[],
    title: { text: 'Data' },
    labels: {
      format: '{value:%d/%m/%Y}',
    },
  },
  yAxis: {
    title: { text: 'Número de Pessoas' },
  },
  tooltip: {
    shared: true,
    crosshairs: true,
  },
  series: [] as Array<{
    name: string;
    data: [number, number][];
  }>,
  plotOptions: {
    line: {
      marker: {
        enabled: false,
      },
    },
  },
  credits: { enabled: false },
  exporting: { enabled: true },
});

interface CovidTimeline {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
}

const chartData = ref<CovidTimeline | null>(null);

async function fetchCovidData() {
  loading.value = true;
  try {
    const res = await axios.get(
      'https://disease.sh/v3/covid-19/historical/brazil?lastdays=90'
    );
    console.log('res.dataaa');

    chartData.value = res.data.timeline;

    console.log(res.data);
    console.log(chartData.value);

    mountChart();
  } catch (err) {
    console.error('Erro ao buscar dados da COVID-19:', err);
  } finally {
    loading.value = false;
  }
}

function mountChart() {
  if (!chartData.value) return;

  const timeline = chartData.value;

  const dates = Object.keys(timeline.cases);

  const sortedDates = dates
    .map((dateStr) => ({
      dateStr,
      timestamp: new Date(dateStr).getTime(),
    }))
    .sort((a, b) => a.timestamp - b.timestamp);

  const casesData: [number, number][] = sortedDates.map(
    (d) => [d.timestamp, timeline.cases[d.dateStr] || 0]
  );
  const deathsData: [number, number][] = sortedDates.map(
    (d) => [d.timestamp, timeline.deaths[d.dateStr] || 0]
  );
  const recoveredData: [number, number][] = sortedDates.map(
    (d) => [d.timestamp, timeline.recovered[d.dateStr] || 0]
  );

  chartOptions.value.xAxis = {
    type: 'datetime',
    categories: [] as never[],
    title: { text: 'Data' },
    labels: {
      format: '{value:%d/%m/%Y}',
    },
  };

  chartOptions.value.series = [
    { name: 'Casos', data: casesData },
    { name: 'Óbitos', data: deathsData },
    { name: 'Recuperados', data: recoveredData },
  ];
}

onMounted(() => {
  fetchCovidData();
});
</script>

<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}

.loading_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
}

.subtitle {
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 400;
}
</style>
