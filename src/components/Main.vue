<template>
    <el-container>
        <el-header>
            <Header />
        </el-header>
        <el-container>
            <p v-if="welcomeShow"
               class="wel"><i class="el-icon-s-home"></i>Welcome to xtime</p>
            <el-container v-else>
                <el-aside width="200px"
                          class="sidebar">
                    <Sidebar />
                </el-aside>
                <el-main>
                    <Breadcrumb />
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
import Header from './Header.vue'
import Sidebar from './Sidebar'
import Breadcrumb from './Breadcrumb'

export default {
    name: 'Main',
    components: {
        Header,
        Sidebar,
        Breadcrumb
    },
    computed: {
        welcomeShow() {
            return this.$route.path === '/' ? true : false
        },
    },
    methods: {
    },
    mounted() {
    }
}
</script>
<style lang="scss" scoped>
.el-header {
    padding: 0;
}
.sidebar {
    background-color: #EFF2F7;
    margin-bottom: -10000px;
    padding-bottom: 10000px;
}
.wel {
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    width: 100%;
    margin-top: 100px;
}
</style>

