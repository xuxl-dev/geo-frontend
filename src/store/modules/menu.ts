import { defineStore } from 'pinia';
import { Ref, computed, ref } from 'vue';
import { Menu } from '/@/router/types';

export const useMenuStore = defineStore('menu-manipulation', () => {
  let menusRef : Ref<Menu[]> = ref([])
  return { menusRef };
});
// const menusRef: Ref<{
//   name: string;
//   icon?: string | undefined;
//   img?: string | undefined;
//   path: string;
//   paramPath?: string | undefined;
//   disabled?: boolean | undefined;
//   children?: ...[] | undefined;
//   orderNo?: number | undefined;
//   roles?: RoleEnum[] | undefined;
//   meta?: {
//       ...;
//   } | undefined;
//   tag?: {
//       ...;
//   } | undefined;
//   hideMenu?: boolean | undefined;
// }[]>