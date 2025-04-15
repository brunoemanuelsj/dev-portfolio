<template>
  <div class="dashboard">
    <highcharts :options="barChart" class="chart-item" />

    <highcharts :options="lineChart" class="chart-item" />

    <highcharts :options="pieChart" class="chart-item" />

    <highcharts :options="areaChart" class="chart-item" />

    <highcharts
      :options="scatterChart"
      class="chart-item"
    />

    <highcharts :options="columnChart" class="chart-item" />

    <highcharts :options="donutChart" class="chart-item" />

    <highcharts :options="bubbleChart" class="chart-item" />

    <highcharts :options="gaugeChart" class="chart-item" />

    <highcharts
      :options="combinedChart"
      class="chart-item"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const commonOptions = {
  credits: { enabled: false },
  exporting: { enabled: true },
};

const barChart = ref({
  ...commonOptions,
  chart: { type: 'bar' },
  title: { text: 'Vendas Mensais' },
  xAxis: {
    categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  },
  yAxis: { title: { text: 'Unidades' } },
  series: [
    {
      name: 'Vendas',
      data: [450, 720, 620, 890, 1230, 980],
    },
  ],
});

const lineChart = ref({
  ...commonOptions,
  chart: { type: 'line' },
  title: { text: 'Crescimento de Usuários' },
  xAxis: {
    categories: [
      '2018',
      '2019',
      '2020',
      '2021',
      '2022',
      '2023',
    ],
  },
  yAxis: { title: { text: 'Usuários (mil)' } },
  series: [
    {
      name: 'Ativos',
      data: [1.5, 2.8, 3.2, 4.7, 6.1, 8.9],
    },
  ],
});

const pieChart = ref({
  ...commonOptions,
  chart: { type: 'pie' },
  title: { text: 'Participação de Mercado' },
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
      name: 'Participação',
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
          name: 'Outros',
          y: 7.05,
        },
      ],
    },
  ],
});

const areaChart = ref({
  ...commonOptions,
  chart: { type: 'area' },
  title: { text: 'Cobertura de Área' },
  xAxis: {
    categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  },
  series: [
    {
      name: 'Região A',
      data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0],
    },
    {
      name: 'Região B',
      data: [148, 176, 135, 129, 140, 158],
    },
  ],
});

const scatterChart = ref({
  ...commonOptions,
  chart: { type: 'scatter' },
  title: { text: 'Relação Peso x Altura' },
  xAxis: { title: { text: 'Altura (cm)' } },
  yAxis: { title: { text: 'Peso (kg)' } },
  series: [
    {
      name: 'Amostras',
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
  ...commonOptions,
  chart: {
    type: 'column',
    options3d: {
      enabled: true,
      alpha: 15,
      beta: 15,
      depth: 50,
    },
  },
  title: { text: 'Desempenho por Departamento' },
  xAxis: {
    categories: ['Vendas', 'TI', 'RH', 'Financeiro'],
  },
  plotOptions: {
    column: {
      depth: 25,
    },
  },
  series: [
    {
      name: 'Meta',
      data: [120, 90, 80, 110],
    },
    {
      name: 'Realizado',
      data: [105, 95, 85, 115],
    },
  ],
});

const donutChart = ref({
  ...commonOptions,
  chart: { type: 'pie' },
  title: { text: 'Distribuição de Orçamento' },
  plotOptions: {
    pie: {
      innerSize: '50%',
      depth: 45,
    },
  },
  series: [
    {
      name: 'Orçamento',
      data: [
        {
          name: 'Marketing',
          y: 45,
        },
        {
          name: 'Pesquisa',
          y: 25,
        },
        {
          name: 'Desenvolvimento',
          y: 20,
        },
        {
          name: 'Outros',
          y: 10,
        },
      ],
    },
  ],
});

const bubbleChart = ref({
  ...commonOptions,
  chart: { type: 'bubble' },
  title: { text: 'Relação de Investimento' },
  xAxis: { title: { text: 'Capital Inicial' } },
  yAxis: { title: { text: 'Retorno' } },
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
  ...commonOptions,
  chart: { type: 'gauge' },
  title: { text: 'Velocímetro' },
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
      name: 'Velocidade',
      data: [120],
    },
  ],
});

const combinedChart = ref({
  ...commonOptions,
  title: { text: 'Combinação de Dados' },
  xAxis: {
    categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
  },
  series: [
    {
      type: 'column',
      name: 'Vendas',
      data: [5, 3, 4, 7, 2],
    },
    {
      type: 'line',
      name: 'Média',
      data: [3, 2.67, 3, 6.33, 3.33],
    },
    {
      type: 'pie',
      name: 'Participação',
      data: [
        {
          name: 'Janeiro',
          y: 5,
        },
        {
          name: 'Fevereiro',
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
  grid-template-columns: repeat(
    auto-fit,
    minmax(400px, 1fr)
  );
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

@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
}
</style>
