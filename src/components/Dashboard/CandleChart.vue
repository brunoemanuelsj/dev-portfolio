<template>
  <div class="covid-chart">
    <h4 class="title">AAPL Stock Price</h4>

    <h6 class="subtitle">
      Data from
      https://demo-live-data.highcharts.com/aapl-ohlcv.json
    </h6>

    <LoadingDefault
      v-if="loading"
      class="loading_wrapper"
    />
    <highcharts
      v-else
      :options="chartOptions"
      :constructor-type="'stockChart'"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import LoadingDefault from '../Default/LoadingDefault.vue';

const loading = ref(false);

const chartOptions = ref({
  title: { text: '' },
  rangeSelector: {
    selected: 1,
  },
  series: [
    {
      type: 'hollowcandlestick',
      name: 'Hollow Candlestick',
      data: [],
    },
  ],
});

async function fetchData() {
  loading.value = true;
  try {
    const response = await fetch(
      'https://demo-live-data.highcharts.com/aapl-ohlcv.json'
    );
    const data = await response.json();
    chartOptions.value.series[0].data = data;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchData();
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
