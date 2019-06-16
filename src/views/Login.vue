<template>
    <div class="login">
        <div class="login-cont">
            <h1><i class="el-icon-s-platform"></i>xtime</h1>
            <p>请登录您的ID</p>
            <div class="cont">
                <el-input v-model="userId" placeholder="ID"></el-input>
                <el-input v-model="password" placeholder="密码" show-password></el-input>
                <el-button type="primary">登录</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userId: "",
            password: "",
        }
    },
}
</script>
<style lang="scss" scoped>
.login{
    width: 100%;
    height: 100%;
    display: flex;
    position: fixed;
    background: linear-gradient(#099cec, #418AF1);
    justify-content: center;
    align-items: center;
    color: #066da5;
    text-align: center;
    .login-cont{
        width: 350px;
        background-color: #fff;
        border-radius: 5px;
        padding: 80px 50px;
        h1{
            font-size: 40px;
            margin-bottom: 20px;
        }
        p{
            font-size: 16px;
            margin-bottom: 50px;
        }
        .cont{
            .el-input{
                margin-bottom: 20px;
            }
            .el-button{
                padding: 12px 40px;
                margin-top: 10px;
            }
        }
    }
}
</style>
