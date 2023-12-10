import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { Menu } from '/@/router/types';

export const useMenuStore = defineStore('menu-manipulation', () => {
  let menusRef = ref<Menu[]>([]);
  const filteredMenusRef = ref<Menu[]>([]);

  watch(
    menusRef,
    (menus) => {
      filteredMenusRef.value = menus;
      console.log('filteredMenusRef.value', filteredMenusRef.value);
    },
    { immediate: true },
  );

  const filterMenu = (filter: (menu: Menu) => boolean) => {
    filteredMenusRef.value = menusRef.value.filter(filter);
  };

  return { menusRef, filterMenu, filteredMenusRef };
});
