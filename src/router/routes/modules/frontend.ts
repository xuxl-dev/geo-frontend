import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const infomanage: AppRouteModule = {
    path: '/frontend',
    name: '前端系统',
    component: LAYOUT,
    redirect: '/frontend/count',
    meta: {
        orderNo: 4,
        icon: 'ion:grid-outline',
        title: t('前端系统'),
    },
    children: [
        {
            path: 'count',
            name: '统计分析',
            component: () => import('/@/views/frontend/count/index.vue'),
            meta: {
                title: "统计分析",
            },
        },
        {
            path: 'action',
            name: '行为分析',
            component: () => import('/@/views/frontend/action/index.vue'),
            meta: {
                title: "行为分析",
            },
        },
    ],
};

export default infomanage;