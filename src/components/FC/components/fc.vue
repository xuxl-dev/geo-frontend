<template>
  <fs-page>
    <fs-crud ref="crudRef" v-bind="crudBinding" />
  </fs-page>
</template>

<script lang="ts" setup>
  import { FsPage, FsCrud, type CrudOptions } from '@fast-crud/fast-crud';
  import { ref, onMounted } from 'vue';
  import { useFs } from '@fast-crud/fast-crud';
  import { merge } from 'lodash-es';
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
    /**
     * Override crudOptions
     */
    config: {
      type: Object as PropType<Partial<CrudOptions>>,
      default: {},
      required: false,
    },
  });

  //此处为crudOptions配置

  const crudBinding = ref();
  const crudRef = ref();
  const context: any = {}; //变量上下文，传给createCrudOptions的额外参数（可以任意命名，任意多个）

  const nameMap = {
    create: 'addRequest',
    read: 'pageRequest',
    update: 'editRequest',
    delete: 'delRequest',
  };

  onMounted(async () => {
    console.log(`bind: ${props.bind}`);

    const createCrudOptions = async function () {
      const { crud, dict } = (await defHttp.get({ url: props.bind })) as {
        crud: { [key: string]: string };
        dict: { [key: string]: any };
      };

      const request = Object.fromEntries(
        Object.entries(crud).map(([key, value]) => {
          return [nameMap[key], (params: any) => defHttp.post({ url: value, params })];
        }),
      );
      const remoteOptions = {
        crudOptions: {
          request,
          columns: replaceDictValues(dict),
        },
      };

      //TODO check this
      return merge(remoteOptions, props.config);
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
