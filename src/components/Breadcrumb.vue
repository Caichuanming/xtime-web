<template>
    <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
    data() {
        return {
            breadcrumbList: this.$router.history.current.meta.breadcrumb
        }
    },
    watch: {
        $route() {
            this.breadcrumbList = this.$router.history.current.meta.breadcrumb
        }
    },

}
</script>
<style lang="scss" scoped>
.breadcrumb{
    margin-bottom: 30px;
}
</style>
