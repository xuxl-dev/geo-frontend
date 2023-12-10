<template>
  <div>
    <button @click="filterByMetaGroups">Clickme!</button>
  </div>
</template>

<script lang="ts" setup>
  import { useMenuStore } from '../../../store/modules/menu';
  const menuStore = useMenuStore();

  const filterByMetaGroups = (menu: any) => {
    menuStore.filterMenu((menu) => {
      console.log(menu, menu.meta?.groups, menu.meta?.groups?.includes('test') ?? false);
      return menu.meta?.groups?.includes('test') ?? false;
    });
  };
</script>

<style scoped></style>
