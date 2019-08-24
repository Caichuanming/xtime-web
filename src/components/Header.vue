<template>
    <div class="header">
        <router-link class="header-icon"
                     to="/">
            <i class="el-icon-s-home"></i>xtime
        </router-link>
        <div class="header-menu">
            <Menu />
        </div>
        <div class="header-user">
            <el-dropdown v-if="this.isLogin">
                <span class="el-dropdown-link">
                    <i class="el-icon-s-custom"></i>
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown"
                                  split-button="true">
                    <el-dropdown-item @click.native="btnLogout">注销</el-dropdown-item>
                    <el-dropdown-item>修改密码</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button v-else
                       type="text"
                       class="btn-login">
                <router-link to="/login">登录</router-link>
            </el-button>
        </div>
    </div>
</template>
<script>
import Menu from './Menu'
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
import router from '@/router.js'
export default {
    name: 'Header',
    components: {
        Menu
    },
    computed: {
        ...mapState('global', ['username', 'userRoleName', 'isLogin'])
    },
    data() {
        return {
            // isLogin: this.isLogin
        }
    },
    methods: {
        btnLogout() {
            // 调用logout接口
            localStorage.clear()
            Cookie.set('access_token', '')
            router.replace({
                path: '/login'
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.header {
    height: 60px;
    padding: 0 30px;
    // background: linear-gradient(#099cec, #418AF1);
    background-color: #099cec;
    display: flex;
    flex-direction: center;
    align-items: center;
    position: relative;
    .header-icon {
        display: inline-block;
        font-size: 30px;
        font-weight: bolder;
        color: #fff;
    }
    .header-menu {
        position: absolute;
        left: 200px;
    }
    .header-user {
        position: absolute;
        right: 30px;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #fff;
        font-size: 16px;
    }
    .btn-login {
        color: #fff;
    }
}
</style>

