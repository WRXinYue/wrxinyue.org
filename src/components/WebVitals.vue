<template>
  <MeterGroup class="h-auto w-full" :value="vitalsValue" labelPosition="start">
    <template #label="{ value }">
      <div class="flex w-full justify-around text-sm gap-2">
        <template v-for="(val, i) of value" :key="i">
          <span :style="{ color: val.color }"> {{ val.label }} ({{ val.value }}%)</span>
        </template>
      </div>
    </template>
    <template #start="{ totalPercent }">
      <div class="flex mt-3 mb-2">
        <span :style="{ width: totalPercent + '%' }" class="absolute text-right">{{ totalPercent }}%</span>
        <span>Web Vitals</span>
      </div>
    </template>
    <template #meter="slotProps">
      <span :class="slotProps.class" :style="{ backgroundColor: slotProps.value.color, width: slotProps.size }" />
    </template>
  </MeterGroup>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { usePerformanceStore } from '~/stores/performance'
import { CLSThresholds, FIDThresholds, LCPThresholds } from 'web-vitals'

defineProps({
  visibleRight: Boolean,
})

const vitalsValue = ref([
  { color: '#239EF0', label: 'CLS', value: 0 },
  { color: '#FAA419', label: 'FID', value: 0 },
  { color: '#EE5879', label: 'LCP', value: 0 },
])

const performanceStore = usePerformanceStore()
const { actualCLS, actualFID, actualLCP } = storeToRefs(performanceStore)

const chartOptions = ref(null)

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--text-color')

  return {
    plugins: {
      legend: {
        labels: {
          cutout: '60%',
          color: textColor,
        },
      },
    },
  }
}

function calculatePerformancePercentage(metricValue, thresholds) {
  const [goodThreshold, poorThreshold] = thresholds
  // Good performance
  if (metricValue <= goodThreshold) {
    return 100
  }
  // Poor performance
  if (metricValue >= poorThreshold) {
    return 0
  }
  // The performance is between good and poor
  return ((poorThreshold - metricValue) / (poorThreshold - goodThreshold)) * 100
}

onMounted(() => {
  chartOptions.value = setChartOptions()

  vitalsValue.value[0].value = calculatePerformancePercentage(actualCLS.value, CLSThresholds)
  vitalsValue.value[1].value = calculatePerformancePercentage(actualFID.value, FIDThresholds)
  vitalsValue.value[2].value = calculatePerformancePercentage(actualLCP.value, LCPThresholds)

  console.log(`CLS Score: ${vitalsValue.value[0].value}%`)
  console.log(`FID Score: ${vitalsValue.value[1].value}%`)
  console.log(`LCP Score: ${vitalsValue.value[2].value}%`)
})
</script>

<style scoped>
.score {
  text-align: center;
  margin-top: 20px;
  font-size: 1.5rem;
}
</style>
