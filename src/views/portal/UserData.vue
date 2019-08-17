<template>
    <div>
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="用户编码">
                <el-input v-model="form.userCode" placeholder="用户编码"></el-input>
            </el-form-item>
            <el-form-item label="用户名称">
                <el-input v-model="form.username" placeholder="用户名称"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="form.mobile" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email" placeholder="email"></el-input>
            </el-form-item>
        </el-form>
        <!-- <el-table :data="tableData" stripe border>
            <el-table-column prop="id" label="ID" width="300"></el-table-column>
            <el-table-column prop="userCode" label="用户编码" width="200"></el-table-column>
            <el-table-column prop="username" label="用户名称" width="200"></el-table-column>
            <el-table-column prop="mobile" label="手机号" width="300"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="300"></el-table-column>
        </el-table>
        <p class="page-box">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="page.currentPage"
                :page-sizes="[2, 5, 10, 20]"
                :page-size="page.pageSize"
                layout="sizes, prev, pager, next"
                :total="page.totalSize"
            ></el-pagination>
        </p> -->
    </div>
</template>
<script>
import * as UserData from "@/api/components/portal/userData.js"
import { mapState } from 'vuex'
export default {
    name: "userdata",
    data() {
        return {
            form: {
                userCode: "",
                username: "",
                mobile: "",
                email: ""
            },
            // tableData:[],
            // page: {
            //     currentPage: 1,
            //     pageSize: 2,
            //     totalSize: 0
            // },
        }
    },
    mounted() {
        var _this = this;
        var es = new EventSource('/api/apiUser/getById?id=5d3a9b695645b8ac2a335391')
        es.addEventListener('message', function(e) {
            // console.log(e.data)
            // console.log(e);
            // _this.tableData = [];
            var u = JSON.parse(e.data);
            _this.form.userCode = u.userCode;
            _this.form.username = u.username;
            _this.form.mobile = u.mobile;
            _this.form.email = u.email;
            // _this.tableData.push(u);
        })
    },
    computed: {
        ...mapState('global', ['userCode'])
    },
    methods: {
        // handleSizeChange(val) {
        //     console.log(`每页 ${val} 条`)
        //     this.page.pageSize = val
        //     this.page.currentPage = 1
        //     this.getList()
        // },
        // handleCurrentChange(val) {
        //     console.log(`当前页: ${val}`)
        //     this.page.currentPage = val
        //     this.getList()
        // },
        async getList() {
            try {
                const res = await UserData.listSubmit({
                    id: '5d3a9b695645b8ac2a335391'
                });
                this.form.userCode = res.data.userCode;
                this.form.username = res.data.username;
                this.form.mobile = res.data.mobile;
                this.form.email = res.data.email;
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.getList();
    }
}
</script>
