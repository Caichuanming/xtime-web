import Vue from 'vue'
import Router from 'vue-router'
import route from '@/router/route.js'
import Cookie from 'js-cookie'

Vue.use(Router)

export const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: route
})

router.beforeEach((to, from, next) => {
    if (to.path !== "/login") {
        let hasAccessToken = Boolean(Cookie.get('access_token'))
        if (!hasAccessToken) {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router