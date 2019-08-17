<template>
    <div class="sidebar">
        <el-menu
            class="el-menu-vertical-demo"
            background-color="#EFF2F7"
            text-color="#303133"
            :default-active="sidebarActive"
            active-text-color="#409EFF"
        >
            <template v-for="(item, index) of sidebarList">
                <!-- 单层 -->
                <el-menu-item v-if="item.children.length === 0" :key="index+1" :index="item.index">
                    <template slot="title">
                        <span>
                            <i class="el-icon-menu"></i>
                            <router-link :to="item.router">{{item.title}}</router-link>
                        </span>
                    </template>
                </el-menu-item>
                <!-- 多层 -->
                <el-submenu
                    v-else
                    v-for="(cItem, cIndex) in item.children"
                    :index="String(index+1)"
                    :key="cIndex"
                >
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>{{item.title}}</span>
                    </template>
                    <el-menu-item :key="cIndex+1" :index="cItem.index">
                        <router-link :to="cItem.router">{{cItem.title}}</router-link>
                    </el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

import * as Common from "@/api/common";
export default {
    name: "Sidebar",
    watch: {},
    data() {
        return {
            sidebarActive: ""
        };
    },
    computed: {
        ...mapState("global", [
            "systemCode",
            "menuCode",
            "sidebarList",
            "breadcrumbList",
            "userCode"
        ])
    },
    methods: {
        ...mapMutations("global", [
            "changeSidebarList",
            "changeBreadcrumbList"
        ]),
        async getSidebarData(systemCode, menuCode) {
            const res = await Common.getSidebarSubmit({
                sysCode: systemCode,
                menuCode: menuCode,
                userCode: this.userCode
            });
            this.changeSidebarList(res.data);
            const router = this.$router.history.current.path;
            for (const item of this.sidebarList) {
                if (router === item.router) {
                    this.sidebarActive = item.index;
                    this.changeBreadcrumbList(item.breadcrumbList);
                } else {
                    for (const cItem of item.children) {
                        if (router === cItem.router) {
                            this.sidebarActive = cItem.index;
                            this.changeBreadcrumbList(item.breadcrumbList);
                        }
                    }
                }
            }
        },
        getSidebarParams() {
            const path = this.$router.history.current.path;
            const pathArr = path.slice(1).split("/");
            this.getSidebarData(pathArr[0], pathArr[1]);
        }
    },
    created() {
        this.getSidebarParams();
    }
};
</script>
<style lang="scss" scoped>
.el-menu {
    border-right: 0;
}
.sidebar {
    a {
        color: #333;
    }
}
</style>
