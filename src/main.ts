import 'uno.css';
import '@/design/index.less';
import '@/components/VxeTable/src/css/index.scss';
import 'ant-design-vue/dist/reset.css';
// Register icon sprite
import 'virtual:svg-icons-register';

import { createApp } from 'vue';

import { registerGlobComp } from '@/components/registerGlobComp';
import { setupGlobDirectives } from '@/directives';
import { setupI18n } from '@/locales/setupI18n';
import { setupErrorHandle } from '@/logics/error-handle';
import { initAppConfigStore } from '@/logics/initAppConfig';
import { router, setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/guard';
import { setupStore } from '@/store';
import { FastCrud } from '@fast-crud/fast-crud';
import '@fast-crud/fast-crud/dist/style.css';
import ui from '@fast-crud/ui-naive';
import Fc from './views/dashboard/test/fcrud/components/fc.vue';

import App from './App.vue';
import Naive from 'naive-ui';
import { withInstall } from './utils';
async function bootstrap() {
  const app = createApp(App);

  // Configure store
  // 配置 store
  setupStore(app);
  app.use(Naive);
  app.use(ui);
  app.use(FastCrud, {
    // i18n, //i18n配置，可选，默认使用中文，具体用法请看demo里的 src/i18n/index.js 文件
    // 此处配置公共的dictRequest（字典请求）
    async dictRequest({ dict }) {
      // return await fetch({ url: dict.url }) as any; //根据dict的url，异步返回一个字典数组
      throw new Error('请配置dictRequest');
    },
    //公共crud配置
    commonOptions() {
      return {
        request: {
          //接口请求配置
          //你项目后台接口大概率与fast-crud所需要的返回结构不一致，所以需要配置此项
          //请参考文档http://fast-crud.docmirror.cn/api/crud-options/request.html
          transformQuery: ({ page, form, sort }) => {
            //转换为你pageRequest所需要的请求参数结构
            return { page, form, sort };
          },
          transformRes: ({ res }) => {
            //将pageRequest的返回数据，转换为fast-crud所需要的格式
            //return {records,currentPage,pageSize,total};
            return { ...res } as any;
          },
        },
        //你可以在此处配置你的其他crudOptions公共配置
      };
    },
  });
  // Initialize internal system configuration
  // 初始化内部系统配置
  initAppConfigStore();

  // Register global components
  // 注册全局组件
  registerGlobComp(app);
  app.use(withInstall(Fc))
  // Multilingual configuration
  // 多语言配置
  // Asynchronous case: language files may be obtained from the server side
  // 异步案例：语言文件可能从服务器端获取
  await setupI18n(app);

  // Configure routing
  // 配置路由
  setupRouter(app);

  // router-guard
  // 路由守卫
  setupRouterGuard(router);

  // Register global directive
  // 注册全局指令
  setupGlobDirectives(app);

  // Configure global error handling
  // 配置全局错误处理
  setupErrorHandle(app);

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();

  app.mount('#app');
}

bootstrap();
