<template>
  <div style="display: flex; text-align: center">
    <Card title="统计分析">
      <CountAnaysis />
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import CountAnaysis from './components/echarts/countAnaysis.vue';
  import { Card } from 'ant-design-vue';
</script>

<style lang="scss" scoped></style>
