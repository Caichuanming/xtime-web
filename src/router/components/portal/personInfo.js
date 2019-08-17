export default [{
        path: "password",
        name: "修改密码",
        component: () => import( /* webpackChunkName: "personInfo" */ '@/views/portal/Password'),
        meta: {
            title: "breadcrumb"
        }
    },
    {
        path: "data",
        name: "个人信息",
        component: () => import( /* webpackChunkName: "personInfo" */ '@/views/portal/UserData'),
        meta: {
            title: "breadcrumb"
        }
    }
]