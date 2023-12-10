<template>
  <div>
    <button @click="filterByMetaGroups">Clickme!</button>
  </div>
</template>

<script lang="ts" setup>
  import { useMenuStore } from '../../../store/modules/menu';
  const menuStore = useMenuStore();

  const filterByMetaGroups = () => {
    menuStore.filterMenu((menu) => {
      return menu.meta?.groups?.includes('test') ?? false;
    });
  };
</script>

<style scoped></style>
