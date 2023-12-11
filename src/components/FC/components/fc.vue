<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding" />
  </fs-page>
</template>

<script lang="ts" setup>
  import { FsPage, FsCrud } from '@fast-crud/fast-crud';
  import { ref, onMounted } from 'vue';
  import { useFs } from '@fast-crud/fast-crud';
  import _ from 'lodash-es';
  import { defHttp } from '/@/utils/http/axios';
  import { replaceDictValues } from '../dictHelper';

  const props = defineProps({
    /**
     * 订阅的数据字典URL（获取数据字典和增删查改端点信息）
     */
    bind: {
      type: String,
      required: true,
    },
  });

  //此处为crudOptions配置

  const crudBinding = ref();
  const crudRef = ref();
  const context: any = {}; //变量上下文，传给createCrudOptions的额外参数（可以任意命名，任意多个）
  onMounted(async () => {
    console.log(`bind: ${props.bind}`);

    const createCrudOptions = async function () {
      const { crud, dict } = (await defHttp.get({ url: props.bind })) as {
        crud: { [key: string]: string };
        dict: { [key: string]: any };
      };
      // console.log(`crud: ${JSON.stringify(crud)}`);
      // console.log(`dict: ${JSON.stringify(dict)}`);
      const nameMap = {
        create: 'addRequest',
        read: 'pageRequest',
        update: 'editRequest',
        delete: 'delRequest',
      };

      const request = Object.fromEntries(
        Object.entries(crud).map(([key, value]) => {
          return [nameMap[key], (params: any) => defHttp.post({ url: value, params })];
        }),
      );
      return {
        crudOptions: {
          request,
          columns: replaceDictValues(dict),
        },
      };
    };

    const { crudExpose } = await useFs({
      crudBinding,
      crudRef,
      createCrudOptions,
      context,
    });

    crudExpose.doRefresh();
  });
</script>

<style scoped></style>
