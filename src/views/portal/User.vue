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
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-button class="btn-creat" type="success" icon="el-icon-plus" @click="handleCreate">创建</el-button>
        <el-table :data="tableData" stripe border>
            <el-table-column prop="id" label="ID" width="100"></el-table-column>
            <el-table-column prop="userCode" label="用户编码" width="200"></el-table-column>
            <el-table-column prop="username" label="用户名称" width="180"></el-table-column>
            <el-table-column prop="mobile" label="手机号" width="180"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="300"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        @click="handleUpdate(scope.row)"
                        type="info"
                        size="medium"
                        icon="el-icon-edit"
                    >编辑</el-button>
                    <el-button
                        type="danger"
                        size="medium"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.row)"
                    >删除</el-button>
                    <el-button
                        type="warning"
                        size="medium"
                        icon="el-icon-setting"
                        @click="handleRole(scope.row)"
                    >配置角色</el-button>
                    <el-button
                        type="default"
                        size="medium"
                        icon="el-icon-view"
                        @click="handlePerm(scope.row)"
                    >查看权限</el-button>
                </template>
            </el-table-column>
        </el-table>
        <p class="page-box">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="page.currentPage"
                :page-sizes="[5, 10, 50, 100]"
                :page-size="page.pageSize"
                layout="sizes, prev, pager, next"
                :total="page.totalSize"
            ></el-pagination>
        </p>
        <el-dialog :title="titleName" :visible.sync="dialogFormVisible" @opened="openDialog('dialogForm')" width="30%">
            <el-form :model="dialogForm" :rules="rules" ref="dialogForm" status-icon>
                <el-input v-model="dialogForm.id" type="hidden"></el-input>
                <el-form-item label="用户编码" :label-width="formLabelWidth" prop="userCode">
                    <el-input v-model="dialogForm.userCode" :disabled="disabled" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名称" :label-width="formLabelWidth" prop="username">
                    <el-input v-model="dialogForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobile">
                    <el-input
                        v-model.number="dialogForm.mobile"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                    <el-input v-model="dialogForm.email" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleDialogSubmit('dialogForm')">{{buttonName}}</el-button>
            </div>
        </el-dialog>
        <el-dialog title="角色配置" :visible.sync="roleFormVisible" width="35%">
            <el-transfer
                filterable
                filter-placeholder="请输入角色名"
                v-model="roleResult"
                :data="roleData"
            ></el-transfer>
            <div slot="footer" class="dialog-footer">
                <el-button @click="roleFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleRoleDialogSubmit()">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog title="权限配置" :visible.sync="dialogPermFormVisible">
            <el-tree
                :data="permData"
                show-checkbox
                node-key="id"
                :default-checked-keys="defaultChecked"
                ref="tree"
                highlight-current
            ></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPermFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import * as User from "@/api/components/portal/user.js";
import * as Role from "@/api/components/portal/role.js";
import * as Perm from "@/api/components/portal/perm.js";
import Qs from 'qs'
import axios from 'axios'
export default {
    name: "user",
    data() {
        var checkMobile = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入手机号"));
            } else {
                if (!/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.dialogForm.mobile)) {
                    callback(new Error("请输入正确格式的手机号"));
                }
                callback();
            }
        };
        var checkUserCode = (rule, value, callback) => {
            User.checkUserCodeSubmit({
                userCode: value,
                id: this.dialogForm.id
            }).then(function(res){
                if(res.data){
                    callback()
                }else{
                    callback(new Error("用户编码重复，请重新输入"))
                }
            })
        };
        return {
            page: {
                currentPage: 1,
                pageSize: 5,
                totalSize: 0
            },
            form: {
                userCode: "",
                username: "",
                mobile: "",
                email: ""
            },
            rules: {
                userCode: [
                    {
                        required: true,
                        message: "请输入用户编码",
                        trigger: "blur"
                    },
                    {
                        min: 5,
                        max: 20,
                        message: "长度在5-20字符",
                        trigger: "blur"
                    },
                    {
                        validator: checkUserCode,
                        trigger: ["blur", "change"]
                    }
                ],
                username: [
                    {
                        required: true,
                        message: "请输入用户名称",
                        trigger: "blur"
                    }
                ],
                mobile: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur"
                    },
                    {
                        validator: checkMobile,
                        trigger: ["blur", "change"]
                    }
                ],
                email: [
                    { required: true, message: "请输入邮箱", trigger: "blur" },
                    {
                        type: "email",
                        message: "请输入正确的邮箱地址",
                        trigger: ["blur", "change"]
                    }
                ]
            },
            dialogForm: {
                id: 0,
                userCode: "",
                username: "",
                mobile: "",
                email: ""
            },
            userCode: "",
            roleData: [],
            roleResult: [],
            tableData: [],
            dialogFormVisible: false,
            roleFormVisible: false,
            formLabelWidth: "100px",
            titleName: "创建用户",
            buttonName: "创建",
            disabled: false,
            dialogPermFormVisible: false,
            permData: [],
            defaultChecked: []
        };
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
            this.page.pageSize = val
            this.page.currentPage = 1
            this.getList()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
            this.page.currentPage = val
            this.getList()
        },
        onSubmit() {
            this.getList();
        },
        openDialog(form){
            this.$refs[form].clearValidate()
        },
        async handleRoleDialogSubmit() {
            let roleCodes = this.roleResult
            if(roleCodes.length === 0){
                roleCodes = null
            }
            try {
                await axios
                .get(
                    `/api/role/saveUserRole?userCode=${this.userCode}&`+Qs.stringify({roleCodes: roleCodes}, {arrayFormat: 'repeat'})
                )
                .then(res => {
                    if (res.data === true) {
                        this.$message({
                            message: "恭喜您，保存成功",
                            type: "success"
                        });
                    }
                    this.roleFormVisible = false
                })
            } catch (error) {
                console.log(error);
            }
        },
        async handleCreate() {
            this.dialogFormVisible = true;
            this.titleName = "创建用户";
            this.buttonName = "创建";
            this.dialogForm.id = 0;
            this.dialogForm.userCode = "";
            this.dialogForm.username = "";
            this.dialogForm.mobile = "";
            this.dialogForm.email = "";
            this.disabled = false;
        },
        async handleDelete(row) {
            console.log(row);
            try {
                const result = await User.judgeDeleteSubmit({
                    userCode: row.userCode
                })
                console.log(result)
                if(result.data == false){
                    this.$message.error("请先清除用户与角色的绑定关系，再删除此用户")
                    return
                }
                const res = await User.deleteSubmit({
                    id: row.id
                });
                if (res.data != 0) {
                    this.$message({
                        message: "恭喜您，删除成功",
                        type: "success"
                    });
                }
                this.page.currentPage = 1;
                this.getList();
            } catch (error) {
                console.log(error);
            }
        },
        async handleUpdate(row) {
            this.dialogFormVisible = true;
            this.titleName = "修改用户";
            this.buttonName = "保存";
            this.dialogForm.id = row.id;
            this.dialogForm.userCode = row.userCode;
            this.dialogForm.username = row.username;
            this.dialogForm.mobile = row.mobile;
            this.dialogForm.email = row.email;
            this.disabled = true;
        },
        async handleRole(row) {
            this.userCode = row.userCode;
            try {
                const res = await Role.findRoleTransferSubmit({
                    userCode: row.userCode
                });
                this.roleResult = res.data.roleResult;
                this.roleData = res.data.roleData;
                this.roleFormVisible = true;
            } catch (error) {
                console.log(error);
            }
        },
        async handlePerm(row) {
            console.log(row);
            this.dialogPermFormVisible = true;
            try {
                const res = await Perm.getPermDataByUserCodeSubmit({
                    userCode: row.userCode
                });
                this.permData = res.data.list;
                this.defaultChecked = res.data.ids
            } catch (error) {
                console.log(error);
            }
        },
        async handleDialogSubmit(dialogForm) {
            await this.$refs[dialogForm].validate(valid => {
                if (valid) {
                    this.dialogFormVisible = false;
                    try {
                        const res = User.dialogSubmit({
                            id: this.dialogForm.id,
                            code: this.dialogForm.userCode,
                            name: this.dialogForm.username,
                            mobile: this.dialogForm.mobile,
                            email: this.dialogForm.email
                        });
                        if (res.data != 0) {
                            this.$message({
                                message: "恭喜您，" + this.buttonName + "成功",
                                type: "success"
                            });
                        }
                        this.getList();
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        async getList() {
            try {
                const res = await User.listSubmit({
                    userCode: this.form.userCode,
                    username: this.form.username,
                    mobile: this.form.mobile,
                    email: this.form.email,
                    currentPage: this.page.currentPage,
                    pageSize: this.page.pageSize
                });
                this.tableData = res.data.list;
                this.page.currentPage = res.data.currentPage;
                this.page.pageSize = res.data.pageSize;
                this.page.totalSize = res.data.totalSize;
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.getList();
    }
};
</script>
<style lang="scss" scoped>
.btn-creat {
    margin-bottom: 20px;
}
</style>
<style lang="scss">
.page-box {
    width: 100%;
    text-align: center;
}
</style>