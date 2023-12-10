import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const infomanage: AppRouteModule = {
    path: '/organization',
    name: '组织结构',
    component: LAYOUT,
    redirect: '/infomanage/organization/rolemanage',
    meta: {
        orderNo: 5,
        icon: 'ion:grid-outline',
        title: t('组织结构'),
    },
    children: [
        {
            path: 'rolemanage',
            name: '角色管理',
            component: () => import('/@/views/infomanage/organiztion/rolemanage/index.vue'),
            meta: {
                title: "角色管理",
            },
        },
        {
            path: 'userlist',
            name: '用户列表',
            component: () => import('/@/views/infomanage/organiztion/userlist/index.vue'),
            meta: {
                title: "用户列表",
            },
        },
        {
            path: 'department',
            name: '部门管理',
            component: () => import('/@/views/infomanage/organiztion/department/index.vue'),
            meta: {
                // affix: true,
                title: "部门管理",
            },
        },
    ],
};

export default infomanage;