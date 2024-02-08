<template>
  <div>
    <NuxtLayout name="custome">
      <div class="card">
        <div class="card-body min-h-96">
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { Line } from "vue-chartjs"
const chartData = ref({
  labels: ["January", "February", "March", "April", "May"],
  options: {
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Value",
        },
      },
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    responsive: true,
    height: "100%",
  },
  datasets: [
    {
      label: "Income",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      data: [550, 471, 602, 580, 650],
      borderColor: "#f87979",
      pointRadius: 6,
      fill: true,
    },
  ],
})
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
})
</script>
