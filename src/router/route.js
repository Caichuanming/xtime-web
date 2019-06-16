// 主路由
import Main from '@/components/Main.vue'
import BaseInfo from './components/portal/baseInfo'
import PersonInfo from './components/portal/personInfo'
import Login from "@/views/Login"
export default [{
        path: '/',
        name: '首页',
        component: Main,
    },
    {
        path: "/portal/baseInfo",
        component: Main,
        name: "基础信息",
        children: BaseInfo
    },
    {
        path: "/portal/personInfo",
        component: Main,
        name: "个人信息",
        children: PersonInfo
    },
    {
        path: "/cmc/member",
        component: Main,
        name: "会员管理"
    },
    {
        path: "/cmc/snack",
        component: Main,
        name: "卖品管理"
    },
    {
        path: "/ticket/movie",
        component: Main,
        name: "影片管理"
    },
    {
        path: "/ticket/match",
        component: Main,
        name: "数据匹配"
    },
    {
        path: "/ticket/showtime",
        component: Main,
        name: "排期管理"
    },
    {
        path: "/login",
        component: Login,
        name: "登录"
    }
    // {
    //     path: '*',
    //     name: '404',
    //     component: "error",
    // }
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
]