<template>
    <div>
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="角色编码">
                <el-input v-model="form.roleCode" placeholder="角色编码"></el-input>
            </el-form-item>
            <el-form-item label="角色名称">
                <el-input v-model="form.roleName" placeholder="角色名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-button class="btn-creat" type="success" icon="el-icon-plus" @click="handleCreate">创建</el-button>
        <el-table :data="tableData" stripe border>
            <el-table-column prop="id" label="ID" width="100"></el-table-column>
            <el-table-column prop="roleCode" label="角色编码" width="220"></el-table-column>
            <el-table-column prop="roleName" label="角色名称" width="280"></el-table-column>
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
                    >配置权限</el-button>
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
                <el-form-item label="角色编码" :label-width="formLabelWidth" prop="roleCode">
                    <el-input v-model="dialogForm.roleCode" :disabled="disabled" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
                    <el-input v-model="dialogForm.roleName" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleDialogSubmit('dialogForm')">{{buttonName}}</el-button>
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
                <el-button type="primary" @click="handlePermDialogSubmit">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import * as Role from "@/api/components/portal/role.js";
import * as Perm from "@/api/components/portal/perm.js";
import Qs from "qs";
import axios from "axios";
import Cookie from 'js-cookie'
export default {
    name: "user",
    data() {
        var checkRoleCode = (rule, value, callback) => {
            Role.checkRoleCodeSubmit({
                roleCode: value,
                id: this.dialogForm.id
            }).then(function(res){
                if(res.data){
                    callback()
                }else{
                    callback(new Error("角色编码重复，请重新输入"))
                }
            })
        };
        return {
            permData: [],
            page: {
                currentPage: 1,
                pageSize: 5,
                totalSize: 0
            },
            form: {
                roleCode: "",
                roleName: ""
            },
            rules: {
                roleCode: [
                    {
                        required: true,
                        message: "请输入角色编码",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 20,
                        message: "长度在2-20字符",
                        trigger: "blur"
                    },
                    {
                        validator: checkRoleCode,
                        trigger: ['change', 'blur']
                    }
                ],
                roleName: [
                    {
                        required: true,
                        message: "请输入角色名称",
                        trigger: "blur"
                    }
                ]
            },
            dialogForm: {
                id: 0,
                roleCode: "",
                roleName: ""
            },
            tableData: [],
            dialogFormVisible: false,
            roleFormVisible: false,
            formLabelWidth: "100px",
            titleName: "创建角色",
            buttonName: "创建",
            disabled: false,
            dialogPermFormVisible: false,
            defaultChecked: []
        };
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.page.pageSize = val;
            this.page.currentPage = 1;
            this.getList();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page.currentPage = val;
            this.getList();
        },
        onSubmit() {
            this.getList();
        },
        openDialog(form){
            this.$refs[form].clearValidate()
        },
        async handlePermDialogSubmit() {
            let checkedNodes = this.$refs.tree.getCheckedNodes();
            let permCodes = [];
            for (var node of checkedNodes) {
                console.log(node);
                if (node.children == null) {
                    permCodes.push(node.value);
                }
            }
            if(permCodes.length === 0){
                permCodes = null
            }
            console.log(permCodes)
            try {
                await axios
                    .get(
                        `/api/role/saveRolePerm?roleCode=${this.roleCode}&` +
                            Qs.stringify(
                                { permCodes: permCodes },
                                { arrayFormat: "repeat" }
                            ),
                        {
                            headers: {
                                'X-Auth-Token': Cookie.get('access_token'),
                                'X-Requested-With': 'XMLHttpRequest',
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }
                    )
                    .then(res => {
                        if (res.data === true) {
                            this.$message({
                                message: "恭喜您，保存成功",
                                type: "success"
                            });
                        }
                        this.dialogPermFormVisible = false;
                    });
            } catch (error) {
                console.log(error);
            }
        },
        async handleCreate() {
            this.dialogFormVisible = true;
            this.titleName = "创建角色";
            this.buttonName = "创建";
            this.dialogForm.id = 0;
            this.dialogForm.roleCode = "";
            this.dialogForm.roleName = "";
            this.disabled = false;
        },
        async handleDelete(row) {
            console.log(row);
            //先判断是否可以删除角色
            try {
                const result = await Role.judgeDeleteSubmit({
                    roleCode: row.roleCode
                })
                console.log(result)
                if(result.data == false){
                    this.$message.error("请先清除角色与权限/用户的绑定关系，再删除此角色")
                    return
                }
                const res = await Role.deleteSubmit({
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
            this.titleName = "修改角色";
            this.buttonName = "保存";
            this.dialogForm.id = row.id;
            this.dialogForm.roleCode = row.roleCode;
            this.dialogForm.roleName = row.roleName;
            this.disabled = true;
        },
        async handleRole(row) {
            this.roleCode = row.roleCode;
            this.dialogPermFormVisible = true;
            try {
                const res = await Perm.getPermDataSubmit({
                    roleCode: this.roleCode
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
                        const res = Role.dialogSubmit({
                            id: this.dialogForm.id,
                            code: this.dialogForm.roleCode,
                            name: this.dialogForm.roleName
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
                const res = await Role.listSubmit({
                    roleCode: this.form.roleCode,
                    roleName: this.form.roleName,
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
