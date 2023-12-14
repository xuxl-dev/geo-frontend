<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
  import { basicProps } from './props';
</script>
<script lang="ts" setup>
  import { onMounted, ref, Ref } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { datetime, total, employees, foreignPersonnel, getData } from './data';

  defineProps({
    ...basicProps,
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  const get = getData();

  onMounted(() => {
    // setOptions({
    //   tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //       lineStyle: {
    //         width: 1,
    //         color: '#019680',
    //       },
    //     },
    //   },
    //   xAxis: {
    //     type: 'category',
    //     boundaryGap: false,
    //     data: [...new Array(18)].map((_item, index) => `${index + 6}:00`),
    //     splitLine: {
    //       show: true,
    //       lineStyle: {
    //         width: 1,
    //         type: 'solid',
    //         color: 'rgba(226,226,226,0.5)',
    //       },
    //     },
    //     axisTick: {
    //       show: false,
    //     },
    //   },
    //   yAxis: [
    //     {
    //       type: 'value',
    //       max: 80000,
    //       splitNumber: 4,
    //       axisTick: {
    //         show: false,
    //       },
    //       splitArea: {
    //         show: true,
    //         areaStyle: {
    //           color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
    //         },
    //       },
    //     },
    //   ],
    //   grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
    //   series: [
    //     {
    //       smooth: true,
    //       data: [
    //         111, 222, 4000, 18000, 33333, 55555, 66666, 33333, 14000, 36000, 66666, 44444, 22222,
    //         11111, 4000, 2000, 500, 333, 222, 111,
    //       ],
    //       type: 'line',
    //       areaStyle: {},
    //       itemStyle: {
    //         color: '#5ab1ef',
    //       },
    //     },
    //     {
    //       smooth: true,
    //       data: [
    //         33, 66, 88, 333, 3333, 5000, 18000, 3000, 1200, 13000, 22000, 11000, 2221, 1201, 390,
    //         198, 60, 30, 22, 11,
    //       ],
    //       type: 'line',
    //       areaStyle: {},
    //       itemStyle: {
    //         color: '#019680',
    //       },
    //     },
    //   ],
    // });
    setOptions({
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['总人数', '员工人数', '外来人员'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: datetime.value.slice(1),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '总人数',
          type: 'line',
          stack: 'Total',
          data: total.value.slice(1),
        },
        {
          name: '员工人数',
          type: 'line',
          data: employees.value.slice(1),
        },
        {
          name: '外来人员',
          type: 'line',
          data: foreignPersonnel.value.slice(1),
        },
      ],
    });
  });
</script>
