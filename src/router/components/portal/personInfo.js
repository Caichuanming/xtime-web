export default [{
        path: "password",
        name: "修改密码",
        component: () => import( /* webpackChunkName: "personInfo" */ '@/views/portal/Password'),
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
                    name: "修改密码",
                }
            ]
        }
    },
    {
        path: "data",
        name: "个人信息",
        component: () => import( /* webpackChunkName: "personInfo" */ '@/views/portal/UserData'),
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
                    name: "个人信息",
                }
            ]
        }
    }
]