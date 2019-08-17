export default [{
        path: "system",
        name: "系统列表",
        component: () => import( /* webpackChunkName: "baseInfo" */ '@/views/portal/System'),
        meta: {
            title: "breadcrumb"
        }
    },
    {
        path: "user",
        component: () => import( /* webpackChunkName: "baseInfo" */ '@/views/portal/User'),
        meta: {
            title: "breadcrumb"
        }
    },
    {
        path: "role",
        component: () => import( /* webpackChunkName: "baseInfo" */ '@/views/portal/Role'),
        meta: {
            title: "breadcrumb"
        }
    },
    {
        path: "menu",
        component: () => import( /* webpackChunkName: "baseInfo" */ '@/views/portal/Menu'),
        meta: {
            title: "breadcrumb"
        }
    },
    {
        path: "permission",
        component: () => import( /* webpackChunkName: "baseInfo" */ '@/views/portal/Permission'),
        meta: {
            title: "breadcrumb"
        }
    }
]