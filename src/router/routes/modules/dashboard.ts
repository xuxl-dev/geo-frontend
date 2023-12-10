import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.dashboard'),
    groups: ['test'],
  },
  children: [
    {
      path: 'test_menu',
      name: 'Test_menu',
      component: () => import('/@/views/dashboard/test/menuManipulate.vue'),
      meta: {
        title: "TestMenu",
      },
    },
    {
      path: 'test',
      name: 'Test',
      component: () => import('/@/views/dashboard/test/tracker.vue'),
      meta: {
        title: "Test",
      },
    },
    {
      path: 'fastcrud',
      name: 'Fastcrud',
      component: () => import('/@/views/dashboard/test/fcrud/index.vue'),
      meta: {
        title: "FastCRUD",
      },
    },
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('/@/views/dashboard/analysis/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.analysis'),
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: {
        title: t('routes.dashboard.workbench'),
      },
    },
  ],
};

export default dashboard;
