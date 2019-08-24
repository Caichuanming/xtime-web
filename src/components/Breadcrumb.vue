<template>
    <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item v-for="(item, index) in this.breadcrumbList" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            // breadcrumbList: this.breadcrumbList
        }
    },
    computed: {
        ...mapState('global', ['breadcrumbList', 'sidebarList'])
    },
    methods: {
        ...mapMutations('global', ['changeBreadcrumbList'])
    },
    watch: {
        $route() {
            // this.breadcrumbList = this.$router.history.current.meta.breadcrumb
            const router = this.$router.history.current.path
            for (const item of this.sidebarList) {
                if (router === item.router) {
                    // this.sidebarActive = item.index
                    this.changeBreadcrumbList(item.breadcrumbList);
                } else {
                    for (const cItem of item.children) {
                        if (router === cItem.router) {
                            // this.sidebarActive = cItem.index
                            this.changeBreadcrumbList(cItem.breadcrumbList);
                        }
                    }
                }
            }
        }
    },

}
</script>
<style lang="scss" scoped>
.breadcrumb{
    margin-bottom: 30px;
}
</style>
