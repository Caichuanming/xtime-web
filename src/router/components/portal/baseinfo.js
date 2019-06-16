export default [{
        path: "system/list",
        name: "系统列表",
        component: () => import( /* webpackChunkName: "baseInfo" */ '@/views/portal/System'),
        meta: {
            title: "breadcrumb",
            breadcrumb: [
                {
                    name: "平台系统",
                },
                {
                    name: "基础信息",
                },
                {
                    name: "系统管理",
                },
                {
                    name: "系统列表",
                }
            ]
        }
    },
    {
        path: "user",
        component: () => import( /* webpackChunkName: "baseInfo" */ '@/views/portal/User'),
        meta: {
            title: "breadcrumb",
            breadcrumb: [{
                    name: "平台系统",
                },
                {
                    name: "基础信息",
                },
                {
                    name: "用户管理",
                }
            ]
        }
    },
    {
        path: "role",
        component: () => import( /* webpackChunkName: "baseInfo" */ '@/views/portal/Role'),
        meta: {
            title: "breadcrumb",
            breadcrumb: [{
                    name: "平台系统",
                },
                {
                    name: "基础信息",
                },
                {
                    name: "角色管理",
                }
            ]
        }
    },
    {
        path: "menu",
        component: () => import( /* webpackChunkName: "baseInfo" */ '@/views/portal/Menu'),
        meta: {
            title: "breadcrumb",
            breadcrumb: [{
                    name: "平台系统",
                },
                {
                    name: "基础信息",
                },
                {
                    name: "菜单管理",
                }
            ]
        }
    },
    {
        path: "permission",
        component: () => import( /* webpackChunkName: "baseInfo" */ '@/views/portal/Permission'),
        meta: {
            title: "breadcrumb",
            breadcrumb: [{
                    name: "平台系统",
                },
                {
                    name: "基础信息",
                },
                {
                    name: "权限管理",
                }
            ]
        }
    }
]