import Vue from 'vue'
import Router from 'vue-router'
import route from '@/router/route.js'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: route
})