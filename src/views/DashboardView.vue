<template>
  <div class="dashboard">
    <CovidChart class="chart-item chart-item-full" />
    <WorldChart class="chart-item" />

    <highcharts :options="areaChart" class="chart-item" />
    <CandleChart class="chart-item chart-item-full" />
    <highcharts :options="barChart" class="chart-item" />

    <highcharts :options="pieChart" class="chart-item" />

    <highcharts :options="donutChart" class="chart-item" />

    <highcharts
      :options="combinedChart"
      class="chart-item"
    />

    <highcharts
      :options="scatterChart"
      class="chart-item"
    />

    <highcharts :options="columnChart" class="chart-item" />

    <highcharts :options="bubbleChart" class="chart-item" />

    <highcharts :options="gaugeChart" class="chart-item" />
  </div>
</template>

<script setup lang="ts">
import CandleChart from '@/components/Dashboard/CandleChart.vue';
import CovidChart from '@/components/Dashboard/CovidChart.vue';
import WorldChart from '@/components/Dashboard/WorldChart.vue';
import { ref } from 'vue';

const barChart = ref({
  chart: { type: 'bar' },
  title: { text: 'Monthly Sales' },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  },
  yAxis: { title: { text: 'Units' } },
  series: [
    {
      name: 'Sales',
      data: [450, 720, 620, 890, 1230, 980],
    },
  ],
});

const pieChart = ref({
  chart: { type: 'pie' },
  title: { text: 'Market Share' },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format:
          '<b>{point.name}</b>: {point.percentage:.1f} %',
      },
    },
  },
  series: [
    {
      name: 'Share',
      colorByPoint: true,
      data: [
        {
          name: 'Chrome',
          y: 61.41,
        },
        {
          name: 'Edge',
          y: 11.84,
        },
        {
          name: 'Firefox',
          y: 10.85,
        },
        {
          name: 'Safari',
          y: 4.67,
        },
        {
          name: 'Others',
          y: 7.05,
        },
      ],
    },
  ],
});

const areaChart = ref({
  chart: { type: 'area' },
  title: { text: 'Area Coverage' },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  },
  series: [
    {
      name: 'Region A',
      data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0],
    },
    {
      name: 'Region B',
      data: [148, 176, 135, 129, 140, 158],
    },
  ],
});

const scatterChart = ref({
  chart: { type: 'scatter' },
  title: { text: 'Weight vs Height' },
  xAxis: { title: { text: 'Height (cm)' } },
  yAxis: { title: { text: 'Weight (kg)' } },
  series: [
    {
      name: 'Samples',
      data: [
        [161.2, 51.6],
        [167.5, 59.0],
        [159.5, 49.2],
        [157.0, 63.0],
      ],
    },
  ],
});

const columnChart = ref({
  chart: {
    type: 'column',
    options3d: {
      enabled: true,
      alpha: 15,
      beta: 15,
      depth: 50,
    },
  },
  title: { text: 'Department Performance' },
  xAxis: {
    categories: ['Sales', 'IT', 'HR', 'Finance'],
  },
  plotOptions: {
    column: {
      depth: 25,
    },
  },
  series: [
    {
      name: 'Target',
      data: [120, 90, 80, 110],
    },
    {
      name: 'Actual',
      data: [105, 95, 85, 115],
    },
  ],
});

const donutChart = ref({
  chart: { type: 'pie' },
  title: { text: 'Budget Distribution' },
  plotOptions: {
    pie: {
      innerSize: '50%',
      depth: 45,
    },
  },
  series: [
    {
      name: 'Budget',
      data: [
        {
          name: 'Marketing',
          y: 45,
        },
        {
          name: 'Research',
          y: 25,
        },
        {
          name: 'Development',
          y: 20,
        },
        {
          name: 'Others',
          y: 10,
        },
      ],
    },
  ],
});

const bubbleChart = ref({
  chart: { type: 'bubble' },
  title: { text: 'Investment Relationship' },
  xAxis: { title: { text: 'Initial Capital' } },
  yAxis: { title: { text: 'Return' } },
  series: [
    {
      data: [
        {
          x: 95,
          y: 95,
          z: 13.8,
          name: 'A',
        },
        {
          x: 86.5,
          y: 102.9,
          z: 14.7,
          name: 'B',
        },
      ],
    },
  ],
});

const gaugeChart = ref({
  chart: { type: 'gauge' },
  title: { text: 'Speedometer' },
  pane: {
    startAngle: -90,
    endAngle: 90,
    background: null,
  },
  yAxis: {
    min: 0,
    max: 200,
    title: { text: 'km/h' },
  },
  series: [
    {
      name: 'Speed',
      data: [120],
    },
  ],
});

const combinedChart = ref({
  title: { text: 'Data Combination' },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  },
  series: [
    {
      type: 'column',
      name: 'Sales',
      data: [5, 3, 4, 7, 2],
    },
    {
      type: 'line',
      name: 'Average',
      data: [3, 2.67, 3, 6.33, 3.33],
    },
    {
      type: 'pie',
      name: 'Share',
      data: [
        {
          name: 'January',
          y: 5,
        },
        {
          name: 'February',
          y: 3,
        },
      ],
      center: [100, 80],
      size: 100,
      showInLegend: false,
    },
  ],
});
</script>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;
}

.chart-item {
  min-height: 400px;
  background: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.chart-item-full {
  grid-column: 1 / -1;
}

@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
}
</style>
