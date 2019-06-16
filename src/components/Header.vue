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
            <el-dropdown v-if="isLogin">
                <span class="el-dropdown-link">
                    <i class="el-icon-s-custom"></i>
                    管理员
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>注销</el-dropdown-item>
                    <el-dropdown-item>修改密码</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button v-else type="text" class="btn-login"><router-link to="/login">登录</router-link></el-button>
        </div>
    </div>
</template>
<script>
import Menu from './Menu'
export default {
    name: 'Header',
    components: {
        Menu
    },
    data() {
        return {
            isLogin: false
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
    .header-menu{
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
    .btn-login{
        color: #fff;
    }
}
</style>

