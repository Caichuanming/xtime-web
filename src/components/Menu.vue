<template>
    <el-menu class="el-menu-demo"
             mode="horizontal"
             background-color="#099cec"
             text-color="#fff"
             :default-active="menuActive"
             active-text-color="#ffd04b">
        <el-submenu v-for="(item, index) of menuList"
                    :key="index"
                    :index="item.index"
                    :code="item.code">
            <template slot="title">{{item.title}}</template>
            <el-menu-item v-for="(cItem, cIndex) of item.children"
                          :key="cIndex"
                          :index="cItem.index"
                          :code="item.code">
                <router-link @click.native="getSidebarParams(cItem.router)"
                             :to="cItem.router">{{cItem.title}}</router-link>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import * as Common from '@/api/common'

export default {
    watch: {
        $route() {
            // this.getSidebarParams(this.$router.history.current.path)
        }
    },
    data() {
        return {
            menuList: [],
            menuActive: ''
        }
    },
    computed: {
        ...mapState('global', ['userCode'])
    },
    methods: {
        ...mapMutations('global', [
            'changeSysCode',
            'changeMenuCode',
            'changeSysAndFirst',
            'changeSidebarList',
            'changeBreadcrumbList'
        ]),
        async getMenuData() {
            console.log(this.userCode);
            const res = await Common.getMenuListData({userCode: this.userCode})
            this.menuList = res.data
            const path = this.$router.history.current.path
            const pathArr = path.slice(1).split('/')
            const router = "/" + pathArr[0] + '/' + pathArr[1]
            for (const item of this.menuList) {
                if (router === item.router) {
                    this.menuActive = item.index
                } else {
                    for (const cItem of item.children) {
                        if (router === cItem.router) {
                            this.menuActive = cItem.index
                        }
                    }
                }
            }
        },
        getSidebarParams(path) {
            const pathArr = path.slice(1).split('/')
            if (pathArr.length === 2) {
                this.changeSysCode(pathArr[0])
                this.changeMenuCode(pathArr[1])
                this.getSidebarData(pathArr[0], pathArr[1])
                this.changeBreadcrumbList('')
            }
        },
        async getSidebarData(systemCode, menuCode) {
            const res = await Common.getSidebarSubmit({
                sysCode: systemCode,
                menuCode: menuCode,
                userCode: this.userCode
            })
            this.changeSidebarList(res.data)
        }
    },
    created() {
        this.getMenuData()
    }
}
</script>
<style lang="scss" scoped>
.el-submenu__title i {
    color: red !important;
}
</style>
